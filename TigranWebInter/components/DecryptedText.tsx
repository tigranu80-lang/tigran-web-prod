import React, { useEffect, useRef, useCallback } from 'react';
import './DecryptedText.css';

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
    
    [arr[currentIndex], arr[randomIndex]] = [arr[randomIndex], arr[currentIndex]];
  }
  
  return arr;
};

const DecryptedText: React.FC<DecryptedTextProps> = ({ text, className = '' }) => {
  const containerRef = useRef<HTMLSpanElement>(null);
  const hasAnimatedRef = useRef(false);
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

  // Clear timeouts on unmount
  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach(timeout => clearTimeout(timeout));
    };
  }, []);

  const firstStages = useCallback((child: HTMLElement) => {
    if (child.classList.contains('state-2')) {
      child.classList.add('state-3');
    } else if (child.classList.contains('state-1')) {
      child.classList.add('state-2');
    } else if (!child.classList.contains('state-1')) {
      child.classList.add('state-1');
      const timeout = setTimeout(() => secondStages(child), 100);
      timeoutsRef.current.push(timeout);
    }
  }, []);

  const secondStages = useCallback((child: HTMLElement) => {
    if (child.classList.contains('state-1')) {
      child.classList.add('state-2');
      const timeout = setTimeout(() => thirdStages(child), 100);
      timeoutsRef.current.push(timeout);
    } else if (!child.classList.contains('state-1')) {
      child.classList.add('state-1');
    }
  }, []);

  const thirdStages = useCallback((child: HTMLElement) => {
    if (child.classList.contains('state-2')) {
      child.classList.add('state-3');
    }
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
      children[i].classList.remove('state-1', 'state-2', 'state-3');
      state[i] = i;
    }

    // Shuffle for random order
    const shuffled = shuffle(state);

    // Animate each letter
    for (let i = 0; i < shuffled.length; i++) {
      const child = children[shuffled[i]] as HTMLElement;
      
      if (child.classList.contains('text-animation')) {
        // Random delay between 50ms and 2000ms
        const state1Time = Math.round(Math.random() * (2000 - 300)) + 50;
        const timeout = setTimeout(() => firstStages(child), state1Time);
        timeoutsRef.current.push(timeout);
      }
    }
  }, [firstStages]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimatedRef.current) {
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
};

export default DecryptedText;