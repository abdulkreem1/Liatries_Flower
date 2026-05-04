import React from 'react';
import './LoadingSpinner.css';

const LoadingSpinner = () => {
  return (
    <div className="loading-container">
      <div className="loading-spinner">
        <div className="spinner-flower">🌹</div>
        <div className="spinner-petals">
          <div className="petal petal-1">🌸</div>
          <div className="petal petal-2">🌺</div>
          <div className="petal petal-3">🌷</div>
          <div className="petal petal-4">💐</div>
        </div>
      </div>
      <p className="loading-text">جاري تحميل الورود الجميلة...</p>
    </div>
  );
};

export default LoadingSpinner;