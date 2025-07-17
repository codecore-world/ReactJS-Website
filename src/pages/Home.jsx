import React, { useRef } from 'react'
import { motion } from 'framer-motion'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import './Home.css'

// Advanced Material Properties from main.js
const createAdvancedMaterial = () => {
  return new THREE.MeshPhysicalMaterial({
    color: 0xed96b8,
    emissive: 0xed96b8,
    roughness: 0,
    metalness: 1,
    ior: 2.333,
    reflectivity: 1,
    iridescence: 0.186,
    iridescenceIOR: 2.333,
    sheen: 1,
    sheenRoughness: 1,
    sheenColor: 0xffffff,
    clearcoat: 1,
    specularIntensity: 1,
    specularColor: 0xffffff,
    wireframe: true,
    fog: true,
    transparent: true,
    opacity: 1,
    depthTest: true,
    depthWrite: true,
    alphaTest: 1,
    side: THREE.FrontSide
  })
}

// TorusKnot Component with exact geometry from main.js
const TorusKnot = () => {
  const meshRef = useRef()

  useFrame((state, delta) => {
    meshRef.current.rotation.x += delta * 0.3
    meshRef.current.rotation.y += delta * 0.5
  })

  return (
    <mesh ref={meshRef} position={[0, -1.5, 0]}>
      <torusKnotGeometry args={[1.0, 0.3, 160, 24]} />
      <primitive object={createAdvancedMaterial()} attach="material" />
    </mesh>
  )
}

const Scene = () => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[1, 1, 1]} intensity={0.5} />
      
      <TorusKnot />
      
      <OrbitControls 
        enableZoom={true} 
        enablePan={true} 
        enableRotate={true}
        autoRotate={true}
        autoRotateSpeed={0.5}
      />
    </>
  )
}

const Home = () => {
  return (
    <div className="home">
      {/* Full Background Canvas */}
      <div className="canvas-container">
        <Canvas
          camera={{ position: [0, 1.0, 2.5], fov: 75 }}
          style={{ background: 'transparent' }}
          className="background-canvas"
        >
          <Scene />
        </Canvas>
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