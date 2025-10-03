"use client"

import { useEffect, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, MeshDistortMaterial } from "@react-three/drei"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import type * as THREE from "three"

gsap.registerPlugin(ScrollTrigger)

function AnimatedSphere() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3
    }
  })

  useEffect(() => {
    if (!meshRef.current) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#sphere",
        start: "top center",
        end: "bottom center",
        scrub: 1,
      },
    })

    tl.to(meshRef.current.position, {
      x: 2,
      duration: 0.5,
    })
      .to(meshRef.current.position, {
        x: -2,
        duration: 0.5,
      })
      .to(meshRef.current.position, {
        x: 0,
        duration: 0.5,
      })
  }, [])

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1.5, 64, 64]} />
      <MeshDistortMaterial color="#ec4899" speed={2} distort={0.3} radius={1} metalness={0.8} />
    </mesh>
  )
}

export function SphereSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!textRef.current) return

    gsap.from(textRef.current.children, {
      scrollTrigger: {
        trigger: "#sphere",
        start: "top center",
        end: "center center",
        scrub: 1,
      },
      opacity: 0,
      x: 100,
      stagger: 0.2,
    })
  }, [])

  return (
    <section
      id="sphere"
      ref={sectionRef}
      className="relative min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-secondary/20 to-background"
    >
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <div className="h-[500px] rounded-2xl overflow-hidden bg-card border border-border shadow-2xl order-2 md:order-1">
          <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <pointLight position={[-10, -10, -5]} intensity={0.5} color="#6366f1" />
            <AnimatedSphere />
            <OrbitControls enableZoom={false} />
          </Canvas>
        </div>

        <div ref={textRef} className="space-y-6 order-1 md:order-2">
          <div className="inline-block px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium">
            Geometría Avanzada
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-balance">Esfera Distorsionada</h2>
          <p className="text-xl text-muted-foreground text-pretty">
            Una esfera con material distorsionado que se mueve horizontalmente con el scroll. Usa MeshDistortMaterial de
            Drei para efectos únicos.
          </p>
          <ul className="space-y-3 text-muted-foreground">
            <li className="flex items-center gap-3">
              <div className="w-2 h-2 bg-accent rounded-full" />
              <span>Movimiento horizontal con scroll</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="w-2 h-2 bg-accent rounded-full" />
              <span>Material distorsionado animado</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="w-2 h-2 bg-accent rounded-full" />
              <span>Alta resolución con 64 segmentos</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}
