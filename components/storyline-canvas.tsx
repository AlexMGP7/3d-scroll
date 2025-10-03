"use client"

import { useEffect, useRef, useState } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import {
  OrbitControls,
  MeshDistortMaterial,
  MeshWobbleMaterial,
  Text3D,
  Center,
  Float,
  Environment,
} from "@react-three/drei"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import type * as THREE from "three"

function Scene() {
  const cubeRef = useRef<THREE.Mesh>(null)
  const sphereRef = useRef<THREE.Mesh>(null)
  const torusRef = useRef<THREE.Mesh>(null)
  const groupRef = useRef<THREE.Group>(null)
  const textRef = useRef<THREE.Group>(null)

  const { camera } = useThree()
  const lightRef = useRef<THREE.PointLight>(null)

  useFrame((state) => {
    // Rotaciones continuas suaves
    if (cubeRef.current) {
      cubeRef.current.rotation.x = state.clock.getElapsedTime() * 0.3
      cubeRef.current.rotation.y = state.clock.getElapsedTime() * 0.5
    }
    if (sphereRef.current) {
      sphereRef.current.rotation.x = state.clock.getElapsedTime() * 0.2
      sphereRef.current.rotation.y = state.clock.getElapsedTime() * 0.3
    }
    if (torusRef.current) {
      torusRef.current.rotation.x = state.clock.getElapsedTime() * 0.4
      torusRef.current.rotation.y = state.clock.getElapsedTime() * 0.6
    }
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.2
    }
  })

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#storyline-container",
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        snap: {
          snapTo: [0, 0.16, 0.33, 0.5, 0.66, 0.83, 1],
          duration: 0.5,
          ease: "power2.inOut",
        },
      },
    })

    // CAPÍTULO 1: Introducción - Texto 3D flotante (0-20%)
    if (textRef.current) {
      tl.fromTo(textRef.current.position, { z: 0, y: 0 }, { z: 10, y: 2, duration: 1, ease: "power2.inOut" }).to(
        textRef.current.scale,
        { x: 0, y: 0, z: 0, duration: 0.5 },
        "<0.5",
      )
    }

    // CAPÍTULO 2: El Cubo (20-40%)
    if (cubeRef.current) {
      tl.fromTo(cubeRef.current.position, { x: -10, y: 0, z: 0 }, { x: 0, y: 0, z: 0, duration: 1, ease: "power2.out" })
        .to(cubeRef.current.scale, { x: 2, y: 2, z: 2, duration: 0.5 }, "<")
        .to(cubeRef.current.rotation, {
          x: Math.PI * 2,
          y: Math.PI * 2,
          z: Math.PI * 2,
          duration: 1,
        })
        .to(cubeRef.current.scale, { x: 1, y: 1, z: 1, duration: 0.5 })
        .to(cubeRef.current.position, {
          x: 10,
          y: 5,
          z: -5,
          duration: 1,
          ease: "power2.in",
        })
    }

    // CAPÍTULO 3: La Esfera (40-60%)
    if (sphereRef.current) {
      tl.fromTo(
        sphereRef.current.position,
        { x: 0, y: -10, z: 0 },
        { x: 0, y: 0, z: 0, duration: 1, ease: "power2.out" },
        "<0.5",
      )
        .to(sphereRef.current.position, {
          x: 3,
          duration: 0.5,
        })
        .to(sphereRef.current.position, {
          x: -3,
          duration: 0.5,
        })
        .to(sphereRef.current.position, {
          x: 0,
          duration: 0.5,
        })
        .to(sphereRef.current.scale, {
          x: 1.5,
          y: 1.5,
          z: 1.5,
          duration: 0.5,
        })
        .to(sphereRef.current.position, {
          x: -10,
          y: -5,
          z: 5,
          duration: 1,
          ease: "power2.in",
        })
    }

    // CAPÍTULO 4: El Toroide (60-80%)
    if (torusRef.current) {
      tl.fromTo(
        torusRef.current.position,
        { x: 0, y: 0, z: -10 },
        { x: 0, y: 0, z: 0, duration: 1, ease: "power2.out" },
        "<0.5",
      )
        .to(torusRef.current.rotation, {
          z: Math.PI * 4,
          duration: 1,
        })
        .to(
          torusRef.current.scale,
          {
            x: 2,
            y: 2,
            z: 2,
            duration: 0.5,
            yoyo: true,
            repeat: 1,
          },
          "<",
        )
        .to(torusRef.current.position, {
          x: 0,
          y: 10,
          z: 5,
          duration: 1,
          ease: "power2.in",
        })
    }

    tl.to({}, { duration: 1 })

    // CAPÍTULO 6: Final - Múltiples formas (90-100%)
    if (groupRef.current) {
      tl.fromTo(
        groupRef.current.scale,
        { x: 0, y: 0, z: 0 },
        { x: 1, y: 1, z: 1, duration: 1, ease: "back.out(1.7)" },
        "<0.5",
      )
    }

    // Animación de cámara sincronizada con los capítulos
    tl.to(
      camera.position,
      {
        z: 8,
        duration: 0.5,
        ease: "power2.inOut",
      },
      0,
    )
      .to(
        camera.position,
        {
          z: 6,
          duration: 1,
          ease: "power2.inOut",
        },
        1,
      )
      .to(
        camera.position,
        {
          z: 7,
          duration: 1,
          ease: "power2.inOut",
        },
        2.5,
      )
      .to(
        camera.position,
        {
          z: 6,
          duration: 1,
          ease: "power2.inOut",
        },
        4,
      )
      .to(
        camera.position,
        {
          z: 12,
          duration: 1,
          ease: "power2.inOut",
        },
        5,
      )
      .to(
        camera.position,
        {
          z: 10,
          duration: 1,
          ease: "power2.inOut",
        },
        6,
      )

    // Animación de luz sincronizada
    if (lightRef.current) {
      tl.to(
        lightRef.current,
        {
          intensity: 2,
          duration: 1,
        },
        1,
      )
        .to(
          lightRef.current,
          {
            intensity: 1.5,
            duration: 1,
          },
          2.5,
        )
        .to(
          lightRef.current,
          {
            intensity: 2.5,
            duration: 1,
          },
          4,
        )
        .to(
          lightRef.current,
          {
            intensity: 1,
            duration: 1,
          },
          6,
        )
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [camera])

  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight ref={lightRef} position={[-10, -10, -5]} intensity={1} color="#ec4899" />
      <Environment preset="city" />

      {/* Texto 3D inicial */}
      <group ref={textRef} position={[0, 0, 0]}>
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
          <Center>
            <Text3D
              font="/fonts/Inter_Bold.json"
              size={0.8}
              height={0.2}
              curveSegments={12}
              bevelEnabled
              bevelThickness={0.02}
              bevelSize={0.02}
              bevelOffset={0}
              bevelSegments={5}
            >
              3D Story
              <meshNormalMaterial />
            </Text3D>
          </Center>
        </Float>
      </group>

      {/* Cubo */}
      <mesh ref={cubeRef} position={[-10, 0, 0]}>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color="#6366f1" metalness={0.5} roughness={0.2} />
      </mesh>

      {/* Esfera */}
      <mesh ref={sphereRef} position={[0, -10, 0]}>
        <sphereGeometry args={[1.5, 64, 64]} />
        <MeshDistortMaterial color="#ec4899" speed={2} distort={0.3} radius={1} metalness={0.8} />
      </mesh>

      {/* Toroide */}
      <mesh ref={torusRef} position={[0, 0, -10]}>
        <torusGeometry args={[1.5, 0.6, 32, 100]} />
        <MeshWobbleMaterial color="#10b981" speed={1} factor={0.6} metalness={0.5} roughness={0.2} />
      </mesh>

      {/* Grupo final de múltiples formas */}
      <group ref={groupRef} scale={0}>
        <Float speed={2} rotationIntensity={1} floatIntensity={1}>
          <mesh position={[-2, 0, 0]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="#6366f1" metalness={0.5} roughness={0.2} />
          </mesh>
        </Float>

        <Float speed={3} rotationIntensity={1} floatIntensity={1}>
          <mesh position={[2, 0, 0]}>
            <sphereGeometry args={[0.7, 32, 32]} />
            <meshStandardMaterial color="#ec4899" metalness={0.8} roughness={0.2} />
          </mesh>
        </Float>

        <Float speed={2.5} rotationIntensity={1} floatIntensity={1}>
          <mesh position={[0, 1.5, 0]}>
            <torusGeometry args={[0.6, 0.25, 16, 50]} />
            <meshStandardMaterial color="#10b981" metalness={0.5} roughness={0.2} />
          </mesh>
        </Float>

        <Float speed={2.8} rotationIntensity={1} floatIntensity={1}>
          <mesh position={[0, -1.5, 0]}>
            <octahedronGeometry args={[0.6]} />
            <meshStandardMaterial color="#f59e0b" metalness={0.5} roughness={0.2} />
          </mesh>
        </Float>
      </group>

      <OrbitControls enableZoom={false} enablePan={false} />
    </>
  )
}

