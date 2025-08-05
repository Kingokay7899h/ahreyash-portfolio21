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
  Box
} from '@react-three/drei'
import * as THREE from 'three'
import { motion, AnimatePresence } from 'framer-motion'

// Experience data structure
const experiences = [
  {
    id: 'oman-school',
    title: 'Indian School Muscat',
    subtitle: 'KG - 10th Grade',
    period: '2008 - 2019',
    location: 'Muscat, Oman',
    description: 'International education in the Arabian desert. Developed global perspective and English fluency through diverse cultural environment.',
    achievements: ['79.4% in CBSE 10th', 'Cultural diversity exposure', 'English proficiency', 'International mindset'],
    color: '#FF6B6B',
    environment: 'desert',
    position: [0, 6, 0] as [number, number, number],
    yRotation: 0
  },
  {
    id: 'goa-higher-secondary',
    title: 'Government Higher Secondary School',
    subtitle: '11th - 12th Grade',
    period: '2020 - 2021',
    location: 'Canacona, Goa',
    description: 'Transition to Indian education system. Focused on science stream with emphasis on mathematics and physics.',
    achievements: ['69% in Goa Board', 'Science stream specialization', 'Local adaptation', 'Foundation building'],
    color: '#4ECDC4',
    environment: 'coastal',
    position: [0, 2, 0] as [number, number, number],
    yRotation: Math.PI / 2
  },
  {
    id: 'goa-engineering',
    title: 'Goa College of Engineering',
    subtitle: 'Computer Engineering',
    period: '2021 - 2025',
    location: 'Ponda, Goa',
    description: 'Pursuing Computer Engineering with focus on software development, database systems, and user experience design.',
    achievements: ['Full-stack development', 'Database expertise', 'UI/UX design skills', 'Project leadership'],
    color: '#45B7D1',
    environment: 'campus',
    position: [0, -2, 0] as [number, number, number],
    yRotation: Math.PI
  },
  {
    id: 'fluxatic-internship',
    title: 'Fluxatic™ Global',
    subtitle: 'UI/UX Designer Intern',
    period: 'June - August 2024',
    location: 'Remote',
    description: 'Professional internship focusing on user interface design and user experience optimization for enterprise applications.',
    achievements: ['Enterprise UI design', 'User research', 'Design systems', 'Client collaboration'],
    color: '#96CEB4',
    environment: 'corporate',
    position: [0, -6, 0] as [number, number, number],
    yRotation: 3 * Math.PI / 2
  }
]

// DNA Helix Structure Component
function DNAHelix() {
  const helixRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (helixRef.current) {
      helixRef.current.rotation.y = state.clock.elapsedTime * 0.05
    }
  })

  const helixPoints1 = []
  const helixPoints2 = []
  const steps = 80
  const radius = 1.5
  const height = 12

  for (let i = 0; i < steps; i++) {
    const angle = (i / steps) * Math.PI * 3 // 1.5 full rotations
    const y = (i / steps) * height - height / 2
    
    // First strand
    helixPoints1.push(
      Math.cos(angle) * radius,
      y,
      Math.sin(angle) * radius
    )
    
    // Second strand (opposite)
    helixPoints2.push(
      Math.cos(angle + Math.PI) * radius,
      y,
      Math.sin(angle + Math.PI) * radius
    )
  }

  return (
    <group ref={helixRef}>
      {/* First DNA Strand */}
      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={helixPoints1.length / 3}
            array={new Float32Array(helixPoints1)}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#D4AF37" transparent opacity={0.8} />
      </line>
      
      {/* Second DNA Strand */}
      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={helixPoints2.length / 3}
            array={new Float32Array(helixPoints2)}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#00D4FF" transparent opacity={0.8} />
      </line>
      
      {/* Connection bridges */}
      {Array.from({ length: 15 }, (_, i) => {
        const angle = (i / 15) * Math.PI * 3
        const y = (i / 15) * height - height / 2
        return (
          <line key={i}>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                count={2}
                array={new Float32Array([
                  Math.cos(angle) * radius, y, Math.sin(angle) * radius,
                  Math.cos(angle + Math.PI) * radius, y, Math.sin(angle + Math.PI) * radius
                ])}
                itemSize={3}
              />
            </bufferGeometry>
            <lineBasicMaterial color="#00FF88" transparent opacity={0.5} />
          </line>
        )
      })}
    </group>
  )
}

// Experience Node Component
interface ExperienceNodeProps {
  experience: typeof experiences[0]
  isActive: boolean
  onClick: (id: string) => void
  onHover: (id: string) => void
  onLeave: () => void
}

