import React, { useState, useEffect } from 'react'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Home from './pages/Home'
import Contact from './pages/Contact'
import LoadingScreen from './components/LoadingScreen'
import GooeyNav from './components/GooeyNav'
import ElasticSlider from './components/ElasticSlider'
import { VolumeX, Volume2 } from 'lucide-react'
import './App.css'

const NAV_ITEMS = [
  { label: '', href: '/', icon: <img src="/home.png" alt="Home" style={{ width: 24, height: 24, display: 'block' }} /> },
  { label: '', href: '/contact', icon: <img src="/contact.png" alt="Contact" style={{ width: 24, height: 24, display: 'block' }} /> }
]

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoading) return;
    // Le composant LoadingScreen appelle onFinish quand l'animation est finie
  }, [isLoading])

  if (isLoading) {
    return <LoadingScreen onFinish={() => setIsLoading(false)} />
  }

  // Gestion du clic sur la nav Gooey pour router
  const handleNavClick = (e, index) => {
    e.preventDefault();
    navigate(NAV_ITEMS[index].href);
  };

  return (
    <div className="App">
      <GooeyNav
        items={NAV_ITEMS.map((item, idx) => ({
          ...item,
          onClick: (e) => handleNavClick(e, idx)
        }))}
        particleCount={15}
        particleDistances={[90, 10]}
        particleR={100}
        initialActiveIndex={NAV_ITEMS.findIndex(item => item.href === location.pathname)}
        animationTime={600}
        timeVariance={300}
        colors={[1, 2, 3, 1, 2, 3, 1, 4]}
      />
      
      <ElasticSlider
        leftIcon={null}
        rightIcon={null}
        startingValue={0}
        defaultValue={30}
        maxValue={100}
      />
      
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default App 