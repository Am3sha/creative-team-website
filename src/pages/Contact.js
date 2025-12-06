import React, { useState } from 'react';
import './Contact.css';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    message: '',
    budget: ''
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validate required fields
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.service) {
      newErrors.service = 'Please select a service';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Form is valid - send to backend
    setErrors({});
    setIsSubmitting(true);

    try {
      // Map service values to match backend expectations
      const serviceMap = {
        'web-development': 'Web Development',
        'photography': 'Photography',
        'logo-design': 'Logo Design',
        'data-analysis': 'Data Analysis',
        'data-entry': 'Data Entry'
      };

      const response = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          service: serviceMap[formData.service] || formData.service,
          message: formData.message.trim(),
          budget: formData.budget.trim() || ''
        })
      });

      const data = await response.json();

      if (data.success) {
        setSubmitted(true);
        // Reset form after 3 seconds
        setTimeout(() => {
          setFormData({
            name: '',
            email: '',
            service: '',
            message: '',
            budget: ''
          });
          setSubmitted(false);
        }, 3000);
      } else {
        setErrors({ submit: data.message || 'Something went wrong. Please try again later.' });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrors({ submit: 'Network error. Please check your connection and try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-page page">
      <section className="contact-hero">
        <div className="container">
          <h1>Get In Touch</h1>
          <p className="contact-subtitle">We'd love to hear from you</p>
        </div>
      </section>

      <section className="contact-main">
        <div className="container">
          <div className="contact-content">
            <div className="contact-form-wrapper">
              <h2>Send us a Message</h2>
              {submitted ? (
                <div className="success-message">
                  <div className="success-icon">✓</div>
                  <h3>Thank you!</h3>
                  <p>Your message has been sent successfully. We'll get back to you soon.</p>
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="name">Name <span className="required">*</span></label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={errors.name ? 'error' : ''}
                      placeholder="Your name"
                    />
                    {errors.name && <span className="error-message">{errors.name}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email <span className="required">*</span></label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={errors.email ? 'error' : ''}
                      placeholder="your.email@example.com"
                    />
                    {errors.email && <span className="error-message">{errors.email}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="service">Service <span className="required">*</span></label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className={errors.service ? 'error' : ''}
                    >
                      <option value="">Select a service</option>
                      <option value="web-development">Web Development</option>
                      <option value="photography">Photography</option>
                      <option value="logo-design">Logo Design</option>
                      <option value="data-analysis">Data Analysis</option>
                      <option value="data-entry">Data Entry</option>
                    </select>
                    {errors.service && <span className="error-message">{errors.service}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">Message <span className="required">*</span></label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      className={errors.message ? 'error' : ''}
                      rows="5"
                      placeholder="Tell us about your project..."
                    ></textarea>
                    {errors.message && <span className="error-message">{errors.message}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="budget">Budget (Optional)</label>
                    <input
                      type="text"
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      placeholder="e.g., $1000 - $5000"
                    />
                  </div>

                  {errors.submit && <span className="error-message" style={{ display: 'block', marginBottom: '1rem' }}>{errors.submit}</span>}
                  <button type="submit" className="btn-submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>

            <div className="contact-info">
              <h2>Contact Information</h2>
              <div className="info-item">
                <div className="info-icon">📧</div>
                <div>
                  <h3>Email</h3>
                  <p>info@creativesolutions.com</p>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">📞</div>
                <div>
                  <h3>Phone</h3>
                  <p>+1 (555) 123-4567</p>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">📍</div>
                <div>
                  <h3>Address</h3>
                  <p>123 Business St<br />City, Country 12345</p>
                </div>
              </div>

              <div className="social-links">
                <h3>Follow Us</h3>
                <div className="social-icons">
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Visit our Facebook page">📘</a>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Visit our Twitter page">🐦</a>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Visit our Instagram page">📷</a>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="Visit our LinkedIn page">💼</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;