function ExperienceNode({ experience, isActive, onClick, onHover, onLeave }: ExperienceNodeProps) {
  const nodeRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (nodeRef.current) {
      if (isActive || hovered) {
        nodeRef.current.scale.setScalar(1.4)
      } else {
        nodeRef.current.scale.setScalar(1)
      }
      
      // Gentle floating animation
      nodeRef.current.position.x = experience.position[0] + Math.sin(state.clock.elapsedTime * 0.8 + experience.position[1]) * 0.3
      nodeRef.current.position.z = experience.position[2] + Math.cos(state.clock.elapsedTime * 0.6 + experience.position[1]) * 0.3
    }
  })

  return (
    <Float speed={1.2} rotationIntensity={0.1} floatIntensity={0.3}>
      <group
        ref={nodeRef}
        position={experience.position}
        onClick={() => onClick(experience.id)}
        onPointerOver={(e) => {
          e.stopPropagation()
          setHovered(true)
          onHover(experience.id)
        }}
        onPointerOut={() => {
          setHovered(false)
          onLeave()
        }}
      >
        {/* Main node sphere */}
        <mesh>
          <sphereGeometry args={[0.6, 32, 32]} />
          <meshStandardMaterial
            color={experience.color}
            emissive={experience.color}
            emissiveIntensity={isActive || hovered ? 0.5 : 0.2}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
        
        {/* Orbital ring */}
        <mesh rotation={[Math.PI / 2, experience.yRotation, 0]}>
          <torusGeometry args={[1, 0.04, 8, 32]} />
          <meshStandardMaterial
            color={experience.color}
            emissive={experience.color}
            emissiveIntensity={0.4}
            transparent
            opacity={0.8}
          />
        </mesh>
        
        {/* Environment indicators */}
        {experience.environment === 'desert' && (
          <>
            <mesh position={[1.2, 0, 0]}>
              <coneGeometry args={[0.15, 0.5, 6]} />
              <meshStandardMaterial color="#DEB887" />
            </mesh>
            <mesh position={[-1.2, 0, 0]}>
              <coneGeometry args={[0.1, 0.3, 6]} />
              <meshStandardMaterial color="#D2B48C" />
            </mesh>
            <Sparkles count={20} scale={2} size={1} speed={0.3} color="#FFD700" />
          </>
        )}
        
        {experience.environment === 'coastal' && (
          <>
            <mesh position={[1.2, -0.2, 0]}>
              <sphereGeometry args={[0.2, 16, 16]} />
              <meshStandardMaterial color="#87CEEB" transparent opacity={0.8} />
            </mesh>
            <mesh position={[-1.2, -0.2, 0]}>
              <cylinderGeometry args={[0.05, 0.05, 0.8, 8]} />
              <meshStandardMaterial color="#8FBC8F" />
            </mesh>
            <Sparkles count={15} scale={1.5} size={0.8} speed={0.4} color="#20B2AA" />
          </>
        )}
        
        {experience.environment === 'campus' && (
          <>
            <mesh position={[1.2, 0, 0]}>
              <boxGeometry args={[0.3, 0.4, 0.2]} />
              <meshStandardMaterial color="#8B4513" />
            </mesh>
            <mesh position={[-1.2, 0, 0]}>
              <cylinderGeometry args={[0.1, 0.1, 0.6, 8]} />
              <meshStandardMaterial color="#228B22" />
            </mesh>
            <Sparkles count={25} scale={2} size={1.2} speed={0.2} color="#4169E1" />
          </>
        )}
        
        {experience.environment === 'corporate' && (
          <>
            <mesh position={[1.2, 0, 0]}>
              <boxGeometry args={[0.2, 0.5, 0.1]} />
              <meshStandardMaterial color="#2F4F4F" />
            </mesh>
            <mesh position={[-1.2, 0, 0]}>
              <boxGeometry args={[0.15, 0.4, 0.08]} />
              <meshStandardMaterial color="#708090" />
            </mesh>
            <Sparkles count={30} scale={1.8} size={0.6} speed={0.5} color="#32CD32" />
          </>
        )}
        
        {/* Info panel when active or hovered */}
        {(isActive || hovered) && (
          <Html distanceFactor={8} position={[2.5, 0, 0]}>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-black/90 backdrop-blur-sm p-6 rounded-xl border-2 max-w-sm"
              style={{ borderColor: experience.color }}
            >
              <div className="text-white">
                <h3 className="font-bold text-xl mb-2" style={{ color: experience.color }}>
                  {experience.title}
                </h3>
                <p className="text-gray-300 text-sm mb-1">{experience.subtitle}</p>
                <p className="text-gray-400 text-xs mb-3">{experience.period} • {experience.location}</p>
                <p className="text-gray-200 text-sm mb-4 leading-relaxed">
                  {experience.description}
                </p>
                <div>
                  <h4 className="font-semibold text-sm mb-2" style={{ color: experience.color }}>
                    Key Achievements:
                  </h4>
                  <ul className="text-xs space-y-1">
                    {experience.achievements.map((achievement, index) => (
                      <li key={index} className="text-gray-300">
                        • {achievement}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </Html>
        )}
      </group>
    </Float>
  )
}

// Timeline Labels Component
function TimelineLabels() {
  return (
    <>
      {experiences.map((exp, index) => (
        <Html key={exp.id} position={[-4, exp.position[1], 0]}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.2 }}
            className="text-right"
          >
            <p className="text-white font-bold text-lg">{exp.period}</p>
            <p className="text-gray-400 text-sm">{exp.location}</p>
          </motion.div>
        </Html>
      ))}
    </>
  )
}

