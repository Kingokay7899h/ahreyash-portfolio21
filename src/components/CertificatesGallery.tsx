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

// Certificates data structure
const certificates = [
  {
    id: 'nptel-hci',
    title: 'Human-Computer Interaction',
    issuer: 'NPTEL - IIT Madras',
    date: '2024',
    category: 'UI/UX & Design',
    description: 'Comprehensive study of human-computer interaction principles, usability testing, and user interface design methodologies.',
    skills: ['User Experience Design', 'Usability Testing', 'Interface Design', 'User Research'],
    grade: 'Elite',
    credentialId: 'NPTEL24CS01',
    color: '#FF6B6B',
    position: [-6, 2, 0] as [number, number, number],
    rotation: [0, Math.PI / 6, 0] as [number, number, number]
  },
  {
    id: 'nptel-sna',
    title: 'Social Network Analysis',
    issuer: 'NPTEL - IIT Kharagpur',
    date: '2024',
    category: 'Data Analysis',
    description: 'Advanced concepts in social network analysis, graph theory, and network visualization techniques for complex data structures.',
    skills: ['Network Analysis', 'Graph Theory', 'Data Visualization', 'Statistical Analysis'],
    grade: 'Elite',
    credentialId: 'NPTEL24MA02',
    color: '#4ECDC4',
    position: [-2, 3, -2] as [number, number, number],
    rotation: [0, -Math.PI / 8, 0] as [number, number, number]
  },
  {
    id: 'nptel-leadership',
    title: 'Leadership and Team Effectiveness',
    issuer: 'NPTEL - IIT Roorkee',
    date: '2024',
    category: 'Management & Leadership',
    description: 'Strategic leadership principles, team dynamics, organizational behavior, and effective communication in professional environments.',
    skills: ['Team Leadership', 'Project Management', 'Communication', 'Strategic Planning'],
    grade: 'Elite',
    credentialId: 'NPTEL24HS03',
    color: '#45B7D1',
    position: [2, 2.5, -1] as [number, number, number],
    rotation: [0, Math.PI / 4, 0] as [number, number, number]
  },
  {
    id: 'nptel-privacy',
    title: 'Privacy and Security in Online Social Media',
    issuer: 'NPTEL - IIT Madras',
    date: '2024',
    category: 'Cybersecurity',
    description: 'Security frameworks, privacy protection mechanisms, and risk assessment strategies for social media platforms.',
    skills: ['Cybersecurity', 'Privacy Protection', 'Risk Assessment', 'Security Frameworks'],
    grade: 'Elite',
    credentialId: 'NPTEL24CS04',
    color: '#96CEB4',
    position: [6, 1.5, 0] as [number, number, number],
    rotation: [0, -Math.PI / 3, 0] as [number, number, number]
  },
  {
    id: 'trading-cert',
    title: 'Financial Trading & Risk Management',
    issuer: 'Trading Academy',
    date: '2023',
    category: 'Finance & Analytics',
    description: 'Advanced financial trading strategies, risk management techniques, and market analysis for strategic decision making.',
    skills: ['Risk Management', 'Financial Analysis', 'Strategic Thinking', 'Market Research'],
    grade: 'Certified Professional',
    credentialId: 'TA2023FIN',
    color: '#FFD700',
    position: [0, 0.5, 2] as [number, number, number],
    rotation: [0, 0, 0] as [number, number, number]
  }
]

// Certificate Display Component
interface CertificateDisplayProps {
  certificate: typeof certificates[0]
  isActive: boolean
  onClick: (id: string) => void
  onHover: (id: string) => void
  onLeave: () => void
}

