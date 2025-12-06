import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-logo">Creative Solutions Team</h3>
            <p>Transforming Ideas into Digital Excellence</p>
            <div className="social-icons">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Visit our Facebook page">📘</a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Visit our Twitter page">🐦</a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Visit our Instagram page">📷</a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="Visit our LinkedIn page">💼</a>
            </div>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/portfolio">Portfolio</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Services</h4>
            <ul>
              <li>Web Development</li>
              <li>Photography</li>
              <li>Logo Design</li>
              <li>Data Analysis</li>
              <li>Data Entry</li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Contact Info</h4>
            <ul>
              <li>📧 info@creativesolutions.com</li>
              <li>📞 +1 (555) 123-4567</li>
              <li>📍 123 Business St, City, Country</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2024 Creative Solutions Team. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

