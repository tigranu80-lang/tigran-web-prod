import React, { useEffect, useRef, useState } from 'react';

interface DecryptedTextProps {
  text: string;
  speed?: number; // Скорость смены состояний (мс)
  className?: string;
  animateOnHover?: boolean;
}

// Символы для "зашифрованного" состояния
const CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+[]{}|;:,.<>?';

const DecryptedText: React.FC<DecryptedTextProps> = ({ 
  text, 
  speed = 50, 
  className = '',
  animateOnHover = false 
}) => {
  const [displayText, setDisplayText] = useState<string[]>([]);
  const [isHovered, setIsHovered] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);
  const animationRef = useRef<NodeJS.Timeout | null>(null);

  // Инициализация массива букв
  useEffect(() => {
    setDisplayText(new Array(text.length).fill('')); // Сначала пусто
  }, [text]);

  const startAnimation = () => {
    // 3 состояния для каждой буквы: 
    // 0 = невидимо/случайный символ
    // 1 = случайный символ
    // 2 = финальная буква
    
    let iterations = 0;
    const maxIterations = 20; // Длина анимации
    
    if (animationRef.current) clearInterval(animationRef.current);

    animationRef.current = setInterval(() => {
      setDisplayText(current => {
        return text.split('').map((char, index) => {
          if (char === ' ') return ' '; // Пробелы всегда пробелы
          
          // Простая логика: чем больше итераций, тем больше шанс, что буква станет "нормальной"
          // Идем слева направо
          if (iterations > index + 5) {
             return char;
          }
          
          // Иначе показываем случайный мусор
          return CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
        });
      });

      iterations += 1; // Ускоряем шаг
      
      // Заканчиваем, когда прошли достаточно итераций
      if (iterations > text.length + 15) {
        if (animationRef.current) clearInterval(animationRef.current);
        setDisplayText(text.split('')); // Финальная фиксация
      }
    }, speed);
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
  }, [hasAnimated, text, speed]);

  // Перезапуск при наведении (опционально)
  const handleMouseEnter = () => {
    if (animateOnHover) {
      startAnimation();
    }
  };

  return (
    <span 
      ref={containerRef} 
      className={`inline-block whitespace-nowrap ${className}`}
      onMouseEnter={handleMouseEnter}
    >
      {displayText.map((char, index) => (
        <span key={index} className="inline-block min-w-[0.6em]">
          {char}
        </span>
      ))}
    </span>
  );
};

export default DecryptedText;