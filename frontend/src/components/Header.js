import React, { useState, useEffect } from 'react';
import './Header.css';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const handleNavClick = (href) => {
    closeMobileMenu();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <nav className="nav">
          <div className="logo" onClick={() => handleNavClick('#home')}>
            <span className="logo-icon">🌹</span>
            <span className="logo-text">LIATRIES</span>
          </div>
          
          <ul className={`nav-links ${mobileMenuOpen ? 'nav-links-mobile-open' : ''}`}>
            <li><a href="#home" onClick={() => handleNavClick('#home')}>الرئيسية</a></li>
            <li><a href="#flowers" onClick={() => handleNavClick('#flowers')}>الورود</a></li>
            <li><a href="#about" onClick={() => handleNavClick('#about')}>من نحن</a></li>
            <li><a href="#contact" onClick={() => handleNavClick('#contact')}>تواصل معنا</a></li>
            <li className="mobile-cta">
              <button className="cta-button mobile-cta-button">اطلب الآن</button>
            </li>
          </ul>

          <div className="nav-right">
            <button className="cta-button desktop-cta">اطلب الآن</button>
            <button 
              className={`mobile-menu-toggle ${mobileMenuOpen ? 'active' : ''}`}
              onClick={toggleMobileMenu}
              aria-label="فتح القائمة"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </nav>
      </div>
      
      {mobileMenuOpen && (
        <div className="mobile-menu-overlay" onClick={closeMobileMenu}></div>
      )}
    </header>
  );
};

export default Header;
