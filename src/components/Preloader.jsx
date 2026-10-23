import React, { useState, useEffect } from 'react';
import Logo from './Logo';

export default function Preloader() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div id="preloader" className={loaded ? 'loaded' : ''} aria-hidden={loaded}>
      <div className="preloader-emblem">
        <Logo variant="icon" theme="dark" height={52} />
      </div>
      <div className="preloader-text">
        <span>LEOVANTAGE</span>
      </div>
      <div className="preloader-bar-bg">
        <div className="preloader-bar" />
      </div>
    </div>
  );
}
