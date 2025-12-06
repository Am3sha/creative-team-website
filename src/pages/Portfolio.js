import React, { useState } from 'react';
import './Portfolio.css';

function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('all');

  const portfolioItems = [
    { id: 1, image: 'web1', category: 'web', title: 'E-commerce Website', color: '#2563eb' },
    { id: 2, image: 'web2', category: 'web', title: 'Business Website', color: '#3b82f6' },
    { id: 3, image: 'photo1', category: 'photography', title: 'Corporate Event', color: '#f59e0b' },
    { id: 4, image: 'photo2', category: 'photography', title: 'Product Photography', color: '#ec4899' },
    { id: 5, image: 'design1', category: 'design', title: 'Brand Identity', color: '#10b981' },
    { id: 6, image: 'design2', category: 'design', title: 'Logo Design', color: '#8b5cf6' },
    { id: 7, image: 'data1', category: 'data', title: 'Analytics Dashboard', color: '#6366f1' },
    { id: 8, image: 'data2', category: 'data', title: 'Data Report', color: '#14b8a6' },
    { id: 9, image: 'web3', category: 'web', title: 'Portfolio Website', color: '#7c3aed' }
  ];

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'web', label: 'Web' },
    { id: 'photography', label: 'Photography' },
    { id: 'design', label: 'Design' },
    { id: 'data', label: 'Data' }
  ];

  const filteredItems = activeFilter === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeFilter);

  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const closeModal = () => {
    setSelectedItem(null);
  };

  return (
    <div className="portfolio-page page">
      <section className="portfolio-hero">
        <div className="container">
          <h1>Our Portfolio</h1>
          <p className="portfolio-subtitle">Showcasing our best work</p>
        </div>
      </section>

      <section className="portfolio-main">
        <div className="container">
          <div className="portfolio-filters">
            {filters.map(filter => (
              <button
                key={filter.id}
                className={`filter-btn ${activeFilter === filter.id ? 'active' : ''}`}
                onClick={() => setActiveFilter(filter.id)}
              >
                {filter.label}
              </button>
            ))}
          </div>

          <div className="portfolio-grid">
            {filteredItems.map((item) => (
              <div 
                key={item.id} 
                className="portfolio-item"
                onClick={() => handleItemClick(item)}
              >
                <div 
                  className="portfolio-image" 
                  style={{ background: `linear-gradient(135deg, ${item.color} 0%, ${item.color}dd 100%)` }}
                >
                  <div className="portfolio-overlay">
                    <h3>{item.title}</h3>
                    <span className="portfolio-category">{item.category}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {selectedItem && (
        <div className="portfolio-modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>×</button>
            <div 
              className="modal-image"
              style={{ background: `linear-gradient(135deg, ${selectedItem.color} 0%, ${selectedItem.color}dd 100%)` }}
            >
              <h2>{selectedItem.title}</h2>
            </div>
            <div className="modal-info">
              <h3>{selectedItem.title}</h3>
              <p className="modal-category">{selectedItem.category}</p>
              <p>This is a sample portfolio item showcasing our work in {selectedItem.category}.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Portfolio;

