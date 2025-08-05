'use client'

import { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { 
  Float, 
  Text3D, 
  Center, 
  OrbitControls, 
  Sparkles, 
  Sphere,
  Html,
  PerspectiveCamera,
  Environment,
  Cylinder,
  Box,
  Plane
} from '@react-three/drei'
import * as THREE from 'three'
import { motion, AnimatePresence } from 'framer-motion'

// Contact information
const contactInfo = {
  name: 'Shreyash Desai',
  title: 'Computer Engineer & Designer',
  email: 'shreyashdesai60@gmail.com',
  phone: '+91 7666987026',
  location: 'Shantinagar, Ponda, Goa, India',
  coordinates: [15.4021, 74.0050], // Ponda, Goa coordinates
  availability: 'Available for full-time opportunities',
  timezone: 'IST (UTC+5:30)'
}

const socialLinks = [
  {
    id: 'github',
    name: 'GitHub',
    url: 'https://github.com/shreyashdesai',
    icon: '📁',
    color: '#333333',
    position: [-3, 2, 0] as [number, number, number]
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/shreyashdesai',
    icon: '💼',
    color: '#0077B5',
    position: [-1, 2.5, 0] as [number, number, number]
  },
  {
    id: 'email',
    name: 'Email',
    url: 'mailto:shreyashdesai60@gmail.com',
    icon: '📧',
    color: '#EA4335',
    position: [1, 2.5, 0] as [number, number, number]
  },
  {
    id: 'phone',
    name: 'Phone',
    url: 'tel:+917666987026',
    icon: '📱',
    color: '#34A853',
    position: [3, 2, 0] as [number, number, number]
  }
]

// 3D Social Media Planets Component
interface SocialPlanetProps {
  social: typeof socialLinks[0]
  onHover: (id: string) => void
  onLeave: () => void
  onClick: (url: string) => void
}

function SocialPlanet({ social, onHover, onLeave, onClick }: SocialPlanetProps) {
  const planetRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (planetRef.current) {
      planetRef.current.rotation.y = state.clock.elapsedTime * 0.5
      if (hovered) {
        planetRef.current.scale.setScalar(1.3)
      } else {
        planetRef.current.scale.setScalar(1)
      }
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <group
        ref={planetRef}
        position={social.position}
        onPointerOver={(e) => {
          e.stopPropagation()
          setHovered(true)
          onHover(social.id)
        }}
        onPointerOut={() => {
          setHovered(false)
          onLeave()
        }}
        onClick={() => onClick(social.url)}
      >
        <mesh>
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshStandardMaterial
            color={social.color}
            emissive={social.color}
            emissiveIntensity={hovered ? 0.4 : 0.2}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
        
        {/* Orbital ring */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.8, 0.05, 8, 32]} />
          <meshStandardMaterial
            color={social.color}
            emissive={social.color}
            emissiveIntensity={0.3}
            transparent
            opacity={0.6}
          />
        </mesh>
        
        {/* Icon display */}
        {hovered && (
          <Html distanceFactor={8} position={[0, 1, 0]}>
            <div className="bg-black/80 backdrop-blur-sm px-4 py-2 rounded-lg border" style={{ borderColor: social.color }}>
              <div className="text-center">
                <div className="text-2xl mb-1">{social.icon}</div>
                <p className="text-white font-bold text-sm">{social.name}</p>
              </div>
            </div>
          </Html>
        )}
        
        <Sparkles count={20} scale={1.5} size={1} speed={0.6} color={social.color} />
      </group>
    </Float>
  )
}

