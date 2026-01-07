import { useEffect, useRef, useCallback } from 'react';

interface DecryptedTextProps {
  text: string;
  className?: string;
}

// Note: Animation timing is fixed (50-2000ms random delay per character)
// based on the original CodePen implementation

// Utility: Fisher-Yates shuffle
const shuffle = (array: number[]): number[] => {
  const arr = [...array];
  let currentIndex = arr.length;

  while (currentIndex !== 0) {
    const randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    const tmp1 = arr[currentIndex];
    const tmp2 = arr[randomIndex];
    if (tmp1 !== undefined && tmp2 !== undefined) {
      arr[currentIndex] = tmp2;
      arr[randomIndex] = tmp1;
    }
  }

  return arr;
};

export function DecryptedText({ text, className = '' }: DecryptedTextProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const hasAnimatedRef = useRef(false);
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

  // Clear timeouts on unmount
  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach(timeout => clearTimeout(timeout));
    };
  }, []);

  const decodeText = useCallback(() => {
    if (!containerRef.current) return;

    const children = containerRef.current.children;

    // Clear previous timeouts
    timeoutsRef.current.forEach(timeout => clearTimeout(timeout));
    timeoutsRef.current = [];

    // Reset all states
    const state: number[] = [];
    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      if (child) {
        child.classList.remove('state-1', 'state-2', 'state-3');
      }
      state[i] = i;
    }

    // Shuffle for random order
    const shuffled = shuffle(state);

    // Batch animations using requestAnimationFrame for better Chrome performance
    const animateChar = (child: HTMLElement, delay: number) => {
      const timeout = setTimeout(() => {
        // Use requestAnimationFrame to batch DOM updates
        requestAnimationFrame(() => {
          child.classList.add('state-1');

          requestAnimationFrame(() => {
            setTimeout(() => {
              child.classList.add('state-2');

              setTimeout(() => {
                child.classList.add('state-3');
              }, 100);
            }, 100);
          });
        });
      }, delay);
      timeoutsRef.current.push(timeout);
    };

    // Animate each letter with staggered timing
    for (let i = 0; i < shuffled.length; i++) {
      const index = shuffled[i];
      if (index === undefined) continue;
      const child = children[index] as HTMLElement | undefined;

      if (child?.classList.contains('text-animation')) {
        // Random delay between 50ms and 2000ms
        const delay = Math.round(Math.random() * (2000 - 300)) + 50;
        animateChar(child, delay);
      }
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];
        if (firstEntry?.isIntersecting && !hasAnimatedRef.current) {
          decodeText();
          hasAnimatedRef.current = true;
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [decodeText]);

  // Parse text into characters and spaces
  const elements = text.split('').map((char, index) => {
    if (char === ' ') {
      return <span key={index} className="decode-space"></span>;
    }
    return (
      <span key={index} className="text-animation">
        {char}
      </span>
    );
  });

  return (
    <span ref={containerRef} className={`decode-text ${className}`}>
      {elements}
    </span>
  );
}