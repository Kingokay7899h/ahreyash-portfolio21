'use client'

import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Points, PointMaterial, OrbitControls, PerspectiveCamera, Text3D, Center, Float, Sparkles } from '@react-three/drei'
import * as THREE from 'three'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'

// Floating Particles Component
function FloatingParticles() {
  const pointsRef = useRef<THREE.Points>(null)
  const [positions, setPositions] = useState<Float32Array>()

  useEffect(() => {
    const particleCount = 2000
    const positions = new Float32Array(particleCount * 3)
    
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 50
      positions[i * 3 + 1] = (Math.random() - 0.5) * 50  
      positions[i * 3 + 2] = (Math.random() - 0.5) * 50
    }
    
    setPositions(positions)
  }, [])

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05
    }
  })

  if (!positions) return null

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#D4AF37"
        size={0.02}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.6}
      />
    </Points>
  )
}

// Animated Text Component  
function AnimatedText() {
  const textRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (textRef.current) {
      textRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
      textRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.2
    }
  })

  return (
    <group ref={textRef} position={[0, 0, 0]}>
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
        <Center>
          <Text3D
  font="/fonts/helvetiker_regular.typeface.json"
            size={1.5}
            height={0.2}
            curveSegments={12}
            bevelEnabled
            bevelThickness={0.02}
            bevelSize={0.02}
            bevelOffset={0}
            bevelSegments={3}
          >
            SHREYASH
            <meshStandardMaterial 
              color="#D4AF37" 
              metalness={0.8}
              roughness={0.2}
              emissive="#D4AF37"
              emissiveIntensity={0.1}
            />
          </Text3D>
        </Center>
      </Float>
      <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.4}>
        <Center position={[0, -2, 0]}>
          <Text3D
  font="/fonts/helvetiker_regular.typeface.json"
            size={1.2}
            height={0.15}
            curveSegments={12}
            bevelEnabled
            bevelThickness={0.02}
            bevelSize={0.02}
            bevelOffset={0}
            bevelSegments={3}
          >
            DESAI
            <meshStandardMaterial 
              color="#00D4FF" 
              metalness={0.8}
              roughness={0.2}
              emissive="#00D4FF"
              emissiveIntensity={0.1}
            />
          </Text3D>
        </Center>
      </Float>
    </group>
  )
}

// Journey Globe Component
function JourneyGlobe() {
  const globeRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (globeRef.current) {
      globeRef.current.rotation.y = state.clock.elapsedTime * 0.2
      if (hovered) {
        globeRef.current.scale.setScalar(1.1)
      } else {
        globeRef.current.scale.setScalar(1)
      }
    }
  })

  return (
    <group 
      ref={globeRef} 
      position={[8, 0, -5]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <mesh>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshStandardMaterial
          color="#0A0E27"
          wireframe
          opacity={0.6}
          transparent
        />
      </mesh>
      
      {/* Oman Marker */}
      <mesh position={[0.8, 0.5, 1.2]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial color="#FF0066" emissive="#FF0066" emissiveIntensity={0.5} />
      </mesh>
      
      {/* India Marker */}
      <mesh position={[0.9, 0.2, 0.8]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial color="#00FF88" emissive="#00FF88" emissiveIntensity={0.5} />
      </mesh>
      
      {/* Connection Line */}
      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={2}
            array={new Float32Array([0.8, 0.5, 1.2, 0.9, 0.2, 0.8])}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#D4AF37" />
      </line>
      
      <Sparkles count={50} scale={3} size={2} speed={0.5} color="#D4AF37" />
    </group>
  )
}

// Scene Component
function Scene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#D4AF37" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00D4FF" />
      <spotLight position={[0, 10, 0]} intensity={0.8} color="#FAFAFA" angle={0.3} />
      
      <FloatingParticles />
      <AnimatedText />
      <JourneyGlobe />
    </>
  )
}

// Morphing Text Component
function MorphingText() {
  const texts = [
    "Computer Engineer",
    "Designer", 
    "Problem Solver",
    "Innovator"
  ]
  
  const [currentIndex, setCurrentIndex] = useState(0)
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % texts.length)
    }, 3000)
    
    return () => clearInterval(interval)
  }, [])
  
  return (
    <div className="h-16 flex items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.span
          key={currentIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="text-2xl md:text-4xl font-light text-gradient"
        >
          {texts[currentIndex]}
        </motion.span>
      </AnimatePresence>
    </div>
  )
}

// Custom Cursor Component
function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const [isPointer, setIsPointer] = useState(false)
  
  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + 'px'
        cursorRef.current.style.top = e.clientY + 'px'
      }
    }
    
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      setIsPointer(target.tagName === 'BUTTON' || target.tagName === 'A' || target.style.cursor === 'pointer')
    }
    
    document.addEventListener('mousemove', moveCursor)
    document.addEventListener('mouseover', handleMouseOver)
    
    return () => {
      document.removeEventListener('mousemove', moveCursor)
      document.removeEventListener('mouseover', handleMouseOver)
    }
  }, [])
  
  return (
    <div
      ref={cursorRef}
      className={`fixed w-6 h-6 pointer-events-none z-50 transition-transform duration-200 ${
        isPointer ? 'scale-150' : 'scale-100'
      }`}
      style={{
        background: 'radial-gradient(circle, #D4AF37, transparent)',
        borderRadius: '50%',
        mixBlendMode: 'difference',
        transform: 'translate(-50%, -50%)'
      }}
    />
  )
}