function CertificateDisplay({ certificate, isActive, onClick, onHover, onLeave }: CertificateDisplayProps) {
  const frameRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (frameRef.current) {
      if (isActive) {
        frameRef.current.scale.setScalar(1.3)
        frameRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
      } else if (hovered) {
        frameRef.current.scale.setScalar(1.1)
      } else {
        frameRef.current.scale.setScalar(1)
      }
      
      // Gentle floating animation
      frameRef.current.position.y = certificate.position[1] + Math.sin(state.clock.elapsedTime * 0.6 + certificate.position[0]) * 0.1
    }
  })

  return (
    <Float speed={1} rotationIntensity={0.1} floatIntensity={0.2}>
      <group
        ref={frameRef}
        position={certificate.position}
        rotation={certificate.rotation}
        onClick={() => onClick(certificate.id)}
        onPointerOver={(e) => {
          e.stopPropagation()
          setHovered(true)
          onHover(certificate.id)
        }}
        onPointerOut={() => {
          setHovered(false)
          onLeave()
        }}
      >
        {/* Certificate Frame */}
        <mesh>
          <boxGeometry args={[3, 2.2, 0.1]} />
          <meshStandardMaterial
            color="#8B4513"
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
        
        {/* Certificate Paper */}
        <mesh position={[0, 0, 0.06]}>
          <planeGeometry args={[2.8, 2]} />
          <meshStandardMaterial
            color="#FFFEF7"
            metalness={0.1}
            roughness={0.8}
          />
        </mesh>
        
        {/* Premium Gold Border */}
        <mesh position={[0, 0, 0.07]}>
          <planeGeometry args={[2.6, 1.8]} />
          <meshStandardMaterial
            color={certificate.color}
            emissive={certificate.color}
            emissiveIntensity={0.2}
            transparent
            opacity={0.8}
          />
        </mesh>
        
        {/* Certificate Content Area */}
        <mesh position={[0, 0, 0.08]}>
          <planeGeometry args={[2.4, 1.6]} />
          <meshStandardMaterial
            color="#FFFFFF"
            metalness={0.1}
            roughness={0.9}
          />
        </mesh>
        
        {/* Holographic Seal */}
        <mesh position={[0.8, -0.6, 0.09]} rotation={[0, 0, state => state.clock.elapsedTime]}>
          <cylinderGeometry args={[0.15, 0.15, 0.02, 8]} />
          <meshStandardMaterial
            color={certificate.color}
            emissive={certificate.color}
            emissiveIntensity={0.5}
            metalness={1}
            roughness={0}
          />
        </mesh>
        
        {/* Grade Badge */}
        <mesh position={[-0.8, 0.7, 0.09]}>
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshStandardMaterial
            color="#FFD700"
            emissive="#FFD700"
            emissiveIntensity={0.3}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
        
        {/* Museum Lighting */}
        <spotLight
          position={[0, 2, 1]}
          intensity={isActive || hovered ? 2 : 1}
          color={certificate.color}
          angle={0.3}
          penumbra={0.5}
          target={frameRef.current}
        />
        
        {/* Particle Effects */}
        {(isActive || hovered) && (
          <Sparkles
            count={30}
            scale={4}
            size={2}
            speed={0.4}
            color={certificate.color}
          />
        )}
        
        {/* Certificate Details Panel */}
        {isActive && (
          <Html distanceFactor={6} position={[4, 0, 0]}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-black/90 backdrop-blur-sm p-6 rounded-xl border-2 max-w-sm"
              style={{ borderColor: certificate.color }}
            >
              <div className="text-white">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-lg" style={{ color: certificate.color }}>
                    {certificate.title}
                  </h3>
                  <span 
                    className="px-3 py-1 rounded-full text-xs font-bold"
                    style={{ backgroundColor: certificate.color, color: '#000' }}
                  >
                    {certificate.grade}
                  </span>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <p className="text-gray-300 text-sm font-medium">{certificate.issuer}</p>
                    <p className="text-gray-400 text-xs">{certificate.date} • {certificate.category}</p>
                  </div>
                  
                  <p className="text-gray-200 text-sm leading-relaxed">
                    {certificate.description}
                  </p>
                  
                  <div>
                    <h4 className="font-semibold text-sm mb-2" style={{ color: certificate.color }}>
                      Skills Gained:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {certificate.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-1 text-xs rounded-full border"
                          style={{ borderColor: certificate.color, color: certificate.color }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="pt-3 border-t border-gray-600">
                    <p className="text-gray-400 text-xs">
                      Credential ID: {certificate.credentialId}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </Html>
        )}
        
        {/* Quick Info on Hover */}
        {hovered && !isActive && (
          <Html distanceFactor={8} position={[0, 1.5, 0]}>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-black/80 backdrop-blur-sm px-4 py-2 rounded-lg border"
              style={{ borderColor: certificate.color }}
            >
              <p className="text-white font-bold text-sm whitespace-nowrap">
                {certificate.title}
              </p>
              <p className="text-gray-300 text-xs">
                {certificate.issuer} • {certificate.grade}
              </p>
            </motion.div>
          </Html>
        )}
      </group>
    </Float>
  )
}

// Museum Floor Component
function MuseumFloor() {
  const floorRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (floorRef.current) {
      // Subtle reflection effect
      floorRef.current.material.opacity = 0.1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.05
    }
  })

  return (
    <mesh ref={floorRef} position={[0, -2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[30, 30]} />
      <meshStandardMaterial
        color="#1a1a1a"
        metalness={0.9}
        roughness={0.1}
        transparent
        opacity={0.1}
      />
    </mesh>
  )
}

