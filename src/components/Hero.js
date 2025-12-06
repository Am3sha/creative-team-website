import React from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

function Hero() {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <h1 className="hero-title">Creative Solutions Team</h1>
          <p className="hero-tagline">Transforming Ideas into Digital Excellence</p>
          <Link to="/contact" className="btn-primary">Get Started</Link>
        </div>
      </div>
    </section>
  );
}

export default Hero;

