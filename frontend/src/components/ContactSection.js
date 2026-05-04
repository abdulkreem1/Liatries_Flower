import React, { useState } from 'react';
import './ContactSection.css';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // يمكن إضافة منطق إرسال الرسالة هنا
    alert('شكراً لك! تم إرسال رسالتك بنجاح 🌹');
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <section className="contact-section" id="contact">
      <div className="container">
        <div className="contact-header">
          <h2 className="contact-title">تواصل معنا</h2>
          <p className="contact-subtitle">نحن هنا لخدمتك في أي وقت</p>
        </div>
        
        <div className="contact-content">
          <div className="contact-info">
            <div className="info-card">
              <div className="info-icon">📞</div>
              <h3>اتصل بنا</h3>
              <p>+963 XXX XXX XXX</p>
            </div>
            
            <div className="info-card">
              <div className="info-icon">📧</div>
              <h3>راسلنا</h3>
              <p>info@liatries.com</p>
            </div>
            
            <div className="info-card">
              <div className="info-icon">📍</div>
              <h3>زورنا</h3>
              <p>دمشق، سوريا</p>
            </div>
            
            <div className="info-card">
              <div className="info-icon">⏰</div>
              <h3>أوقات العمل</h3>
              <p>يومياً من 9 صباحاً - 9 مساءً</p>
            </div>
          </div>
          
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                name="name"
                placeholder="الاسم الكامل"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="البريد الإلكتروني"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <input
                type="tel"
                name="phone"
                placeholder="رقم الهاتف"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <textarea
                name="message"
                placeholder="رسالتك..."
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            
            <button type="submit" className="submit-btn">
              إرسال الرسالة ✨
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;