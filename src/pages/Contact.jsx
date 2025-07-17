import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Github, MessageCircle, Mail, MapPin, Phone, Send, ExternalLink } from 'lucide-react'
import './Contact.css'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Form submitted:', formData)
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    })
  }

  const contactInfo = [
    {
      icon: <Mail size={24} />,
      title: "Email",
      value: "contact@codecore.world",
      link: "mailto:contact@codecore.world"
    },
    {
      icon: <MessageCircle size={24} />,
      title: "Discord",
      value: "Join our server",
      link: "https://discord.gg/codecore"
    },
    {
      icon: <Github size={24} />,
      title: "GitHub",
      value: "View our projects",
      link: "https://github.com/codecore-world"
    },
    {
      icon: <MapPin size={24} />,
      title: "Location",
      value: "Paris, Stuttgart",
      link: null
    }
  ]

  return (
    <div className="contact">
      <div className="container">
        <motion.section
          className="contact-hero"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.h1
            className="page-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Get in <span className="text-gradient">Touch</span>
          </motion.h1>
          
          <motion.p
            className="hero-description"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Ready to start your next project? Have questions about our services? 
            We'd love to hear from you. Let's create something amazing together.
          </motion.p>
        </motion.section>

        <motion.section
          className="contact-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <div className="contact-grid">
            <motion.div
              className="contact-form"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <h2>Send us a Message</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Your name"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="your.email@example.com"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    placeholder="What's this about?"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows="6"
                    placeholder="Tell us about your project or question..."
                  />
                </div>
                
                <button type="submit" className="btn-primary">
                  <Send size={20} />
                  Send Message
                </button>
              </form>
            </motion.div>

            <motion.div
              className="contact-info"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <h2>Connect With Us</h2>
              
              <div className="info-grid">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    className="info-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                  >
                    <div className="info-icon">
                      {info.icon}
                    </div>
                    <div className="info-content">
                      <h3>{info.title}</h3>
                      {info.link ? (
                        <a 
                          href={info.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="info-link"
                        >
                          {info.value}
                          <ExternalLink size={16} />
                        </a>
                      ) : (
                        <p>{info.value}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                className="social-links"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.6 }}
              >
                <h3>Follow Us</h3>
                <div className="social-grid">
                  <a 
                    href="https://github.com/codecore-world" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="social-link github"
                  >
                    <Github size={24} />
                    <span>GitHub</span>
                  </a>
                  
                  <a 
                    href="https://discord.gg/codecore" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="social-link discord"
                  >
                    <MessageCircle size={24} />
                    <span>Discord</span>
                  </a>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        <motion.section
          className="faq-section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.8 }}
        >
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2 }}
          >
            Frequently Asked Questions
          </motion.h2>
          
          <div className="faq-grid">
            <motion.div
              className="faq-item"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 2.2 }}
            >
              <h3>What services do you offer?</h3>
              <p>We specialize in software development, AI solutions, 3D rendering, and cybersecurity tools. Our team creates custom solutions for various industries.</p>
            </motion.div>
            
            <motion.div
              className="faq-item"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 2.4 }}
            >
              <h3>How can I join your team?</h3>
              <p>We're always looking for talented developers. Reach out to us via email or Discord to discuss opportunities and share your portfolio.</p>
            </motion.div>
            
            <motion.div
              className="faq-item"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 2.6 }}
            >
              <h3>Do you work with clients globally?</h3>
              <p>Yes! Our team is distributed globally and we work with clients from all around the world. We're available 24/7 for support.</p>
            </motion.div>
            
            <motion.div
              className="faq-item"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 2.8 }}
            >
              <h3>What technologies do you use?</h3>
              <p>We use modern technologies including React, Node.js, Python, Three.js, AI frameworks, and cloud platforms like AWS and Azure.</p>
            </motion.div>
          </div>
        </motion.section>
      </div>
    </div>
  )
}

export default Contact 