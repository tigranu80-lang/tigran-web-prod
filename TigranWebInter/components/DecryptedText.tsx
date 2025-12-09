import React, { useEffect, useRef, useState } from 'react';

interface DecryptedTextProps {
  text: string;
  className?: string;
}

// Utility: Fisher-Yates shuffle
const shuffle = (array: number[]): number[] => {
  const arr = [...array];
  let currentIndex = arr.length;
  
  while (currentIndex !== 0) {
    const randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    
    [arr[currentIndex], arr[randomIndex]] = [arr[randomIndex], arr[currentIndex]];
  }
  
  return arr;
};

const DecryptedText: React.FC<DecryptedTextProps> = ({ text, className = '' }) => {
  const [states, setStates] = useState<number[]>([]);
  const [hasAnimated, setHasAnimated] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

  // Initialize states
  useEffect(() => {
    setStates(new Array(text.length).fill(0));
  }, [text]);

  // Clear timeouts on unmount
  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach(timeout => clearTimeout(timeout));
    };
  }, []);

  const startAnimation = () => {
    // Clear any existing timeouts
    timeoutsRef.current.forEach(timeout => clearTimeout(timeout));
    timeoutsRef.current = [];

    // Reset all states
    setStates(new Array(text.length).fill(0));

    // Create shuffled indices for random reveal order
    const indices = text.split('').map((_, i) => i);
    const shuffledIndices = shuffle(indices);

    // Animate each character
    shuffledIndices.forEach((charIndex, _) => {
      if (text[charIndex] === ' ') return; // Skip spaces

      // Random initial delay for each character
      const initialDelay = Math.round(Math.random() * (1000 - 100)) + 50;

      // State 1: Line appears
      const timeout1 = setTimeout(() => {
        setStates(prev => {
          const newStates = [...prev];
          newStates[charIndex] = 1;
          return newStates;
        });

        // State 2: Block appears
        const timeout2 = setTimeout(() => {
          setStates(prev => {
            const newStates = [...prev];
            newStates[charIndex] = 2;
            return newStates;
          });

          // State 3: Final letter revealed
          const timeout3 = setTimeout(() => {
            setStates(prev => {
              const newStates = [...prev];
              newStates[charIndex] = 3;
              return newStates;
            });
          }, 100);

          timeoutsRef.current.push(timeout3);
        }, 100);

        timeoutsRef.current.push(timeout2);
      }, initialDelay);

      timeoutsRef.current.push(timeout1);
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          startAnimation();
          setHasAnimated(true);
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated, text]);

  return (
    <span ref={containerRef} className={`inline-block ${className}`}>
      {text.split('').map((char, index) => {
        if (char === ' ') {
          return <span key={index} className="inline-block w-[10px]"></span>;
        }

        const state = states[index] || 0;

        return (
          <span
            key={index}
            className={`inline-block relative uppercase`}
            style={{
              color: state === 3 ? 'inherit' : 'transparent',
            }}
          >
            {char}
            <span
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[55%] bg-current transition-all duration-100"
              style={{
                width: state === 0 ? '0' : state === 1 ? '1px' : state === 2 ? '0.9em' : '0',
                height: '1.2em',
              }}
            />
          </span>
        );
      })}
    </span>
  );
};

export default DecryptedText;