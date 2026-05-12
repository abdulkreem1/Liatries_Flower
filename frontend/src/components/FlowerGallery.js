import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LoadingSpinner from './LoadingSpinner';
import './FlowerGallery.css';

const FlowerGallery = () => {
  const [flowers, setFlowers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'الكل', keywords: [] },
    { id: 'vases', label: 'المزهريات', keywords: ['vase', 'vases', 'مزهرية', 'مزهريات'] },
    { id: 'thorns', label: 'الأشواك', keywords: ['thorn', 'thorns', 'شوكة', 'أشواك', 'اشواك'] },
    { id: 'trees', label: 'الأشجار', keywords: ['tree', 'trees', 'شجرة', 'أشجار', 'اشجار'] },
    { id: 'flowers', label: 'الورود', keywords: ['flower', 'flowers', 'rose', 'roses', 'ورد', 'ورود', 'زهرة', 'زهور'] },
    { id: 'bags', label: 'الأكياس والحقائب', keywords: ['bag', 'bags', 'كيس', 'أكياس', 'اكياس', 'حقيبة', 'حقائب'] }
  ];

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

  const getSearchableText = (flower) => [
    flower.name,
    flower.description,
    flower.category,
    flower.type,
    flower.tags
  ].filter(Boolean).join(' ').toLowerCase();

  const filteredFlowers = flowers.filter((flower) => {
    const searchableText = getSearchableText(flower);
    const matchesSearch = searchableText.includes(searchTerm.trim().toLowerCase());
    const selectedCategory = categories.find((category) => category.id === activeCategory);
    const matchesCategory = activeCategory === 'all' || selectedCategory?.keywords.some((keyword) => searchableText.includes(keyword));

    return matchesSearch && matchesCategory;
  });

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

        <div className="gallery-controls" aria-label="البحث وتصفية المنتجات">
          <div className="search-field">
            <span aria-hidden="true">⌕</span>
            <input
              type="search"
              placeholder="ابحث عن وردة، مزهرية، شجرة، حقيبة..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              aria-label="البحث في المجموعة"
            />
          </div>

          <div className="category-filters" role="list" aria-label="تصفية حسب النوع">
            {categories.map((category) => (
              <button
                key={category.id}
                type="button"
                className={`filter-chip ${activeCategory === category.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(category.id)}
                aria-pressed={activeCategory === category.id}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
        
        <div className="flowers-grid">
          {filteredFlowers.length > 0 ? filteredFlowers.map((flower, index) => (
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
              <h3>{flowers.length > 0 ? 'لا توجد نتائج مطابقة' : 'لا توجد ورود متاحة حالياً'}</h3>
              <p>{flowers.length > 0 ? 'جرّب تغيير البحث أو اختيار تصنيف آخر' : 'يرجى المحاولة لاحقاً أو التواصل معنا'}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FlowerGallery;
