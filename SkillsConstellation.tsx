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
  Environment
} from '@react-three/drei'
import * as THREE from 'three'
import { motion, AnimatePresence } from 'framer-motion'

// Skill data structure
const skillSystems = {
  frontend: {
    name: 'Frontend Galaxy',
    color: '#00D4FF',
    position: [-8, 2, 0] as [number, number, number],
    skills: [
      { name: 'HTML/CSS', level: 90, color: '#E34F26', position: [0, 0, 0] },
      { name: 'JavaScript', level: 85, color: '#F7DF1E', position: [2, 1, -1] },
      { name: 'React', level: 80, color: '#61DAFB', position: [-1, -1, 1] },
      { name: 'jQuery', level: 75, color: '#0769AD', position: [1, -2, 0] }
    ]
  },
  backend: {
    name: 'Backend Universe',
    color: '#00FF88',
    position: [8, -1, 0] as [number, number, number],
    skills: [
      { name: 'PHP', level: 90, color: '#777BB4', position: [0, 0, 0] },
      { name: 'MySQL', level: 85, color: '#4479A1', position: [-2, 1, 1] },
      { name: 'APIs', level: 80, color: '#FF6B6B', position: [1, -1, -1] },
      { name: 'Git/GitHub', level: 85, color: '#F05032', position: [-1, -2, 0] }
    ]
  },
  design: {
    name: 'Design Nebula',
    color: '#D4AF37',
    position: [0, 6, -3] as [number, number, number],
    skills: [
      { name: 'Figma', level: 88, color: '#F24E1E', position: [0, 0, 0] },
      { name: 'UI/UX', level: 85, color: '#A259FF', position: [1.5, 1, -1] },
      { name: 'Wireframing', level: 82, color: '#00C4CC', position: [-1, -1, 1] },
      { name: 'Prototyping', level: 80, color: '#FFC107', position: [1, -1.5, 0] }
    ]
  },
  tools: {
    name: 'Tools Cluster',
    color: '#FF0066',
    position: [0, -6, 2] as [number, number, number],
    skills: [
      { name: 'Bootstrap', level: 75, color: '#7952B3', position: [0, 0, 0] },
      { name: 'VS Code', level: 90, color: '#007ACC', position: [-1, 1, 1] },
      { name: 'Linux', level: 70, color: '#FCC624', position: [1.5, -1, -1] },
      { name: 'Postman', level: 75, color: '#FF6C37', position: [-1.5, -1, 0] }
    ]
  }
}

// Individual Skill Planet Component
interface SkillPlanetProps {
  skill: {
    name: string
    level: number
    color: string
    position: [number, number, number]
  }
  systemPosition: [number, number, number]
  onHover: (skill: any) => void
  onLeave: () => void
  isSelected: boolean
}

