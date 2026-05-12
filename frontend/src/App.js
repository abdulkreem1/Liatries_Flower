import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import FlowerGallery from './components/FlowerGallery';
import Footer from './components/Footer';
import './App.css';
import './mobile-optimizations.css';

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('liatries-theme') || 'light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('liatries-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((currentTheme) => currentTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <Router>
      <div className="App">
        <Header theme={theme} onToggleTheme={toggleTheme} />
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <FlowerGallery />
            </>
          } />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
