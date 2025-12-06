import React from 'react';
import './About.css';

function About() {
  const teamMembers = [
    { name: 'Ahmed Mohamed', role: 'Web Developer', avatar: '👨‍💻' },
    { name: 'Sarah Johnson', role: 'Photographer', avatar: '👩‍📷' },
    { name: 'Michael Chen', role: 'Logo Designer', avatar: '👨‍🎨' },
    { name: 'Emily Davis', role: 'Data Analyst', avatar: '👩‍💼' }
  ];

  const testimonials = [
    {
      quote: 'Creative Solutions Team delivered an amazing website that exceeded our expectations. Highly professional and responsive!',
      author: 'John Smith',
      company: 'Tech Corp'
    },
    {
      quote: 'The photography services were outstanding. They captured every moment perfectly and delivered on time.',
      author: 'Lisa Anderson',
      company: 'Event Planning Co'
    },
    {
      quote: 'Their data analysis helped us make crucial business decisions. The insights were clear and actionable.',
      author: 'Robert Taylor',
      company: 'Business Solutions Inc'
    }
  ];

  return (
    <div className="about-page page">
      <section className="about-hero">
        <div className="container">
          <h1>About Creative Solutions Team</h1>
          <p className="about-subtitle">Transforming Ideas into Digital Excellence</p>
        </div>
      </section>

      <section className="about-main">
        <div className="container">
          <div className="about-text">
            <h2>Who We Are</h2>
            <p>
              We are a passionate team of designers, developers, and data specialists 
              with over 2 years of experience delivering exceptional digital solutions 
              to clients worldwide. Our mission is to transform your ideas into 
              stunning digital experiences that drive results.
            </p>
            <p>
              From custom websites to professional photography, logo design to data 
              analysis, we offer comprehensive services that help businesses thrive 
              in the digital age. We believe in building long-term relationships 
              with our clients and delivering work that exceeds expectations.
            </p>
            <p>
              Our team combines creativity with technical expertise to deliver 
              solutions that are not only beautiful but also functional and 
              user-friendly. We stay up-to-date with the latest trends and 
              technologies to ensure your projects are built with the best tools available.
            </p>
          </div>

          <div className="experience-badge">
            <div className="badge-content">
              <span className="badge-number">2+</span>
              <span className="badge-text">Years Experience</span>
            </div>
          </div>
        </div>
      </section>

      <section className="team-section">
        <div className="container">
          <h2 className="section-title">Our Team</h2>
          <div className="team-grid">
            {teamMembers.map((member, index) => (
              <div key={index} className="team-card">
                <div className="team-avatar">{member.avatar}</div>
                <h3>{member.name}</h3>
                <p>{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="testimonials-section">
        <div className="container">
          <h2 className="section-title">Client Testimonials</h2>
          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <div className="quote-icon">"</div>
                <p className="testimonial-quote">{testimonial.quote}</p>
                <div className="testimonial-author">
                  <strong>{testimonial.author}</strong>
                  <span>{testimonial.company}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;

