import React, { useEffect, useRef } from 'react';
import { usePerformanceMode } from '../../hooks/usePerformanceMode';
import { useInView } from '../../hooks/useInView';

interface DecryptedTextProps {
  text: string;
  className?: string;
  animateOnView?: boolean;
}

// Fixed character set for "decryption" effect
const CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+';

/**
 * DecryptedText - Animated text reveal with "decryption" effect
 * Uses native IntersectionObserver instead of framer-motion for zero bundle impact on Hero
 */
export const DecryptedText = React.memo(({ text, className = '', animateOnView = true }: DecryptedTextProps) => {
  const isLowPower = usePerformanceMode();
  // Native IntersectionObserver hook - removes framer-motion from Hero critical path
  const { ref: containerRef, inView } = useInView<HTMLDivElement>({ once: true, margin: "-10%" });

  // If low power, just render static text (accessibility & perf)
  if (isLowPower) {
    return <span className={className}>{text}</span>;
  }

  return (
    <div ref={containerRef} className="inline-block">
      <DecryptedTextAnim
        text={text}
        className={className}
        start={animateOnView ? inView : true}
      />
    </div>
  );
}, (prevProps, nextProps) => {
  return prevProps.text === nextProps.text &&
    prevProps.className === nextProps.className &&
    prevProps.animateOnView === nextProps.animateOnView;
});

function DecryptedTextAnim({ text, className, start }: { text: string, className: string, start: boolean }) {
  const outputRef = useRef<HTMLSpanElement>(null);
  const frameRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);
  const hasRunRef = useRef(false);

  useEffect(() => {
    if (!start || hasRunRef.current) return;

    const length = text.length;
    let iteration = 0;

    const animate = (time: number) => {
      if (!startTimeRef.current) startTimeRef.current = time;
      // Slow down animation: update every 3rd frame (approx 20fps feel) instead of 60fps
      // This is a stylistic choice for "digital" feel + performance
      if (time - startTimeRef.current < 50) {
        frameRef.current = requestAnimationFrame(animate);
        return;
      }
      startTimeRef.current = time;

      // Logic: reveal letters one by one, 
      // but keep scrambling the rest

      let result = '';
      for (let i = 0; i < length; i++) {
        if (i < iteration) {
          result += text[i];
        } else {
          result += CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
        }
      }

      if (outputRef.current) {
        outputRef.current.innerText = result;
      }

      // Increment iteration
      // "1/3" letter per frame for slower decrypt, or "1" for fast.
      iteration += 1 / 3;

      if (iteration < length) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        // Final state
        if (outputRef.current) outputRef.current.innerText = text;
        hasRunRef.current = true;
      }
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frameRef.current);
    };
  }, [start, text]);

  return (
    <span ref={outputRef} className={`inline-block whitespace-pre ${className}`}>
      {/* Initial placeholder typically spaces or scrambled */}
      {hasRunRef.current ? text : text.split('').map(() => CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)]).join('')}
    </span>
  );
}