function StoryOverlay() {
  const [chapter, setChapter] = useState(0)
  const overlayRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])
  const circularCardsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const chapters = [
      { title: "Introducción", subtitle: "Bienvenido al viaje 3D" },
      { title: "Capítulo 1: El Cubo", subtitle: "Geometría fundamental" },
      { title: "Capítulo 2: La Esfera", subtitle: "Formas orgánicas" },
      { title: "Capítulo 3: El Toroide", subtitle: "Complejidad matemática" },
      { title: "Capítulo 4: Cards Apiladas", subtitle: "Elementos HTML animados" },
      { title: "Capítulo 5: Cards Circulares", subtitle: "Movimiento orbital" },
      { title: "Final: Armonía", subtitle: "Todas las formas unidas" },
    ]

    ScrollTrigger.create({
      trigger: "#storyline-container",
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        const progress = self.progress
        const newChapter = Math.floor(progress * 7)
        if (newChapter !== chapter && newChapter < 7) {
          setChapter(newChapter)
        }
      },
    })

    cardsRef.current.forEach((card, index) => {
      if (card) {
        gsap.fromTo(
          card,
          {
            y: index * 40,
            scale: 1 - index * 0.05,
            opacity: 0,
            rotateX: -15,
          },
          {
            y: 0,
            scale: 1,
            opacity: 1,
            rotateX: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: "#storyline-container",
              start: "60% top",
              end: "70% top",
              scrub: 1,
            },
          },
        )
      }
    })

    const circularContainer = document.getElementById("circular-cards-container")
    if (circularContainer) {
      gsap.fromTo(
        circularContainer,
        { rotation: 0 },
        {
          rotation: 360,
          scrollTrigger: {
            trigger: "#storyline-container",
            start: "70% top",
            end: "85% top",
            scrub: 1,
          },
        },
      )

      // Animar la aparición de cada card circular
      circularCardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.fromTo(
            card,
            {
              scale: 0,
              opacity: 0,
            },
            {
              scale: 1,
              opacity: 1,
              duration: 0.5,
              ease: "back.out(1.7)",
              scrollTrigger: {
                trigger: "#storyline-container",
                start: "70% top",
                end: "72% top",
                scrub: 1,
              },
              delay: index * 0.1,
            },
          )
        }
      })
    }
  }, [chapter])

  const chapters = [
    { title: "Introducción", subtitle: "Bienvenido al viaje 3D", color: "from-purple-500 to-pink-500" },
    { title: "Capítulo 1: El Cubo", subtitle: "Geometría fundamental", color: "from-indigo-500 to-blue-500" },
    { title: "Capítulo 2: La Esfera", subtitle: "Formas orgánicas", color: "from-pink-500 to-rose-500" },
    { title: "Capítulo 3: El Toroide", subtitle: "Complejidad matemática", color: "from-emerald-500 to-teal-500" },
    {
      title: "Capítulo 4: Cards Apiladas",
      subtitle: "Elementos HTML animados",
      color: "from-cyan-500 to-blue-500",
    },
    { title: "Capítulo 5: Cards Circulares", subtitle: "Movimiento orbital", color: "from-violet-500 to-purple-500" },
    { title: "Final: Armonía", subtitle: "Todas las formas unidas", color: "from-amber-500 to-orange-500" },
  ]

  const cardsData = [
    {
      title: "React Three Fiber",
      description: "Construye escenas 3D usando componentes de React de forma declarativa y eficiente",
      gradient: "from-indigo-500 to-purple-600",
      number: "01",
    },
    {
      title: "GSAP ScrollTrigger",
      description: "Controla animaciones precisas y fluidas basadas en la posición del scroll del usuario",
      gradient: "from-pink-500 to-rose-600",
      number: "02",
    },
    {
      title: "Drei Helpers",
      description: "Utiliza componentes pre-construidos para cámaras, luces, controles y efectos visuales",
      gradient: "from-cyan-500 to-blue-600",
      number: "03",
    },
    {
      title: "Animaciones 3D",
      description: "Combina elementos 3D con HTML para crear experiencias inmersivas y memorables",
      gradient: "from-emerald-500 to-teal-600",
      number: "04",
    },
  ]

  const circularCardsData = [
    { icon: "🎨", title: "Diseño", color: "from-pink-500 to-rose-500" },
    { icon: "⚡", title: "Velocidad", color: "from-yellow-500 to-orange-500" },
    { icon: "🚀", title: "Innovación", color: "from-blue-500 to-cyan-500" },
    { icon: "💎", title: "Calidad", color: "from-purple-500 to-pink-500" },
    { icon: "🎯", title: "Precisión", color: "from-green-500 to-emerald-500" },
    { icon: "✨", title: "Magia", color: "from-indigo-500 to-purple-500" },
  ]

  return (
    <div ref={overlayRef} className="fixed inset-0 pointer-events-none z-10">
      {chapter === 4 ? (
        // Cards apiladas
        <div className="absolute inset-0 flex items-center justify-center px-4 md:px-8">
          <div className="relative w-full max-w-2xl">
            {cardsData.map((card, index) => (
              <div
                key={index}
                ref={(el) => {
                  cardsRef.current[index] = el
                }}
                className="absolute inset-0 pointer-events-auto"
                style={{
                  transform: `translateY(${index * 40}px) scale(${1 - index * 0.05})`,
                  zIndex: cardsData.length - index,
                }}
              >
                <div
                  className={`bg-gradient-to-br ${card.gradient} rounded-3xl p-8 md:p-12 shadow-2xl border border-white/20 backdrop-blur-sm hover:scale-105 transition-transform duration-300`}
                >
                  <div className="flex items-start justify-between mb-6">
                    <span className="text-8xl font-bold text-white/20">{card.number}</span>
                    <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                      <div className="w-8 h-8 rounded-full bg-white/40" />
                    </div>
                  </div>
                  <h3 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">{card.title}</h3>
                  <p className="text-lg md:text-xl text-white/90 leading-relaxed">{card.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : chapter === 5 ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <div id="circular-cards-container" className="relative w-[600px] h-[600px] pointer-events-auto">
            {/* Centro decorativo */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 shadow-2xl flex items-center justify-center border-4 border-white/20">
              <span className="text-5xl">🌟</span>
            </div>

            {/* Cards en círculo */}
            {circularCardsData.map((card, index) => {
              const angle = (index / circularCardsData.length) * Math.PI * 2
              const radius = 250
              const x = Math.cos(angle) * radius
              const y = Math.sin(angle) * radius

              return (
                <div
                  key={index}
                  ref={(el) => {
                    circularCardsRef.current[index] = el
                  }}
                  className="absolute top-1/2 left-1/2"
                  style={{
                    transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                  }}
                >
                  <div
                    className={`w-32 h-32 rounded-2xl bg-gradient-to-br ${card.color} shadow-xl border-2 border-white/30 backdrop-blur-sm flex flex-col items-center justify-center gap-2 hover:scale-110 transition-transform duration-300`}
                  >
                    <span className="text-4xl">{card.icon}</span>
                    <span className="text-sm font-bold text-white">{card.title}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      ) : (
        // Títulos de capítulos
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
          <h2
            className={`text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r ${chapters[chapter].color} bg-clip-text text-transparent transition-all duration-500`}
          >
            {chapters[chapter].title}
          </h2>
          <p className="text-xl md:text-2xl text-white/80 transition-all duration-500">{chapters[chapter].subtitle}</p>
        </div>
      )}

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2">
        {chapters.map((_, index) => (
          <div
            key={index}
            className={`w-12 h-1 rounded-full transition-all duration-300 ${
              index === chapter ? "bg-white" : "bg-white/30"
            }`}
          />
        ))}
      </div>

      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-white/30 rounded-full" />
        </div>
      </div>
    </div>
  )
}

export function StorylineCanvas() {
  return (
    <>
      <div id="storyline-container" className="h-[700vh]">
        <div className="fixed inset-0 w-full h-screen">
          <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
            <Scene />
          </Canvas>
        </div>

        <StoryOverlay />
      </div>
    </>
  )
}