// 3D Contact Form Component
function ContactForm() {
  const formRef = useRef<THREE.Group>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  useFrame((state) => {
    if (formRef.current) {
      formRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.02
      formRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
    }
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitted(true)
      setFormData({ name: '', email: '', subject: '', message: '' })
      
      // Reset submitted state after 3 seconds
      setTimeout(() => setSubmitted(false), 3000)
    }, 2000)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <Float speed={0.8} rotationIntensity={0.05} floatIntensity={0.1}>
      <group ref={formRef} position={[-6, 0, 0]}>
        {/* Form Container */}
        <mesh>
          <boxGeometry args={[5, 6.5, 0.15]} />
          <meshStandardMaterial
            color="#0A0E27"
            transparent
            opacity={0.9}
            metalness={0.3}
            roughness={0.7}
          />
        </mesh>
        
        {/* Form Border */}
        <lineSegments>
          <edgesGeometry args={[new THREE.BoxGeometry(5, 6.5, 0.15)]} />
          <lineBasicMaterial color="#D4AF37" />
        </lineSegments>
        
        {/* Form Content */}
        <Html distanceFactor={8} position={[0, 0, 0.1]} transform>
          <div className="w-80 p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center mb-4"
            >
              <h3 className="text-xl font-bold text-yellow-400 mb-1">
                Let's Connect
              </h3>
              <p className="text-gray-300 text-xs">
                Ready to create something amazing together?
              </p>
            </motion.div>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-3">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full px-3 py-2 bg-black/50 border border-gray-600 rounded-lg text-white text-sm focus:border-yellow-400 focus:outline-none"
                    required
                  />
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <input
                    type="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-3 py-2 bg-black/50 border border-gray-600 rounded-lg text-white text-sm focus:border-yellow-400 focus:outline-none"
                    required
                  />
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <input
                    type="text"
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={(e) => handleInputChange('subject', e.target.value)}
                    className="w-full px-3 py-2 bg-black/50 border border-gray-600 rounded-lg text-white text-sm focus:border-yellow-400 focus:outline-none"
                    required
                  />
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <textarea
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2 bg-black/50 border border-gray-600 rounded-lg text-white text-sm focus:border-yellow-400 focus:outline-none resize-none"
                    required
                  />
                </motion.div>
                
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="w-full bg-gradient-to-r from-yellow-400 to-cyan-400 text-black font-semibold py-2 px-4 rounded-lg text-sm transition-all duration-300 hover:scale-105 disabled:opacity-50"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </motion.button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <div className="text-4xl mb-3">✨</div>
                <h3 className="text-green-400 font-bold text-lg mb-2">
                  Message Sent!
                </h3>
                <p className="text-gray-300 text-sm">
                  Thank you for reaching out. I'll get back to you soon!
                </p>
              </motion.div>
            )}
          </div>
        </Html>
        
        {/* Form particles */}
        <Sparkles count={30} scale={3} size={1.5} speed={0.3} color="#D4AF37" />
      </group>
    </Float>
  )
}

// 3D Location Visualization Component
function LocationVisualization() {
  const locationRef = useRef<THREE.Group>(null)
  const [expanded, setExpanded] = useState(false)

  useFrame((state) => {
    if (locationRef.current) {
      locationRef.current.rotation.y = state.clock.elapsedTime * 0.2
      if (expanded) {
        locationRef.current.scale.setScalar(1.5)
      } else {
        locationRef.current.scale.setScalar(1)
      }
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.3}>
      <group
        ref={locationRef}
        position={[6, 0, 0]}
        onClick={() => setExpanded(!expanded)}
        onPointerOver={() => setExpanded(true)}
        onPointerOut={() => setExpanded(false)}
      >
        {/* Globe */}
        <mesh>
          <sphereGeometry args={[1.5, 32, 32]} />
          <meshStandardMaterial
            color="#4169E1"
            wireframe
            transparent
            opacity={0.6}
          />
        </mesh>
        
        {/* India outline */}
        <mesh position={[0.3, 0.2, 1.4]}>
          <boxGeometry args={[0.4, 0.6, 0.1]} />
          <meshStandardMaterial color="#FF6B35" />
        </mesh>
        
        {/* Goa marker */}
        <mesh position={[0.2, 0, 1.45]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial
            color="#00FF88"
            emissive="#00FF88"
            emissiveIntensity={0.5}
          />
        </mesh>
        
        {/* Pulsing location ring */}
        <mesh position={[0.2, 0, 1.45]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.15, 0.02, 8, 32]} />
          <meshStandardMaterial
            color="#00FF88"
            emissive="#00FF88"
            emissiveIntensity={0.8}
          />
        </mesh>
        
        {expanded && (
          <Html distanceFactor={6} position={[2.5, 0, 0]}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-black/90 backdrop-blur-sm p-4 rounded-xl border-2 border-green-400"
            >
              <div className="text-white">
                <h3 className="text-green-400 font-bold text-lg mb-2">📍 Location</h3>
                <div className="space-y-2 text-sm">
                  <p><span className="text-gray-400">Address:</span> {contactInfo.location}</p>
                  <p><span className="text-gray-400">Timezone:</span> {contactInfo.timezone}</p>
                  <p><span className="text-gray-400">Status:</span> <span className="text-green-400">{contactInfo.availability}</span></p>
                </div>
              </div>
            </motion.div>
          </Html>
        )}
        
        <Sparkles count={40} scale={3} size={2} speed={0.4} color="#00FF88" />
      </group>
    </Float>
  )
}

// Resume Download Component
function ResumeDownload() {
  const resumeRef = useRef<THREE.Group>(null)
  const [downloading, setDownloading] = useState(false)

  useFrame((state) => {
    if (resumeRef.current) {
      if (downloading) {
        resumeRef.current.rotation.z = state.clock.elapsedTime * 2
      } else {
        resumeRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3
      }
    }
  })

  const handleDownload = () => {
    setDownloading(true)
    // Simulate download
    setTimeout(() => {
      setDownloading(false)
      // In real implementation, trigger actual download
      // window.open('/resume.pdf', '_blank')
    }, 2000)
  }

  return (
    <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.4}>
      <group
        ref={resumeRef}
        position={[0, -3, 0]}
        onClick={handleDownload}
      >
        {/* Document */}
        <mesh>
          <boxGeometry args={[1.5, 2, 0.1]} />
          <meshStandardMaterial
            color="#FFFFFF"
            metalness={0.1}
            roughness={0.8}
          />
        </mesh>
        
        {/* Document lines */}
        {Array.from({ length: 8 }, (_, i) => (
          <mesh key={i} position={[0, 0.7 - i * 0.2, 0.06]}>
            <boxGeometry args={[1.2, 0.05, 0.01]} />
            <meshStandardMaterial color="#333333" />
          </mesh>
        ))}
        
        {/* Download icon */}
        <mesh position={[0, 0, 0.06]}>
          <coneGeometry args={[0.2, 0.3, 6]} />
          <meshStandardMaterial
            color="#00D4FF"
            emissive="#00D4FF"
            emissiveIntensity={0.3}
          />
        </mesh>
        
        <Html distanceFactor={8} position={[0, -1.5, 0]}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center"
          >
            <button
              onClick={handleDownload}
              disabled={downloading}
              className="bg-cyan-400 text-black font-semibold px-6 py-2 rounded-lg text-sm transition-all duration-300 hover:scale-105 disabled:opacity-50"
            >
              {downloading ? 'Downloading...' : 'Download Resume'}
            </button>
          </motion.div>
        </Html>
        
        {downloading && (
          <Sparkles count={50} scale={2} size={3} speed={1} color="#00D4FF" />
        )}
      </group>
    </Float>
  )
}

