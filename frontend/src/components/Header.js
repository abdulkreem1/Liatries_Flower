import React, { useState, useEffect } from 'react';
import './Header.css';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <nav className="nav">
          <div className="logo">
            <span className="logo-icon">🌹</span>
            <span className="logo-text">LIATRIES</span>
          </div>
          <ul className="nav-links">
            <li><a href="#home">الرئيسية</a></li>
            <li><a href="#flowers">الورود</a></li>
            <li><a href="#about">من نحن</a></li>
            <li><a href="#contact">تواصل معنا</a></li>
          </ul>
          <button className="cta-button">اطلب الآن</button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
