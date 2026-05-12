import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LoadingSpinner from './LoadingSpinner';
import './FlowerGallery.css';

const FlowerGallery = () => {
  const [flowers, setFlowers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFlowers();
  }, []);

  const fetchFlowers = async () => {
    try {
      // استخدام Environment Variable أو Railway URL
      const API_URL = process.env.REACT_APP_API_URL || 'https://liatriesflower-production.up.railway.app';
      const response = await axios.get(`${API_URL}/api/flowers/`);
      setFlowers(response.data.results || response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching flowers:', error);
      setLoading(false);
    }
  };

  const handleOrder = (flowerName) => {
    // يمكن إضافة منطق الطلب هنا
    alert(`تم إضافة ${flowerName} إلى السلة! 🌹`);
  };

  if (loading) {
    return (
      <section className="gallery-section" id="flowers">
        <div className="container">
          <LoadingSpinner />
        </div>
      </section>
    );
  }

  return (
    <section className="gallery-section" id="flowers">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">مجموعتنا المميزة</h2>
          <p className="section-subtitle">اختر من بين أجمل الورود الطبيعية المختارة بعناية</p>
        </div>
        
        <div className="flowers-grid">
          {flowers.length > 0 ? flowers.map((flower, index) => (
            <div key={flower.id} className="flower-card" style={{animationDelay: `${index * 0.1}s`}}>
              <div className="flower-image-wrapper">
                <img 
                  src={flower.image_url || flower.image} 
                  alt={flower.name}
                  className="flower-image"
                />
                <div className="flower-overlay">
                  <button 
                    className="order-btn"
                    onClick={() => handleOrder(flower.name)}
                  >
                    اطلب الآن ✨
                  </button>
                </div>
              </div>
              <div className="flower-info">
                <h3 className="flower-name">{flower.name}</h3>
                {flower.description && (
                  <p className="flower-description">{flower.description}</p>
                )}
                <div className="flower-footer">
                  <span className="flower-price">{flower.price} $ </span>
                  <span className="flower-status">متوفر الآن</span>
                </div>
              </div>
            </div>
          )) : (
            <div className="no-flowers">
              <h3>لا توجد ورود متاحة حالياً</h3>
              <p>يرجى المحاولة لاحقاً أو التواصل معنا</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FlowerGallery;