// Achievement Counters Component
function AchievementCounters() {
  const [counts, setCounts] = useState({
    years: 0,
    institutions: 0,
    skills: 0,
    projects: 0
  })

  useEffect(() => {
    const targets = { years: 17, institutions: 4, skills: 12, projects: 8 }
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
        setCounts(prev => ({ ...prev, [key]: Math.floor(current) }))
      }, stepTime)
    })
  }, [])

  return (
    <Html position={[4, 0, 0]}>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
        className="bg-black/80 backdrop-blur-sm p-6 rounded-xl border border-yellow-400/30"
      >
        <h3 className="text-yellow-400 font-bold text-lg mb-4 text-center">Journey Stats</h3>
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <p className="text-3xl font-bold text-cyan-400">{counts.years}</p>
            <p className="text-gray-300 text-sm">Years Learning</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-green-400">{counts.institutions}</p>
            <p className="text-gray-300 text-sm">Institutions</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-pink-400">{counts.skills}</p>
            <p className="text-gray-300 text-sm">Skills Mastered</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-orange-400">{counts.projects}</p>
            <p className="text-gray-300 text-sm">Projects Built</p>
          </div>
        </div>
      </motion.div>
    </Html>
  )
}

// Main Experience Scene
function ExperienceScene() {
  const [activeNode, setActiveNode] = useState<string | null>(null)
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)

  const handleNodeClick = (id: string) => {
    setActiveNode(activeNode === id ? null : id)
  }

  const handleNodeHover = (id: string) => {
    setHoveredNode(id)
  }

  const handleNodeLeave = () => {
    setHoveredNode(null)
  }

  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1.2} color="#D4AF37" />
      <pointLight position={[-10, -10, -10]} intensity={0.8} color="#00D4FF" />
      <pointLight position={[0, 0, 15]} intensity={1} color="#FAFAFA" />
      <spotLight position={[0, 12, 0]} intensity={0.6} color="#00FF88" angle={0.5} />
      
      <DNAHelix />
      <TimelineLabels />
      <AchievementCounters />
      
      {experiences.map((experience) => (
        <ExperienceNode
          key={experience.id}
          experience={experience}
          isActive={activeNode === experience.id}
          onClick={handleNodeClick}
          onHover={handleNodeHover}
          onLeave={handleNodeLeave}
        />
      ))}
    </>
  )
}

// Main Experience Journey Component
export default function ExperienceJourney() {
  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 overflow-hidden">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="absolute top-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <h2 className="text-4xl md:text-6xl font-bold text-center">
          <span className="text-yellow-400">Experience</span>{' '}
          <span className="text-cyan-400">Journey</span>
        </h2>
        <p className="text-center text-gray-300 mt-4 text-lg">
          Navigate through my educational and professional DNA
        </p>
      </motion.div>

      {/* Instructions */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="absolute left-8 top-1/2 transform -translate-y-1/2 z-10"
      >
        <div className="bg-black/60 backdrop-blur-sm p-6 rounded-lg border border-yellow-400/30 max-w-xs">
          <h3 className="text-yellow-400 font-bold mb-3">Navigation</h3>
          <ul className="text-gray-300 text-sm space-y-2">
            <li>• <span className="text-cyan-400">Click</span> nodes for details</li>
            <li>• <span className="text-green-400">Hover</span> for quick info</li>
            <li>• <span className="text-yellow-400">Drag</span> to rotate timeline</li>
            <li>• DNA strands show <span className="text-pink-400">growth</span></li>
          </ul>
        </div>
      </motion.div>

      {/* Legend */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.7, duration: 0.8 }}
        className="absolute right-8 top-1/4 z-10"
      >
        <div className="bg-black/60 backdrop-blur-sm p-6 rounded-lg border border-yellow-400/30">
          <h3 className="text-yellow-400 font-bold mb-3">Timeline Stages</h3>
          <div className="space-y-3">
            {experiences.map((exp) => (
              <div key={exp.id} className="flex items-center space-x-3">
                <div 
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: exp.color }}
                />
                <div>
                  <p className="text-white text-sm font-medium">{exp.title}</p>
                  <p className="text-gray-400 text-xs">{exp.period}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* 3D Canvas */}
      <Canvas camera={{ position: [0, 0, 12], fov: 75 }}>
        <ExperienceScene />
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          autoRotate={false}
          minDistance={8}
          maxDistance={20}
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
            Auto Rotate
          </button>
          <button className="bg-cyan-400 text-black px-6 py-3 rounded-lg font-semibold hover:bg-cyan-300 transition-colors">
            Reset View
          </button>
        </div>
      </motion.div>
    </div>
  )
}