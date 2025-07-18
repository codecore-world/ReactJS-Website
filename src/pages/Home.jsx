import React from 'react'
import { motion } from 'framer-motion'
import './Home.css'
import Beams from '../components/Beams'

const Home = () => {
  return (
    <div className="home">
      {/* Full Background Beams */}
      <div className="canvas-container">
        <Beams
          beamWidth={2.4}
          beamHeight={30}
          beamNumber={44}
          lightColor="var(--accent-pink)"
          speed={5}
          noiseIntensity={0.1}
          scale={0.2}
          rotation={30}
        />
      </div>
      {/* Text Overlay - On top of canvas */}
      <motion.div 
        className="text-overlay"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <motion.h1
          className="page-title"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <span className="text-gradient">CODECORE</span>
          <span className="text-world">.world</span>
        </motion.h1>
      </motion.div>
    </div>
  )
}

export default Home 