import React from 'react';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero" id="home">
      <div className="hero-overlay"></div>
      <div className="container hero-content">
        <div className="hero-text">
          <h1 className="hero-title">
            <span className="hero-welcome">مرحباً بك في عالم</span>
            <span className="hero-brand">LIATRIES</span>
          </h1>
          <p className="hero-subtitle">
            حيث تتفتح الجمال والأناقة في كل وردة 🌹
          </p>
          <p className="hero-description">
            نقدم لك أجمل الورود الطبيعية المختارة بعناية فائقة من أرقى الحدائق، 
            لتضيف لمسة من السحر والرومانسية لمناسباتك الخاصة وتجعل كل لحظة لا تُنسى
          </p>
          <div className="hero-buttons">
            <button className="btn-primary" onClick={() => document.getElementById('flowers')?.scrollIntoView({behavior: 'smooth'})}>
              استكشف مجموعتنا
            </button>
            <button className="btn-secondary" onClick={() => document.getElementById('contact')?.scrollIntoView({behavior: 'smooth'})}>
              تواصل معنا
            </button>
          </div>
        </div>
        <div className="hero-decoration">
          <div className="floating-flower flower-1">🌸</div>
          <div className="floating-flower flower-2">🌺</div>
          <div className="floating-flower flower-3">🌷</div>
          <div className="floating-flower flower-4">🌹</div>
          <div className="floating-flower flower-5">💐</div>
          <div className="floating-flower flower-6">🏵️</div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
