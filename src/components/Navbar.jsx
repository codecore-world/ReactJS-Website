import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import './Navbar.css'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/contact', label: 'Contact' }
  ]

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <motion.nav
      className={`navbar ${scrolled ? 'scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <motion.img
            src="/logo.png"
            alt="CODECORE"
            className="logo-img"
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
          />
          <span className="logo-text">CODECORE.world</span>
        </Link>

        <div className="nav-menu">
          {navItems.map((item, index) => (
            <motion.div
              key={item.path}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Link
                to={item.path}
                className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
                {location.pathname === item.path && (
                  <motion.div
                    className="nav-indicator"
                    layoutId="nav-indicator"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.button
          className="nav-toggle"
          onClick={toggleMenu}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <motion.div
        className={`mobile-menu ${isOpen ? 'open' : ''}`}
        initial={{ opacity: 0, height: 0 }}
        animate={{ 
          opacity: isOpen ? 1 : 0,
          height: isOpen ? 'auto' : 0
        }}
        transition={{ duration: 0.3 }}
      >
        {navItems.map((item, index) => (
          <motion.div
            key={item.path}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : -20 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
          >
            <Link
              to={item.path}
              className={`mobile-nav-link ${location.pathname === item.path ? 'active' : ''}`}
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </motion.nav>
  )
}

export default Navbar 