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
  Plane,
  Image as DreiImage
} from '@react-three/drei'
import * as THREE from 'three'
import { motion, AnimatePresence } from 'framer-motion'

// Projects data structure
const projects = [
  {
    id: 'dams',
    title: 'DAMS - Departmental Asset Management System',
    subtitle: 'College Digitization Project',
    category: 'Full-Stack Web Application',
    tech: ['PHP', 'MySQL', 'JavaScript', 'Bootstrap', 'jQuery'],
    description: 'Comprehensive digital transformation solution for government departments, featuring OTP-based authentication, role-specific dashboards, approval workflows, and e-signature integration.',
    features: [
      'OTP-based secure login system',
      'Role-based dashboard access (Admin, Staff, Approver)',
      'Multi-level approval workflows',
      'E-signature integration for documents',
      'Real-time email notifications',
      'Inventory management system',
      'Procurement tracking',
      'PDF report generation'
    ],
    impact: '100% paperless workflow • 70% cost reduction • 50% faster approvals',
    screenshots: 8,
    color: '#4169E1',
    position: [-8, 2, 0] as [number, number, number],
    environment: 'government'
  },
  {
    id: 'puregleam',
    title: 'PureGleam - Dental Clinic Management',
    subtitle: 'Healthcare Web Application',
    category: 'Medical Management System',
    tech: ['PHP', 'MySQL', 'HTML/CSS', 'JavaScript', 'Bootstrap'],
    description: 'Modern dental clinic management system with online appointment booking, patient reviews, automated notifications, and comprehensive admin dashboard for efficient healthcare delivery.',
    features: [
      'Online appointment booking system',
      'Patient review and rating system',
      'Automated email notifications',
      'Service catalog management',
      'Responsive mobile-first design',
      'Admin dashboard for clinic management',
      'Patient history tracking',
      'SMS notification integration'
    ],
    impact: '300+ appointments booked • 95% patient satisfaction • 40% admin time saved',
    screenshots: 8,
    color: '#00CED1',
    position: [0, 0, 0] as [number, number, number],
    environment: 'healthcare'
  },
  {
    id: 'cricket-gear',
    title: 'Cricket Gear Hub - E-commerce UI/UX',
    subtitle: 'Mobile App Design System',
    category: 'UI/UX Design Project',
    tech: ['Figma', 'Wireframing', 'Prototyping', 'Design Systems', 'User Research'],
    description: 'Comprehensive e-commerce mobile app design for cricket equipment with 200+ wireframes, interactive prototypes, and complete design system focusing on user experience and conversion optimization.',
    features: [
      '200+ detailed wireframes',
      'Interactive high-fidelity prototypes',
      'Complete design system with components',
      'User journey mapping',
      'Color psychology implementation',
      'Typography hierarchy design',
      'Accessibility-compliant design',
      'Cross-platform consistency'
    ],
    impact: '200+ wireframes • 15+ user flows • Complete design system',
    screenshots: 8,
    color: '#FF6B35',
    position: [8, -2, 0] as [number, number, number],
    environment: 'design'
  }
]

// 3D Project Hologram Component
interface ProjectHologramProps {
  project: typeof projects[0]
  isActive: boolean
  onSelect: (id: string) => void
  onHover: (id: string) => void
  onLeave: () => void
}

