import React, { useState, useEffect } from 'react';

const useTypewriterEffect = ({ text, speed = 150 }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const typingInterval = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayText((prevText) => prevText + text[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      } else {
        clearInterval(typingInterval);
      }
    }, speed);

    return () => {
      clearInterval(typingInterval);
    };
  }, [text, speed, currentIndex]);

  return displayText;
};

const TypeWriterText = ({ text, speed }) => {
  const displayText = useTypewriterEffect({ text, speed });
  return <h3 className="Welcome-Text">{displayText}</h3>;
};

export default TypeWriterText;