// Main Portfolio Component
export default function Portfolio() {
  const [loading, setLoading] = useState(true)
  const [scrollY, setScrollY] = useState(0)
  
  useEffect(() => {
    // Hide loading screen after 3 seconds
    const timer = setTimeout(() => {
      setLoading(false)
    }, 3000)
    
    // Handle scroll
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    
    return () => {
      clearTimeout(timer)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
  
  useEffect(() => {
    if (!loading) {
      gsap.fromTo('.hero-content', 
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.2 }
      )
    }
  }, [loading])
  
  return (
    <div className="relative">
      <CustomCursor />
      
      {/* Loading Screen */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-primary z-50 flex items-center justify-center"
          >
            <div className="text-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full mx-auto mb-6"
              />
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-accent font-mono text-lg"
              >
                Initializing Legendary Experience...
              </motion.p>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 2.5, ease: "easeInOut" }}
                className="h-1 bg-accent mt-4 mx-auto max-w-xs"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        {/* 3D Background */}
        <div className="absolute inset-0">
          <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
            <Scene />
            <OrbitControls 
              enableZoom={false} 
              enablePan={false}
              autoRotate
              autoRotateSpeed={0.5}
            />
          </Canvas>
        </div>
        
        {/* Overlay Content */}
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="container mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 3.2, duration: 1 }}
              className="hero-content"
            >
              <h1 className="text-hero font-bold mb-6 leading-tight">
                <span className="block text-accent">SHREYASH</span>
                <span className="block text-tech-blue">DESAI</span>
              </h1>
              
              <MorphingText />
              
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 3.8, duration: 0.8 }}
                className="text-xl md:text-2xl font-light text-secondary/80 mb-12 max-w-3xl mx-auto leading-relaxed"
              >
                Crafting digital solutions that bridge{' '}
                <span className="text-gradient">creativity</span> and{' '}
                <span className="text-gradient">functionality</span>
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 4.2, duration: 0.8 }}
                className="flex flex-col sm:flex-row gap-6 justify-center items-center"
              >
                <button className="btn-primary group">
                  Explore My Work
                  <motion.span
                    className="inline-block ml-2"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    →
                  </motion.span>
                </button>
                
                <button className="btn-secondary">
                  Download Resume
                </button>
              </motion.div>
              
              {/* Scroll Indicator */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 5, duration: 1 }}
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
              >
                <div className="flex flex-col items-center">
                  <p className="text-sm text-secondary/60 mb-4 font-mono">Scroll to explore</p>
                  <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="w-6 h-10 border-2 border-accent rounded-full flex justify-center"
                  >
                    <motion.div
                      animate={{ y: [0, 12, 0] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="w-1 h-3 bg-accent rounded-full mt-2"
                    />
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
        
        {/* Parallax Grid */}
        <div 
          className="absolute inset-0 opacity-20 grid-bg"
          style={{
            transform: `translateY(${scrollY * 0.5}px)`
          }}
        />
      </section>
      
      {/* About Section Preview */}
      <section className="relative min-h-screen bg-gradient-to-br from-primary via-primary-100 to-primary flex items-center">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto"
          >
            <h2 className="text-section font-bold text-center mb-16">
              The <span className="text-gradient">Journey</span>
            </h2>
            
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-subsection font-semibold mb-4 text-accent">
                    From Oman to India
                  </h3>
                  <p className="text-lg leading-relaxed text-secondary/90">
                    My story begins in the beautiful deserts of Oman, where I spent my formative years 
                    at Indian School Muscat. This international exposure shaped my global perspective 
                    and fluency in English, preparing me for a journey in technology.
                  </p>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-subsection font-semibold mb-4 text-tech-blue">
                    Engineering Excellence
                  </h3>
                  <p className="text-lg leading-relaxed text-secondary/90">
                    Currently pursuing Computer Engineering at Goa College of Engineering, 
                    I've developed expertise in full-stack development, database systems, 
                    and user experience design through hands-on projects and internships.
                  </p>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                  viewport={{ once: true }}
                  className="flex flex-wrap gap-4"
                >
                  {['PHP', 'MySQL', 'JavaScript', 'React', 'Figma', 'UI/UX'].map((skill, index) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                      viewport={{ once: true }}
                      className="px-4 py-2 bg-accent/10 border border-accent/30 rounded-full text-accent font-mono text-sm"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </motion.div>
              </div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 1 }}
                viewport={{ once: true }}
                className="relative"
              >
                {/* 3D Visualization Placeholder */}
                <div className="aspect-square bg-gradient-to-br from-accent/20 to-tech-blue/20 rounded-3xl p-8 backdrop-blur-sm border border-accent/30">
                  <div className="w-full h-full bg-primary/50 rounded-2xl flex items-center justify-center">
                    <p className="text-accent font-mono text-center">
                      Interactive 3D Journey Map<br />
                      <span className="text-sm opacity-70">Coming to life...</span>
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