function ProjectHologram({ project, isActive, onSelect, onHover, onLeave }: ProjectHologramProps) {
  const hologramRef = useRef<THREE.Group>(null)
  const [currentScreenshot, setCurrentScreenshot] = useState(0)
  const [hovered, setHovered] = useState(false)

  // Auto-cycle through screenshots
  useEffect(() => {
    if (isActive || hovered) {
      const interval = setInterval(() => {
        setCurrentScreenshot((prev) => (prev + 1) % project.screenshots)
      }, 2000)
      return () => clearInterval(interval)
    }
  }, [isActive, hovered, project.screenshots])

  useFrame((state) => {
    if (hologramRef.current) {
      if (isActive) {
        hologramRef.current.scale.setScalar(1.5)
        hologramRef.current.rotation.y = state.clock.elapsedTime * 0.3
      } else if (hovered) {
        hologramRef.current.scale.setScalar(1.2)
        hologramRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2
      } else {
        hologramRef.current.scale.setScalar(1)
        hologramRef.current.rotation.y = state.clock.elapsedTime * 0.1
      }
      
      // Floating animation
      hologramRef.current.position.y = project.position[1] + Math.sin(state.clock.elapsedTime * 0.8 + project.position[0]) * 0.2
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.3}>
      <group
        ref={hologramRef}
        position={project.position}
        onClick={() => onSelect(project.id)}
        onPointerOver={(e) => {
          e.stopPropagation()
          setHovered(true)
          onHover(project.id)
        }}
        onPointerOut={() => {
          setHovered(false)
          onLeave()
        }}
      >
        {/* Main project container */}
        <group>
          {/* Central holographic display */}
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[3, 2, 0.1]} />
            <meshStandardMaterial
              color={project.color}
              emissive={project.color}
              emissiveIntensity={0.3}
              transparent
              opacity={0.7}
            />
          </mesh>
          
          {/* Screenshot display area */}
          <mesh position={[0, 0, 0.06]}>
            <planeGeometry args={[2.8, 1.8]} />
            <meshStandardMaterial
              color="#000000"
              transparent
              opacity={0.9}
            />
          </mesh>
          
          {/* Holographic border */}
          <lineSegments>
            <edgesGeometry args={[new THREE.BoxGeometry(3, 2, 0.1)]} />
            <lineBasicMaterial color={project.color} />
          </lineSegments>
          
          {/* Environment-specific 3D elements */}
          {project.environment === 'government' && (
            <>
              <mesh position={[-2, 1.5, 0]}>
                <boxGeometry args={[0.3, 0.6, 0.2]} />
                <meshStandardMaterial color="#8B4513" />
              </mesh>
              <mesh position={[2, 1.5, 0]}>
                <cylinderGeometry args={[0.1, 0.1, 0.8, 8]} />
                <meshStandardMaterial color="#CD853F" />
              </mesh>
            </>
          )}
          
          {project.environment === 'healthcare' && (
            <>
              <mesh position={[-2, 1.5, 0]}>
                <cylinderGeometry args={[0.15, 0.15, 0.4, 12]} />
                <meshStandardMaterial color="#FFFFFF" />
              </mesh>
              <mesh position={[2, 1.5, 0]}>
                <boxGeometry args={[0.2, 0.1, 0.4]} />
                <meshStandardMaterial color="#FF6B6B" />
              </mesh>
            </>
          )}
          
          {project.environment === 'design' && (
            <>
              <mesh position={[-2, 1.5, 0]}>
                <cylinderGeometry args={[0.1, 0.3, 0.6, 6]} />
                <meshStandardMaterial color="#FFD700" />
              </mesh>
              <mesh position={[2, 1.5, 0]}>
                <torusGeometry args={[0.2, 0.05, 8, 16]} />
                <meshStandardMaterial color="#FF69B4" />
              </mesh>
            </>
          )}
          
          {/* Data visualization streams */}
          {isActive && (
            <>
              <Sparkles count={50} scale={4} size={2} speed={0.8} color={project.color} />
              {/* Floating data points */}
              {Array.from({ length: 8 }, (_, i) => (
                <mesh key={i} position={[
                  Math.cos((i / 8) * Math.PI * 2) * 2.5,
                  Math.sin((i / 8) * Math.PI * 2) * 1.5,
                  0.5
                ]}>
                  <sphereGeometry args={[0.08, 8, 8]} />
                  <meshStandardMaterial
                    color={project.color}
                    emissive={project.color}
                    emissiveIntensity={0.5}
                  />
                </mesh>
              ))}
            </>
          )}
          
          {/* Project info panel */}
          {(isActive || hovered) && (
            <Html distanceFactor={6} position={[0, -1.5, 0]}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-black/90 backdrop-blur-sm p-6 rounded-xl border-2 max-w-md"
                style={{ borderColor: project.color }}
              >
                <div className="text-white">
                  <h3 className="font-bold text-xl mb-2" style={{ color: project.color }}>
                    {project.title}
                  </h3>
                  <p className="text-gray-300 text-sm mb-1">{project.subtitle}</p>
                  <p className="text-gray-400 text-xs mb-3">{project.category}</p>
                  
                  <p className="text-gray-200 text-sm mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  
                  {/* Tech stack */}
                  <div className="mb-4">
                    <h4 className="font-semibold text-sm mb-2" style={{ color: project.color }}>
                      Technologies:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 text-xs rounded-full border"
                          style={{ borderColor: project.color, color: project.color }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Impact */}
                  <div className="mb-4">
                    <h4 className="font-semibold text-sm mb-2" style={{ color: project.color }}>
                      Impact:
                    </h4>
                    <p className="text-gray-300 text-sm">{project.impact}</p>
                  </div>
                  
                  {isActive && (
                    <div>
                      <h4 className="font-semibold text-sm mb-2" style={{ color: project.color }}>
                        Key Features:
                      </h4>
                      <div className="max-h-32 overflow-y-auto">
                        <ul className="text-xs space-y-1">
                          {project.features.slice(0, 4).map((feature, index) => (
                            <li key={index} className="text-gray-300">
                              • {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                  
                  <div className="mt-4 flex justify-between items-center">
                    <div className="text-xs text-gray-400">
                      Screenshot {currentScreenshot + 1} of {project.screenshots}
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        onSelect(project.id)
                      }}
                      className="px-4 py-2 text-xs rounded-lg transition-colors"
                      style={{ 
                        backgroundColor: project.color,
                        color: '#000000'
                      }}
                    >
                      {isActive ? 'Close Details' : 'View Details'}
                    </button>
                  </div>
                </div>
              </motion.div>
            </Html>
          )}
        </group>
      </group>
    </Float>
  )
}

// Carousel Navigation Component
function CarouselNavigation({ currentProject, onNavigate }: { 
  currentProject: number
  onNavigate: (index: number) => void 
}) {
  return (
    <Html position={[0, -6, 0]}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex space-x-4"
      >
        {projects.map((project, index) => (
          <motion.button
            key={project.id}
            onClick={() => onNavigate(index)}
            className={`w-4 h-4 rounded-full border-2 transition-all duration-300 ${
              currentProject === index 
                ? 'scale-125' 
                : 'scale-100 opacity-60 hover:opacity-100'
            }`}
            style={{ 
              borderColor: project.color,
              backgroundColor: currentProject === index ? project.color : 'transparent'
            }}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </motion.div>
    </Html>
  )
}

// Background Grid Component
function BackgroundGrid() {
  const gridRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (gridRef.current) {
      gridRef.current.rotation.y = state.clock.elapsedTime * 0.02
      gridRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.01) * 0.1
    }
  })

  const gridLines = []
  const size = 40
  const divisions = 20

  // Create grid lines
  for (let i = 0; i <= divisions; i++) {
    const position = (i / divisions) * size - size / 2
    
    // Horizontal lines
    gridLines.push(
      <line key={`h-${i}`}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={2}
            array={new Float32Array([-size/2, 0, position, size/2, 0, position])}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#00D4FF" transparent opacity={0.1} />
      </line>
    )
    
    // Vertical lines
    gridLines.push(
      <line key={`v-${i}`}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={2}
            array={new Float32Array([position, 0, -size/2, position, 0, size/2])}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#00D4FF" transparent opacity={0.1} />
      </line>
    )
  }

  return (
    <group ref={gridRef} position={[0, -4, 0]} rotation={[Math.PI / 2, 0, 0]}>
      {gridLines}
    </group>
  )
}

// Main Projects Scene
function ProjectsScene() {
  const [selectedProject, setSelectedProject] = useState<string | null>(null)
  const [hoveredProject, setHoveredProject] = useState<string | null>(null)
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0)

  const handleProjectSelect = (id: string) => {
    setSelectedProject(selectedProject === id ? null : id)
  }

  const handleProjectHover = (id: string) => {
    setHoveredProject(id)
  }

  const handleProjectLeave = () => {
    setHoveredProject(null)
  }

  const handleNavigation = (index: number) => {
    setCurrentProjectIndex(index)
    setSelectedProject(null)
  }

  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#D4AF37" />
      <pointLight position={[-10, -10, -10]} intensity={1} color="#00D4FF" />
      <pointLight position={[0, 0, 15]} intensity={1.2} color="#FAFAFA" />
      <spotLight position={[0, 15, 0]} intensity={0.8} color="#00FF88" angle={0.5} />
      
      <BackgroundGrid />
      <CarouselNavigation 
        currentProject={currentProjectIndex}
        onNavigate={handleNavigation}
      />
      
      {projects.map((project, index) => (
        <ProjectHologram
          key={project.id}
          project={project}
          isActive={selectedProject === project.id}
          onSelect={handleProjectSelect}
          onHover={handleProjectHover}
          onLeave={handleProjectLeave}
        />
      ))}
    </>
  )
}

// Main Projects Showcase Component
export default function ProjectsShowcase() {
  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="absolute top-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <h2 className="text-4xl md:text-6xl font-bold text-center">
          <span className="text-yellow-400">Projects</span>{' '}
          <span className="text-cyan-400">Showcase</span>
        </h2>
        <p className="text-center text-gray-300 mt-4 text-lg">
          Interactive holographic exhibition of my work
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
          <h3 className="text-yellow-400 font-bold mb-3">Interaction Guide</h3>
          <ul className="text-gray-300 text-sm space-y-2">
            <li>• <span className="text-cyan-400">Click</span> holograms for details</li>
            <li>• <span className="text-green-400">Hover</span> for quick preview</li>
            <li>• <span className="text-yellow-400">Screenshots</span> auto-cycle</li>
            <li>• <span className="text-pink-400">Drag</span> to rotate view</li>
          </ul>
        </div>
      </motion.div>

      {/* Project Stats */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.7, duration: 0.8 }}
        className="absolute right-8 top-1/4 z-10"
      >
        <div className="bg-black/60 backdrop-blur-sm p-6 rounded-lg border border-yellow-400/30">
          <h3 className="text-yellow-400 font-bold mb-3">Portfolio Stats</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-300 text-sm">Total Projects:</span>
              <span className="text-cyan-400 font-bold">3</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300 text-sm">Technologies:</span>
              <span className="text-green-400 font-bold">8+</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300 text-sm">Screenshots:</span>
              <span className="text-pink-400 font-bold">24</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300 text-sm">Code Lines:</span>
              <span className="text-orange-400 font-bold">10K+</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 3D Canvas */}
      <Canvas camera={{ position: [0, 0, 15], fov: 75 }}>
        <ProjectsScene />
        <OrbitControls
          enableZoom={true}
          enablePan={true}
          autoRotate={false}
          minDistance={10}
          maxDistance={25}
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
            View All Projects
          </button>
          <button className="bg-cyan-400 text-black px-6 py-3 rounded-lg font-semibold hover:bg-cyan-300 transition-colors">
            GitHub Repository
          </button>
        </div>
      </motion.div>

      {/* Project Categories Legend */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.8 }}
        className="absolute bottom-8 right-8 z-10"
      >
        <div className="bg-black/60 backdrop-blur-sm p-4 rounded-lg border border-yellow-400/30">
          <h4 className="text-yellow-400 font-bold text-sm mb-2">Project Types</h4>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <span className="text-gray-300 text-xs">Full-Stack Web</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-cyan-400"></div>
              <span className="text-gray-300 text-xs">Healthcare System</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-orange-500"></div>
              <span className="text-gray-300 text-xs">UI/UX Design</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}