// Museum Pillars Component
function MuseumPillars() {
  const pillars = [
    { position: [-10, 0, -5] as [number, number, number] },
    { position: [10, 0, -5] as [number, number, number] },
    { position: [-10, 0, 5] as [number, number, number] },
    { position: [10, 0, 5] as [number, number, number] }
  ]

  return (
    <>
      {pillars.map((pillar, index) => (
        <group key={index} position={pillar.position}>
          <mesh>
            <cylinderGeometry args={[0.3, 0.4, 6, 12]} />
            <meshStandardMaterial
              color="#8B4513"
              metalness={0.3}
              roughness={0.7}
            />
          </mesh>
          
          {/* Pillar Capital */}
          <mesh position={[0, 3.2, 0]}>
            <cylinderGeometry args={[0.5, 0.3, 0.4, 12]} />
            <meshStandardMaterial
              color="#CD853F"
              metalness={0.4}
              roughness={0.6}
            />
          </mesh>
          
          {/* Pillar Base */}
          <mesh position={[0, -3.2, 0]}>
            <cylinderGeometry args={[0.5, 0.4, 0.4, 12]} />
            <meshStandardMaterial
              color="#CD853F"
              metalness={0.4}
              roughness={0.6}
            />
          </mesh>
        </group>
      ))}
    </>
  )
}

// Achievement Stats Component
function AchievementStats() {
  const [stats, setStats] = useState({
    certificates: 0,
    eliteGrades: 0,
    institutions: 0,
    skillsLearned: 0
  })

  useEffect(() => {
    const targets = { certificates: 5, eliteGrades: 4, institutions: 3, skillsLearned: 16 }
    const duration = 2000
    const steps = 60
    const stepTime = duration / steps

    Object.keys(targets).forEach(key => {
      const target = targets[key as keyof typeof targets]
      const increment = target / steps
      let current = 0

      const timer = setInterval(() => {
        current += increment
        if (current >= target) {
          current = target
          clearInterval(timer)
        }
        setStats(prev => ({ ...prev, [key]: Math.floor(current) }))
      }, stepTime)
    })
  }, [])

  return (
    <Html position={[0, 4, -4]}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-black/80 backdrop-blur-sm p-6 rounded-xl border border-yellow-400/30"
      >
        <h3 className="text-yellow-400 font-bold text-xl mb-4 text-center">
          Certification Gallery
        </h3>
        <div className="grid grid-cols-2 gap-6 text-center">
          <div>
            <p className="text-3xl font-bold text-cyan-400">{stats.certificates}</p>
            <p className="text-gray-300 text-sm">Certificates</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-green-400">{stats.eliteGrades}</p>
            <p className="text-gray-300 text-sm">Elite Grades</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-pink-400">{stats.institutions}</p>
            <p className="text-gray-300 text-sm">Institutions</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-orange-400">{stats.skillsLearned}</p>
            <p className="text-gray-300 text-sm">Skills Learned</p>
          </div>
        </div>
      </motion.div>
    </Html>
  )
}

