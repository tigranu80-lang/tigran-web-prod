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
    // Создаем массив с перемешанными индексами для хаотичного появления
    const indices = text.split('').map((_, i) => i);
    const shuffledIndices = [...indices].sort(() => Math.random() - 0.5);
    
    let frame = 0;
    const totalFrames = 35; // Баланс между быстро и медленно
    
    if (animationRef.current) clearInterval(animationRef.current);

    animationRef.current = setInterval(() => {
      setDisplayText(current => {
        return text.split('').map((char, index) => {
          if (char === ' ') return ' '; // Пробелы всегда пробелы
          
          // Находим позицию этого индекса в перемешанном массиве
          const revealOrder = shuffledIndices.indexOf(index);
          
          // Чем раньше индекс в перемешанном массиве, тем раньше буква проявится
          const revealThreshold = (revealOrder / text.length) * totalFrames;
          
          // Если мы прошли порог этой буквы + небольшой запас, показываем её
          if (frame > revealThreshold + 10) {
             return char;
          }
          
          // Иначе показываем случайный мусор
          return CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
        });
      });

      frame += 1;
      
      // Заканчиваем анимацию
      if (frame > totalFrames + 15) {
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
      className={`inline-block whitespace-pre-wrap ${className}`}
      onMouseEnter={handleMouseEnter}
    >
      {displayText.map((char, index) => (
        <span key={index} className="inline-block">
          {char}
        </span>
      ))}
    </span>
  );
};

export default DecryptedText;