import React, { useState, useEffect } from 'react';

const TypingEffect = () => {
  const [text, setText] = useState('');
  const fullText = "print('Hello, World')"; // Of een stukje Bash/Rust code

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(timer);
    }, 100);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="code-block">
      <span className="code-text">{text}</span>
      <span className="cursor">_</span>
    </div>
  );
};

export default TypingEffect;