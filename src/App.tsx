// App.tsx
import React, { useState, useEffect } from 'react';
import './App.css';
import { createClient } from '@supabase/supabase-js';

const App: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', message: '' });

  const supabaseUrl = 'https://fuwyajdmgictxnaynmrg.supabase.co'; // Replace with your URL
  const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ1d3lhamRtZ2ljdHhuYXlubXJnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgzNjE5NTcsImV4cCI6MjA5MzkzNzk1N30.bidhMQaynbSxH1__5GyLtZdSM-yYoseB5K5U4PTqiIQ'; // Replace with your anon key
  const supabase = createClient(supabaseUrl, supabaseKey);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Show loading state
    setModalContent({
      title: 'Sending... 📤',
      message: 'Please wait while we send your message.'
    });
    setShowModal(true);
    
    try {
      // Insert data into Supabase
      const { error } = await supabase
        .from('messages')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            message: formData.message
          }
        ]);
      
      if (error) throw error;
      
      // Success
      setModalContent({
        title: 'Message Sent! 🎉',
        message: 'Thank you for reaching out! I will get back to you within 24 hours.'
      });
      setShowModal(true);
      
      // Clear form
      setFormData({ name: '', email: '', message: '' });
      
    } catch (error) {
      console.error('Error sending message:', error);
      setModalContent({
        title: 'Error ❌',
        message: 'Failed to send message. Please try again.'
      });
      setShowModal(true);
    }
  };

  function scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  }

  const downloadCV = () => {
    const createAndDownloadPDF = () => {
      const cvUrl = '/cv/Emily_Parker_CV.pdf';
      const link = document.createElement('a');
      link.href = cvUrl;
      link.download = 'Frits_John_Lloyd_Rabor_CV.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      setModalContent({
        title: 'Download Started! 📥',
        message: 'Your CV is being downloaded. Check your downloads folder.'
      });
      setShowModal(true);
    };
    
    createAndDownloadPDF();
  };

  const showService = (service: string) => {
    setModalContent({
      title: service,
      message: `Thank you for your interest in ${service}! I'd love to work with you on this.`
    });
    setShowModal(true);
  };

  const socialLinks = {
    linkedin: 'https://linkedin.com/',
    github: 'https://github.com/',
    twitter: 'https://twitter.com/',
    instagram: 'https://instagram.com/',
  };

  // Fixed socialMedia function to use the actual platform names
  const socialMedia = (platform: string) => {
    switch(platform) {
      case 'LinkedIn':
        window.open(socialLinks.linkedin, '_blank');
        break;
      case 'GitHub':
        window.open(socialLinks.github, '_blank');
        break;
      case 'Twitter':
        window.open(socialLinks.twitter, '_blank');
        break;
      case 'Instagram':
        window.open(socialLinks.instagram, '_blank');
        break;
      default:
        break;
    }
  };

  // Added missing phone and email click handlers
  const handlePhoneClick = () => {
    window.location.href = 'tel:09070044662';
  };

  const handleEmailClick = () => {
    window.location.href = 'mailto:ftrabor.student@asiancollege.edu.ph';
  };

  const services = [
    { num: '01', title: 'Web Development', desc: 'Creating stunning, responsive websites tailored to your brand and business needs.' },
    { num: '02', title: 'UI/UX Design', desc: 'Crafting intuitive and visually captivating user experiences.' },
    { num: '03', title: 'Content Creation', desc: 'Compelling content for portfolios, case studies, and personal bios.' },
    { num: '04', title: 'SEO Optimization', desc: 'Boost visibility, attract visitors with optimized keywords and meta tags.' },
    { num: '05', title: 'Social Media Integration', desc: 'Expand reach, engage audience across all social platforms.' },
    { num: '06', title: 'Analytics and Tracking', desc: 'Monitor performance, gain insights with Google Analytics.' }
  ];

  const educations = [
    { year: '2021-2023', title: 'Humanities and Social Sciences(HUMSS)', company: 'Amlan National High School-Senior High' },
    { year: '2017-2021', title: 'Junior High', company: 'Amlan National High School' },
    { year: '2010-2017', title: 'Elementary', company: 'Amlan Central Elementary School' },
  ];
  
  const [selectedCert, setSelectedCert] = useState<any>(null);

  const experiences = [
    { 
      year: '2023', 
      title: 'Work Immersion', 
      company: 'BFP-Amlan Fire Station, Philippines',
      certificate: {
        title: 'Certification of Completion',
        issuer: 'Bureau of Fire Protection, Amlan-Fire Station, Philippines',
        date: 'March 2023',
        credentialId: '001023-BFP-AMLN',
        image: '/cer.jpg'
      }
    },
    { 
      year: '2024', 
      title: 'Barangay Staff - SIL', 
      company: 'Barangay Poblacion, Sibulan, Neg. Or.',
      certificate: {
        title: 'Certificate of Internship Completion',
        issuer: 'Barangay Poblacion, Sibulan, Neg. Or.',
        date: 'March 2024',
        credentialId: 'SIL-2024-001',
        image: undefined // Fixed: Changed from empty string to undefined
      }
    },
    { 
      year: '2025', 
      title: 'Technical Support - SIL', 
      company: 'infocom inspiro',
      certificate: {
        title: 'Certificate of Completion',
        issuer: 'SPI',
        date: 'August 2025',
        credentialId: 'SIL-2025-002',
        image: '/IMG_0391.jpg'
      }
    }
  ];

  const openCertificate = (exp: any) => {
    setSelectedCert(exp.certificate);
  };

  const closeCertificate = () => {
    setSelectedCert(null);
  };
  
  const [selectedWork, setSelectedWork] = useState<any>(null);

  const recentWorks = [
    { 
      title: 'E-Commerce Platform', 
      date: 'May 15, 2024',
      comments: 24,
      category: 'Web Development',
      description: 'A fully functional e-commerce platform with payment integration, user authentication, and admin dashboard.',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      image: '🛒',
      liveDemo: 'https://demo.com',
      github: 'https://github.com/xaviermage/rabor-application'
    },
    { 
      title: 'Mobile Banking App', 
      date: 'April 28, 2024',
      comments: 18,
      category: 'Mobile Development',
      description: 'Secure mobile banking application with biometric authentication, transaction history, and fund transfer features.',
      technologies: ['React Native', 'Firebase', 'Express'],
      image: '📱',
      liveDemo: 'https://demo.com',
      github: 'https://github.com/xaviermage/Rabor-ExpoApp'
    },
    { 
      title: 'AI Content Generator', 
      date: 'April 10, 2024',
      comments: 32,
      category: 'AI Integration',
      description: 'AI-powered content generation tool that creates blog posts, social media captions, and marketing copy.',
      technologies: ['Python', 'OpenAI API', 'FastAPI', 'React'],
      image: '🤖',
      liveDemo: 'https://demo.com',
      github: 'https://github.com/xaviermage/diterabo'
    },
    { 
      title: 'Fitness Tracker', 
      date: 'March 25, 2024',
      comments: 15,
      category: 'Web App',
      description: 'Comprehensive fitness tracking application with workout plans, calorie counter, and progress analytics.',
      technologies: ['Vue.js', 'Django', 'PostgreSQL', 'Chart.js'],
      image: '💪',
      liveDemo: 'https://demo.com',
      github: 'https://github.com/xaviermage/mmm'
    }
  ];

  const openWorkDetails = (work: any) => {
    setSelectedWork(work);
  };

  const closeWorkDetails = () => {
    setSelectedWork(null);
  };

  const TypingText: React.FC<{ text: string; speed?: number }> = ({ text, speed = 100 }) => {
    const [displayedText, setDisplayedText] = useState('');
    const [index, setIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [showCursor, setShowCursor] = useState(true);

    useEffect(() => {
      const cursorInterval = setInterval(() => {
        setShowCursor(prev => !prev);
      }, 500);
      return () => clearInterval(cursorInterval);
    }, []);

    useEffect(() => {
      if (!isDeleting && index < text.length) {
        const timeout = setTimeout(() => {
          setDisplayedText(prev => prev + text[index]);
          setIndex(prev => prev + 1);
        }, speed);
        return () => clearTimeout(timeout);
      } else if (isDeleting && index > 0) {
        const timeout = setTimeout(() => {
          setDisplayedText(prev => prev.slice(0, -1));
          setIndex(prev => prev - 1);
        }, speed / 2);
        return () => clearTimeout(timeout);
      } else if (index === text.length && !isDeleting) {
        const timeout = setTimeout(() => {
          setIsDeleting(true);
        }, 2000);
        return () => clearTimeout(timeout);
      } else if (index === 0 && isDeleting) {
        const timeout = setTimeout(() => {
          setIsDeleting(false);
        }, 500);
        return () => clearTimeout(timeout);
      }
    }, [index, isDeleting, text, speed]);

    return (
      <span className="typing-text">
        {displayedText}
        <span className={`cursor ${showCursor ? 'visible' : 'hidden'}`}>|</span>
      </span>
    );
  };

  return (
    <div className="app">
      {/* Modal */}
      {showModal && (
        <div className="modal" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-icon">✨</div>
            <h3>{modalContent.title}</h3>
            <p>{modalContent.message}</p>
            <button className="close-modal" onClick={() => setShowModal(false)}>Got it</button>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="logo" onClick={() => scrollToSection('home')}>
            <span className="logo-text">Fritss.</span>
          </div>
          <div className="menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className={`nav-links ${mobileMenuOpen ? 'active' : ''}`}>
            <a onClick={() => scrollToSection('home')}>Home</a>
            <a onClick={() => scrollToSection('about')}>About</a>
            <a onClick={() => scrollToSection('services')}>Services</a>
            <a onClick={() => scrollToSection('education')}>Education/Experience</a>
            <a onClick={() => scrollToSection('work')}>Work</a>
            <a onClick={() => scrollToSection('contact')}>Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-title">
              I am <span className="name-gradient">
                <TypingText text="Frits John Lloyd Rabor" speed={120} />
              </span>
            </h1>
            <h2 className="hero-subtitle">Web Developer + Graphic Designer</h2>
            <p className="hero-description">
              Seamlessly blending the worlds of code and creativity as a Web Developer and 
              Graphic Designer, creating captivating digital experiences.
            </p>
            <button className="download-cv-btn" onClick={downloadCV}>
              Download CV
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M12 4V20M12 20L8 16M12 20L16 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
          <div className="hero-image">
            <div className="image-frame circle-frame">
              <img 
                src="/pp2.jpg" 
                alt="Profile" 
                className="profile-image circle-image"
              />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about">
        <div className="section-container">
          <div className="about-grid">
            <div className="about-content">
              <span className="section-tag">About Me</span>
              <h2>Who Am <span className="gradient-text">I?</span></h2>
              <p>
                I'm Frits John Lloyd Rabor, a passionate Web Developer and Graphic Designer with over 5 years of experience 
                in creating stunning digital experiences. I specialize in blending code and creativity to build 
                websites that not only look beautiful but also perform exceptionally well.
              </p>
              <p>
                My journey in tech started when I realized I could combine my love for design with my passion 
                for coding. Since then, I've worked with over 100+ clients worldwide, delivering high-quality 
                web solutions that help businesses grow online.
              </p>
              <div className="about-stats">
                <div className="about-stat">
                  <span className="about-stat-number">3+</span>
                  <span className="about-stat-label">Years Experience</span>
                </div>
                <div className="about-stat">
                  <span className="about-stat-number">105+</span>
                  <span className="about-stat-label">Happy Clients</span>
                </div>
                <div className="about-stat">
                  <span className="about-stat-number">25+</span>
                  <span className="about-stat-label">Projects Done</span>
                </div>
              </div>
              <button className="more-btn" onClick={downloadCV}>
                Download CV
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M12 4V20M12 20L8 16M12 20L16 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="skills">
        <div className="section-container">
          <div className="skills-grid">
            <div className="skill-card">
              <span className="skill-number">5+</span>
              <span className="skill-label">Years of Experience</span>
            </div>
            <div className="skill-card">
              <span className="skill-number">20+</span>
              <span className="skill-label">Project Completed</span>
            </div>
            <div className="skill-card">
              <span className="skill-number">105+</span>
              <span className="skill-label">Happy Clients</span>
            </div>
            <div className="skill-card">
              <span className="skill-number">10+</span>
              <span className="skill-label">Honors and Awards</span>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="services">
        <div className="section-container">
          <div className="section-header">
            <h2>My Quality <span className="gradient-text">Services</span></h2>
          </div>
          <div className="services-grid">
            {services.map((service, index) => (
              <div key={index} className="service-card" onClick={() => showService(service.title)}>
                <div className="service-number">{service.num}</div>
                <h3>{service.title}</h3>
                <p>{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education & Experience Section */}
      <section id="education" className="education">
        <div className="section-container">
          <div className="education-grid">
            <div className="education-col">
              <h2>My <span className="gradient-text">Education</span></h2>
              {educations.map((edu, index) => (
                <div key={index} className="timeline-card">
                  <span className="timeline-year">{edu.year}</span>
                  <h3>{edu.title}</h3>
                  <p>{edu.company}</p>
                </div>
              ))}
            </div>
            
            <div className="experience-col">
              <h2>My <span className="gradient-text">Experience</span></h2>
              {experiences.map((exp, index) => (
                <div 
                  key={index} 
                  className="timeline-card certificate-card" 
                  onClick={() => openCertificate(exp)}
                >
                  <span className="timeline-year">{exp.year}</span>
                  <h3>{exp.title}</h3>
                  <p>{exp.company}</p>
                  <div className="certificate-badge">
                    🎓 View Certificate →
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Certificate Modal */}
      {selectedCert && (
        <div className="certificate-modal" onClick={closeCertificate}>
          <div className="certificate-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="cert-modal-close" onClick={closeCertificate}>✕</button>
            
            <div className="certificate-header">
              <div className="certificate-icon">🎓</div>
              <h2>{selectedCert.title}</h2>
            </div>
            
            <div className="certificate-body">
              <div className="certificate-details">
                <div className="cert-detail-item">
                  <strong>🏢 Issuer:</strong>
                  <span>{selectedCert.issuer}</span>
                </div>
                <div className="cert-detail-item">
                  <strong>📅 Issue Date:</strong>
                  <span>{selectedCert.date}</span>
                </div>
                <div className="cert-detail-item">
                  <strong>🆔 Credential ID:</strong>
                  <span>{selectedCert.credentialId}</span>
                </div>
              </div>
              
              <div className="certificate-image-bottom">
                {selectedCert.image ? (
                  <img 
                    src={selectedCert.image} 
                    alt={selectedCert.title}
                    className="certificate-display-image"
                  />
                ) : (
                  <div className="certificate-image-placeholder">
                    <div className="certificate-badge-icon">🏅</div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="certificate-footer">
              <p>✅ Verified Achievement | Issued by {selectedCert.issuer}</p>
            </div>
          </div>
        </div>
      )}

      {/* Testimonials Section */}
      <section id="work" className="testimonials">
        <div className="section-container">
          <div className="section-header">
            <h2>What My <span className="gradient-text">Clients Say</span></h2>
            <p>See what my clients say about my works...</p>
          </div>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <p>"Frits is a rockstar developer! He delivered our project on time, on budget, and with exceptional quality. Her UI/UX skills are top-notch. Highly recommended!"</p>
              <div className="testimonial-author">
                <strong>Sundar Pitchal</strong>
                <span>Tech Corp</span>
              </div>
            </div>
            <div className="testimonial-card">
              <p>"Working with Frits was a game-changer for our business. She created a stunning portfolio that showcases our work perfectly. Professional, talented, and easy to work with!"</p>
              <div className="testimonial-author">
                <strong>James Perry</strong>
                <span>Tech Corp</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Work Details Modal */}
      {selectedWork && (
        <div className="work-modal" onClick={closeWorkDetails}>
          <div className="work-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeWorkDetails}>✕</button>
            
            <div className="modal-header">
              <span className="modal-icon">{selectedWork.image}</span>
              <h2>{selectedWork.title}</h2>
              <span className="modal-category">{selectedWork.category}</span>
            </div>
            
            <div className="modal-body">
              <div className="modal-info">
                <div className="info-item">
                  <strong>📅 Date:</strong>
                  <span>{selectedWork.date}</span>
                </div>
                <div className="info-item">
                  <strong>💬 Comments:</strong>
                  <span>{selectedWork.comments}</span>
                </div>
              </div>
              
              <div className="modal-description">
                <h3>Project Description</h3>
                <p>{selectedWork.description}</p>
              </div>
              
              <div className="modal-technologies">
                <h3>Technologies Used</h3>
                <div className="tech-badges">
                  {selectedWork.technologies.map((tech: string, i: number) => (
                    <span key={i} className="tech-badge">{tech}</span>
                  ))}
                </div>
              </div>
              
              <div className="modal-actions">
                <button className="demo-btn" onClick={() => window.open(selectedWork.liveDemo, '_blank')}>
                  🔗 Live Demo
                </button>
                <button className="github-btn" onClick={() => window.open(selectedWork.github, '_blank')}>
                  📂 View Code
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Recent Works Section */}
      <section className="recent-works">
        <div className="section-container">
          <div className="section-header">
            <h2>My <span className="gradient-text">Recent Works</span></h2>
            <p>Click any card to explore in detail</p>
          </div>
          <div className="works-grid">
            {recentWorks.map((work, index) => (
              <div 
                key={index} 
                className="work-card" 
                onClick={() => openWorkDetails(work)}
              >
                <div className="work-icon">{work.image}</div>
                <span className="work-date">{work.date}</span>
                <span className="work-comments">💬 {work.comments} comments</span>
                <h3>{work.title}</h3>
                <span className="work-category">{work.category}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <div className="section-container">
          <div className="contact-wrapper">
            <div className="contact-info">
              <h2>Get In <span className="gradient-text">Touch</span></h2>
              <p>Have a project in mind? Let's work together!</p>
              
              <div className="contact-item" onClick={handlePhoneClick}>
                <div className="contact-icon">📞</div>
                <div>
                  <strong>Phone</strong>
                  <a href="#">09070044662</a>
                </div>
              </div>  
              
              <div className="contact-item" onClick={handleEmailClick}>
                <div className="contact-icon">📧</div>
                <div>
                  <strong>Email</strong>
                  <a href="https://mail.google.com/mail/u/0/#inbox?compose=new">ftrabor.student@asiancollege.edu.ph</a>
                </div>
              </div>
              
              <div className="social-links">
                <button onClick={() => socialMedia('LinkedIn')}>LinkedIn</button>
                <button onClick={() => socialMedia('GitHub')}>GitHub</button>
                <button onClick={() => socialMedia('Twitter')}>Twitter</button>
                <button onClick={() => socialMedia('Instagram')}>Instagram</button>
              </div>
            </div>
            
            <div className="contact-form">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <input 
                    type="text" 
                    placeholder="Your Name" 
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required 
                  />
                </div>
                <div className="form-group">
                  <input 
                    type="email" 
                    placeholder="Your Email" 
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required 
                  />
                </div>
                <div className="form-group">
                  <textarea 
                    rows={4} 
                    placeholder="Your Message" 
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required 
                  />
                </div>
                <button type="submit" className="submit-btn"> 
                  Send Message
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-brand">
            <h3>Frits John Lloyd Rabor</h3>
            <p>Web Developer + Graphic Designer</p>
          </div>
          <div className="footer-links">
            <a onClick={() => scrollToSection('home')}>Home</a>
            <a onClick={() => scrollToSection('services')}>Services</a>
            <a onClick={() => scrollToSection('education')}>Education</a>
            <a onClick={() => scrollToSection('contact')}>Contact</a>
          </div>
          <div className="footer-copyright">
            <p>© 2026 Frits John Lloyd Rabor. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;