// Main Certificates Scene
function CertificatesScene() {
  const [activeCertificate, setActiveCertificate] = useState<string | null>(null)
  const [hoveredCertificate, setHoveredCertificate] = useState<string | null>(null)

  const handleCertificateClick = (id: string) => {
    setActiveCertificate(activeCertificate === id ? null : id)
  }

  const handleCertificateHover = (id: string) => {
    setHoveredCertificate(id)
  }

  const handleCertificateLeave = () => {
    setHoveredCertificate(null)
  }

  return (
    <>
      {/* Museum Lighting */}
      <ambientLight intensity={0.3} />
      <directionalLight position={[0, 10, 5]} intensity={1} color="#FFD700" />
      <pointLight position={[5, 5, 5]} intensity={0.8} color="#FFFFFF" />
      <pointLight position={[-5, 5, 5]} intensity={0.8} color="#FFFFFF" />
      <spotLight position={[0, 8, 0]} intensity={1.5} color="#FFD700" angle={0.8} />
      
      <MuseumFloor />
      <MuseumPillars />
      <AchievementStats />
      
      {certificates.map((certificate) => (
        <CertificateDisplay
          key={certificate.id}
          certificate={certificate}
          isActive={activeCertificate === certificate.id}
          onClick={handleCertificateClick}
          onHover={handleCertificateHover}
          onLeave={handleCertificateLeave}
        />
      ))}
    </>
  )
}

// Main Certificates Gallery Component
export default function CertificatesGallery() {
  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-gray-900 via-black to-brown-900 overflow-hidden">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="absolute top-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <h2 className="text-4xl md:text-6xl font-bold text-center">
          <span className="text-yellow-400">Certificates</span>{' '}
          <span className="text-amber-400">Gallery</span>
        </h2>
        <p className="text-center text-gray-300 mt-4 text-lg">
          A premium museum of academic achievements
        </p>
      </motion.div>

      {/* Museum Guide */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="absolute left-8 top-1/2 transform -translate-y-1/2 z-10"
      >
        <div className="bg-black/60 backdrop-blur-sm p-6 rounded-lg border border-yellow-400/30 max-w-xs">
          <h3 className="text-yellow-400 font-bold mb-3">Museum Guide</h3>
          <ul className="text-gray-300 text-sm space-y-2">
            <li>• <span className="text-cyan-400">Click</span> certificates for details</li>
            <li>• <span className="text-green-400">Hover</span> for quick info</li>
            <li>• <span className="text-yellow-400">Walk around</span> the gallery</li>
            <li>• <span className="text-pink-400">Elite grades</span> have special effects</li>
          </ul>
        </div>
      </motion.div>

      {/* Category Legend */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.7, duration: 0.8 }}
        className="absolute right-8 top-1/4 z-10"
      >
        <div className="bg-black/60 backdrop-blur-sm p-6 rounded-lg border border-yellow-400/30">
          <h3 className="text-yellow-400 font-bold mb-3">Categories</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 rounded-full bg-red-400"></div>
              <span className="text-gray-300 text-sm">UI/UX & Design</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 rounded-full bg-teal-400"></div>
              <span className="text-gray-300 text-sm">Data Analysis</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 rounded-full bg-blue-400"></div>
              <span className="text-gray-300 text-sm">Leadership</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 rounded-full bg-green-400"></div>
              <span className="text-gray-300 text-sm">Cybersecurity</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 rounded-full bg-yellow-400"></div>
              <span className="text-gray-300 text-sm">Finance</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 3D Canvas */}
      <Canvas camera={{ position: [0, 2, 8], fov: 75 }}>
        <CertificatesScene />
        <OrbitControls
          enableZoom={true}
          enablePan={true}
          autoRotate={false}
          minDistance={5}
          maxDistance={15}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI - Math.PI / 6}
        />
      </Canvas>

      {/* Navigation Controls */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <div className="flex space-x-4">
          <button className="bg-yellow-400 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition-colors">
            View All Certificates
          </button>
          <button className="bg-amber-400 text-black px-6 py-3 rounded-lg font-semibold hover:bg-amber-300 transition-colors">
            Verify Credentials
          </button>
        </div>
      </motion.div>
    </div>
  )
}