function SkillPlanet({ skill, systemPosition, onHover, onLeave, isSelected }: SkillPlanetProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)
  
  const finalPosition: [number, number, number] = [
    systemPosition[0] + skill.position[0],
    systemPosition[1] + skill.position[1], 
    systemPosition[2] + skill.position[2]
  ]
  
  const radius = 0.3 + (skill.level / 100) * 0.4 // Size based on skill level

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
      
      if (hovered || isSelected) {
        meshRef.current.scale.setScalar(1.2)
      } else {
        meshRef.current.scale.setScalar(1)
      }
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh
        ref={meshRef}
        position={finalPosition}
        onPointerOver={(e) => {
          e.stopPropagation()
          setHovered(true)
          onHover(skill)
        }}
        onPointerOut={() => {
          setHovered(false)
          onLeave()
        }}
      >
        <sphereGeometry args={[radius, 32, 32]} />
        <meshStandardMaterial
          color={skill.color}
          emissive={skill.color}
          emissiveIntensity={hovered || isSelected ? 0.3 : 0.1}
          metalness={0.8}
          roughness={0.2}
        />
        
        {/* Skill level ring */}
        <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[radius + 0.1, 0.02, 8, 32]} />
          <meshStandardMaterial
            color={skill.color}
            emissive={skill.color}
            emissiveIntensity={0.2}
            transparent
            opacity={0.6}
          />
        </mesh>
        
        {/* Skill name label */}
        {(hovered || isSelected) && (
          <Html distanceFactor={10} position={[0, radius + 0.5, 0]}>
            <div className="bg-black/80 backdrop-blur-sm px-3 py-1 rounded-lg border border-yellow-400/30">
              <p className="text-white text-sm font-mono whitespace-nowrap">
                {skill.name}
              </p>
              <div className="w-full bg-yellow-400/20 rounded-full h-2 mt-1">
                <div
                  className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${skill.level}%` }}
                />
              </div>
              <p className="text-yellow-400 text-xs text-center mt-1">{skill.level}%</p>
            </div>
          </Html>
        )}
      </mesh>
    </Float>
  )
}

// System Center Component (Central Star)
interface SystemCenterProps {
  system: {
    name: string
    color: string
    position: [number, number, number]
  }
  onHover: (system: any) => void
  onLeave: () => void
}

function SystemCenter({ system, onHover, onLeave }: SystemCenterProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.2) * 0.1
    }
  })

  return (
    <Float speed={1} rotationIntensity={0.1} floatIntensity={0.3}>
      <mesh
        ref={meshRef}
        position={system.position}
        onPointerOver={(e) => {
          e.stopPropagation()
          setHovered(true)
          onHover(system)
        }}
        onPointerOut={() => {
          setHovered(false)
          onLeave()
        }}
      >
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshStandardMaterial
          color={system.color}
          emissive={system.color}
          emissiveIntensity={hovered ? 0.4 : 0.2}
          metalness={0.9}
          roughness={0.1}
        />
        
        {/* Outer ring */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.2, 0.05, 8, 32]} />
          <meshStandardMaterial
            color={system.color}
            emissive={system.color}
            emissiveIntensity={0.3}
            transparent
            opacity={0.7}
          />
        </mesh>
        
        {/* System name */}
        {hovered && (
          <Html distanceFactor={8} position={[0, 1.5, 0]}>
            <div className="bg-black/90 backdrop-blur-sm px-4 py-2 rounded-lg border-2 border-current text-center" style={{ borderColor: system.color }}>
              <p className="text-white font-bold text-lg whitespace-nowrap">
                {system.name}
              </p>
            </div>
          </Html>
        )}
        
        <Sparkles count={30} scale={2} size={3} speed={0.8} color={system.color} />
      </mesh>
    </Float>
  )
}

// Connection Lines Component
function ConnectionLines() {
  const linesRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (linesRef.current) {
      linesRef.current.rotation.y = state.clock.elapsedTime * 0.05
    }
  })

  const connections = [
    { from: skillSystems.frontend.position, to: skillSystems.backend.position },
    { from: skillSystems.frontend.position, to: skillSystems.design.position },
    { from: skillSystems.backend.position, to: skillSystems.tools.position },
    { from: skillSystems.design.position, to: skillSystems.tools.position },
  ]

  return (
    <group ref={linesRef}>
      {connections.map((connection, index) => (
        <line key={index}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={2}
              array={new Float32Array([
                ...connection.from,
                ...connection.to
              ])}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial 
            color="#D4AF37" 
            transparent 
            opacity={0.3}
            linewidth={2}
          />
        </line>
      ))}
    </group>
  )
}

// Background Stars Component
function BackgroundStars() {
  const pointsRef = useRef<THREE.Points>(null)
  const [positions, setPositions] = useState<Float32Array>()

  useEffect(() => {
    const starCount = 1000
    const positions = new Float32Array(starCount * 3)
    
    for (let i = 0; i < starCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 100
      positions[i * 3 + 1] = (Math.random() - 0.5) * 100  
      positions[i * 3 + 2] = (Math.random() - 0.5) * 100
    }
    
    setPositions(positions)
  }, [])

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.x = state.clock.elapsedTime * 0.02
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.01
    }
  })

  if (!positions) return null

  return (
    <points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <pointsMaterial
        transparent
        color="#FAFAFA"
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.6}
      />
    </points>
  )
}

// Main Skills Scene
function SkillsScene() {
  const [hoveredSkill, setHoveredSkill] = useState<any>(null)
  const [hoveredSystem, setHoveredSystem] = useState<any>(null)
  const [selectedSkill, setSelectedSkill] = useState<any>(null)

  const handleSkillHover = (skill: any) => {
    setHoveredSkill(skill)
  }

  const handleSkillLeave = () => {
    setHoveredSkill(null)
  }

  const handleSystemHover = (system: any) => {
    setHoveredSystem(system)
  }

  const handleSystemLeave = () => {
    setHoveredSystem(null)
  }

  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#D4AF37" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00D4FF" />
      <pointLight position={[0, 0, 15]} intensity={0.8} color="#FAFAFA" />
      
      <BackgroundStars />
      <ConnectionLines />
      
      {/* Render all skill systems */}
      {Object.entries(skillSystems).map(([key, system]) => (
        <group key={key}>
          <SystemCenter
            system={system}
            onHover={handleSystemHover}
            onLeave={handleSystemLeave}
          />
          
          {system.skills.map((skill, index) => (
            <SkillPlanet
              key={`${key}-${index}`}
              skill={skill}
              systemPosition={system.position}
              onHover={handleSkillHover}
              onLeave={handleSkillLeave}
              isSelected={selectedSkill?.name === skill.name}
            />
          ))}
        </group>
      ))}
    </>
  )
}

// Skills Constellation Component
export default function SkillsConstellation() {
  const [currentView, setCurrentView] = useState('overview')
  const [selectedSystem, setSelectedSystem] = useState<string | null>(null)

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="absolute top-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <h2 className="text-4xl md:text-6xl font-bold text-center">
          <span className="text-yellow-400">Skills</span>{' '}
          <span className="text-cyan-400">Constellation</span>
        </h2>
        <p className="text-center text-gray-300 mt-4 text-lg">
          Explore my technical universe - hover over planets to discover skills
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
            <li>• <span className="text-cyan-400">Drag</span> to rotate view</li>
            <li>• <span className="text-green-400">Hover</span> planets for details</li>
            <li>• <span className="text-yellow-400">Stars</span> are skill categories</li>
            <li>• Planet <span className="text-pink-400">size</span> shows proficiency</li>
          </ul>
        </div>
      </motion.div>

      {/* Legend */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.7, duration: 0.8 }}
        className="absolute right-8 bottom-8 z-10"
      >
        <div className="bg-black/60 backdrop-blur-sm p-6 rounded-lg border border-yellow-400/30">
          <h3 className="text-yellow-400 font-bold mb-3">Skill Systems</h3>
          <div className="space-y-2">
            {Object.entries(skillSystems).map(([key, system]) => (
              <div key={key} className="flex items-center space-x-3">
                <div 
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: system.color }}
                />
                <span className="text-gray-300 text-sm">{system.name}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* 3D Canvas */}
      <Canvas camera={{ position: [0, 0, 20], fov: 75 }}>
        <SkillsScene />
        <OrbitControls
          enableZoom={true}
          enablePan={true}
          autoRotate={true}
          autoRotateSpeed={0.3}
          minDistance={10}
          maxDistance={50}
        />
      </Canvas>

      {/* View Controls */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <div className="flex space-x-4">
          <button className="bg-yellow-400 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition-colors">
            Reset View
          </button>
          <button className="bg-cyan-400 text-black px-6 py-3 rounded-lg font-semibold hover:bg-cyan-300 transition-colors">
            Focus Mode
          </button>
        </div>
      </motion.div>
    </div>
  )
}