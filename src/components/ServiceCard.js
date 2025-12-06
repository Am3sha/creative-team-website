import React from 'react';
import './ServiceCard.css';

function ServiceCard({ icon, title, description, features }) {
  return (
    <div className="service-card">
      <div className="service-icon">{icon}</div>
      <h3 className="service-title">{title}</h3>
      <p className="service-description">{description}</p>
      {features && (
        <ul className="service-features">
          {features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      )}
      <button className="btn-learn-more">Learn More</button>
    </div>
  );
}

export default ServiceCard;

