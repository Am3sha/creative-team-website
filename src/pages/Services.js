import React from 'react';
import ServiceCard from '../components/ServiceCard';
import './Services.css';

function Services() {
  const services = [
    {
      icon: '💻',
      title: 'Web Development',
      description: 'We create custom websites that are fast, responsive, and user-friendly. From simple landing pages to complex web applications, we bring your vision to life.',
      features: ['Custom websites', 'Responsive design', 'CMS solutions']
    },
    {
      icon: '📸',
      title: 'Photography',
      description: 'Professional photography services for events, products, and portraits. We capture moments that tell your story beautifully.',
      features: ['Event photography', 'Product photos', 'Portrait sessions']
    },
    {
      icon: '🎨',
      title: 'Logo Design',
      description: 'Create a strong brand identity with our logo design services. We design logos that represent your brand and make a lasting impression.',
      features: ['Brand identity', 'Logo creation', 'Business cards']
    },
    {
      icon: '📊',
      title: 'Data Analysis',
      description: 'Transform your data into actionable insights. We help you understand your data and make informed business decisions.',
      features: ['Excel reports', 'Dashboards', 'Data visualization']
    },
    {
      icon: '⌨️',
      title: 'Data Entry',
      description: 'Accurate and efficient data entry services. We handle your data with precision and care, ensuring quality and consistency.',
      features: ['Accurate typing', 'Document conversion', 'Excel formatting']
    }
  ];

  return (
    <div className="services-page page">
      <section className="services-hero">
        <div className="container">
          <h1>Our Services</h1>
          <p className="services-subtitle">Comprehensive solutions for your digital needs</p>
        </div>
      </section>

      <section className="services-main">
        <div className="container">
          <div className="services-grid">
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                icon={service.icon}
                title={service.title}
                description={service.description}
                features={service.features}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="services-cta">
        <div className="container">
          <div className="cta-content">
            <h2>Need a Custom Solution?</h2>
            <p>Contact us to discuss your specific requirements</p>
            <a href="/contact" className="btn-primary">Get in Touch</a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Services;

