import React, { useState, useEffect, useRef } from 'react';

interface DecryptedTextProps {
  text: string;
  className?: string;
  speed?: number; // Скорость расшифровки
  maxIterations?: number; // Сколько раз менять буквы перед финалом
  sequential?: boolean; // Открывать слева направо или всё сразу
}

const CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+[]{}|;:,.<>?';

const DecryptedText: React.FC<DecryptedTextProps> = ({ 
  text, 
  className = '', 
  speed = 30,
  sequential = true
}) => {
  const [displayText, setDisplayText] = useState(text);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          startAnimation();
          setHasAnimated(true);
        }
      },
      { threshold: 0.1 } // Срабатывает, когда 10% элемента видно
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  const startAnimation = () => {
    let iteration = 0;
    
    const interval = setInterval(() => {
      setDisplayText(prev => 
        text
          .split('')
          .map((letter, index) => {
            // Если буква пробел - оставляем пробел
            if (letter === ' ') return ' ';
            
            // Если мы уже прошли эту букву в итерации - показываем оригинал
            if (index < iteration) {
              return text[index];
            }
            
            // Иначе показываем случайный символ
            return CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
          })
          .join('')
      );

      if (iteration >= text.length) {
        clearInterval(interval);
        setDisplayText(text); // Убеждаемся, что в конце текст верный
      }

      // Увеличиваем итерацию. 1/3 означает, что каждые 3 кадра открывается 1 буква
      // Чем меньше число, тем дольше "бегают" цифры
      iteration += 1 / 3; 
    }, speed);
  };

  // При первом рендере показываем заглушку, чтобы не было прыжков высоты, но сохраняем ширину символов
  return (
    <span ref={elementRef} className={className}>
      {displayText}
    </span>
  );
};

export default DecryptedText;