// Main Contact Scene
function ContactScene() {
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null)

  const handleSocialHover = (id: string) => {
    setHoveredSocial(id)
  }

  const handleSocialLeave = () => {
    setHoveredSocial(null)
  }

  const handleSocialClick = (url: string) => {
    window.open(url, '_blank')
  }

  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#D4AF37" />
      <pointLight position={[-10, -10, -10]} intensity={1} color="#00D4FF" />
      <pointLight position={[0, 0, 15]} intensity={1.2} color="#FAFAFA" />
      <spotLight position={[0, 15, 0]} intensity={0.8} color="#00FF88" angle={0.6} />
      
      <ContactForm />
      <LocationVisualization />
      <ResumeDownload />
      
      {socialLinks.map((social) => (
        <SocialPlanet
          key={social.id}
          social={social}
          onHover={handleSocialHover}
          onLeave={handleSocialLeave}
          onClick={handleSocialClick}
        />
      ))}
    </>
  )
}

// Main Contact Component
export default function ContactSection() {
  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-black via-gray-900 to-blue-900 overflow-hidden">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="absolute top-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <h2 className="text-4xl md:text-6xl font-bold text-center">
          <span className="text-yellow-400">Let's</span>{' '}
          <span className="text-cyan-400">Connect</span>
        </h2>
        <p className="text-center text-gray-300 mt-4 text-lg">
          Ready to build something extraordinary together
        </p>
      </motion.div>

      {/* Contact Info Panel */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="absolute left-8 top-1/2 transform -translate-y-1/2 z-10"
      >
        <div className="bg-black/60 backdrop-blur-sm p-6 rounded-lg border border-yellow-400/30 max-w-xs">
          <h3 className="text-yellow-400 font-bold mb-3">Contact Info</h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-center space-x-3">
              <span className="text-cyan-400">📧</span>
              <span className="text-gray-300">{contactInfo.email}</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-green-400">📱</span>
              <span className="text-gray-300">{contactInfo.phone}</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-pink-400">📍</span>
              <span className="text-gray-300">Ponda, Goa</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-orange-400">🕒</span>
              <span className="text-gray-300">{contactInfo.timezone}</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Availability Status */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.7, duration: 0.8 }}
        className="absolute right-8 top-1/4 z-10"
      >
        <div className="bg-black/60 backdrop-blur-sm p-6 rounded-lg border border-green-400/30">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <h3 className="text-green-400 font-bold">Available</h3>
          </div>
          <div className="space-y-2 text-sm">
            <p className="text-gray-300">✅ Full-time opportunities</p>
            <p className="text-gray-300">✅ Freelance projects</p>
            <p className="text-gray-300">✅ Collaboration</p>
            <p className="text-gray-300">✅ Consultation</p>
          </div>
        </div>
      </motion.div>

      {/* 3D Canvas */}
      <Canvas camera={{ position: [0, 0, 12], fov: 75 }}>
        <ContactScene />
        <OrbitControls
          enableZoom={true}
          enablePan={true}
          autoRotate={false}
          minDistance={8}
          maxDistance={20}
        />
      </Canvas>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <div className="text-center">
          <p className="text-gray-300 mb-4">
            "Great things are built by teams. Let's build something great together."
          </p>
          <div className="flex space-x-4">
            <button className="bg-yellow-400 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition-colors">
              Start a Project
            </button>
            <button className="bg-cyan-400 text-black px-6 py-3 rounded-lg font-semibold hover:bg-cyan-300 transition-colors">
              Schedule Call
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
