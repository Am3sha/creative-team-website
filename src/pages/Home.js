import React from 'react';
import Hero from '../components/Hero';
import ServiceCard from '../components/ServiceCard';
import './Home.css';

function Home() {
  const services = [
    {
      icon: '💻',
      title: 'Web Development',
      description: 'Custom websites built with modern technologies'
    },
    {
      icon: '📸',
      title: 'Photography',
      description: 'Professional photography services for all occasions'
    },
    {
      icon: '🎨',
      title: 'Logo Design',
      description: 'Creative logo designs that represent your brand'
    },
    {
      icon: '📊',
      title: 'Data Analysis',
      description: 'Transform data into actionable insights'
    },
    {
      icon: '⌨️',
      title: 'Data Entry',
      description: 'Accurate and efficient data entry services'
    }
  ];

  const portfolioItems = [
    { id: 1, image: 'web1', category: 'web', title: 'E-commerce Website' },
    { id: 2, image: 'photo1', category: 'photography', title: 'Corporate Event' },
    { id: 3, image: 'design1', category: 'design', title: 'Brand Identity' },
    { id: 4, image: 'web2', category: 'web', title: 'Business Website' },
    { id: 5, image: 'photo2', category: 'photography', title: 'Product Photography' },
    { id: 6, image: 'data1', category: 'data', title: 'Analytics Dashboard' }
  ];

  return (
    <div className="home page">
      <Hero />

      <section className="about-section">
        <div className="container">
          <div className="about-content">
            <h2>About Us</h2>
            <p>
              We are a passionate team of designers, developers, and data specialists 
              with over 2 years of experience delivering exceptional digital solutions 
              to clients worldwide. Our mission is to transform your ideas into 
              stunning digital experiences.
            </p>
          </div>
        </div>
      </section>

      <section className="services-section">
        <div className="container">
          <h2 className="section-title">Our Services</h2>
          <div className="services-grid">
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                icon={service.icon}
                title={service.title}
                description={service.description}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="portfolio-section">
        <div className="container">
          <h2 className="section-title">Our Portfolio</h2>
          <div className="portfolio-grid">
            {portfolioItems.map((item) => (
              <div key={item.id} className="portfolio-item">
                <div className={`portfolio-image ${item.image}`}>
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

      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Start Your Project?</h2>
            <p>Let's work together to bring your vision to life</p>
            <a href="/contact" className="btn-primary">Contact Us</a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;

