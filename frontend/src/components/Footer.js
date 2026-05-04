import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <span className="logo-icon">🌹</span>
              <span className="logo-text">LIATRIES</span>
            </div>
            <p className="footer-description">
              نقدم لك أجمل الورود الطبيعية لجميع مناسباتك الخاصة
            </p>
          </div>
          
          <div className="footer-section">
            <h3 className="footer-title">روابط سريعة</h3>
            <ul className="footer-links">
              <li><a href="#home">الرئيسية</a></li>
              <li><a href="#flowers">الورود</a></li>
              <li><a href="#about">من نحن</a></li>
              <li><a href="#contact">تواصل معنا</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3 className="footer-title">تواصل معنا</h3>
            <ul className="footer-contact">
              <li>📞 +963 XXX XXX XXX</li>
              <li>📧 info@liatries.com</li>
              <li>📍 دمشق، سوريا</li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2024 LIATRIES. جميع الحقوق محفوظة</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
