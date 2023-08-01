import React, { useState, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import './FetchButton.css';


export default function FetchButton({ onClick, children }) {
  const [animate, setAnimate] = useState(false);

  const handleClick = () => {
    setAnimate(true);
    onClick();
  };

  const handleAnimationEnd = () => {
    setAnimate(false);
  };

  return (
    <CSSTransition
      in={animate}
      timeout={300}
      classNames="fetch-button"
      onEntered={handleAnimationEnd}
    >
      <button onClick={handleClick} className="fetch-button">
        {children}
      </button>
    </CSSTransition>
  );
}
