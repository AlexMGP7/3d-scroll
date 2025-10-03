"use client"

import { useEffect, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import type * as THREE from "three"

gsap.registerPlugin(ScrollTrigger)

function AnimatedCube() {
  const meshRef = useRef<THREE.Mesh>(null)
  const materialRef = useRef<THREE.MeshStandardMaterial>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.3
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.5
    }
  })

  useEffect(() => {
    if (!meshRef.current) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#cube",
        start: "top center",
        end: "bottom center",
        scrub: 1,
      },
    })

    tl.to(meshRef.current.scale, {
      x: 1.5,
      y: 1.5,
      z: 1.5,
      duration: 1,
    })
      .to(
        meshRef.current.rotation,
        {
          x: Math.PI * 2,
          y: Math.PI * 2,
          duration: 1,
        },
        "<",
      )
      .to(meshRef.current.scale, {
        x: 1,
        y: 1,
        z: 1,
        duration: 1,
      })
  }, [])

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial ref={materialRef} color="#6366f1" metalness={0.5} roughness={0.2} />
    </mesh>
  )
}

export function CubeSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!textRef.current) return

    gsap.from(textRef.current.children, {
      scrollTrigger: {
        trigger: "#cube",
        start: "top center",
        end: "center center",
        scrub: 1,
      },
      opacity: 0,
      x: -100,
      stagger: 0.2,
    })
  }, [])

  return (
    <section
      id="cube"
      ref={sectionRef}
      className="relative min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-background to-secondary/20"
    >
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <div ref={textRef} className="space-y-6">
          <div className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
            Geometría Básica
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-balance">Cubo Rotante</h2>
          <p className="text-xl text-muted-foreground text-pretty">
            Este cubo demuestra animaciones básicas con GSAP ScrollTrigger. Observa cómo escala y rota mientras haces
            scroll.
          </p>
          <ul className="space-y-3 text-muted-foreground">
            <li className="flex items-center gap-3">
              <div className="w-2 h-2 bg-primary rounded-full" />
              <span>Animación de escala suave</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="w-2 h-2 bg-primary rounded-full" />
              <span>Rotación continua con useFrame</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="w-2 h-2 bg-primary rounded-full" />
              <span>Material metálico con iluminación</span>
            </li>
          </ul>
        </div>

        <div className="h-[500px] rounded-2xl overflow-hidden bg-card border border-border shadow-2xl">
          <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <pointLight position={[-10, -10, -5]} intensity={0.5} color="#ec4899" />
            <AnimatedCube />
            <OrbitControls enableZoom={false} />
          </Canvas>
        </div>
      </div>
    </section>
  )
}
