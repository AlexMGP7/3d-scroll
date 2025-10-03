"use client"

import { useEffect, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, MeshWobbleMaterial } from "@react-three/drei"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import type * as THREE from "three"

gsap.registerPlugin(ScrollTrigger)

function AnimatedTorus() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.4
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.6
    }
  })

  useEffect(() => {
    if (!meshRef.current) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#torus",
        start: "top center",
        end: "bottom center",
        scrub: 1,
      },
    })

    tl.to(meshRef.current.rotation, {
      z: Math.PI * 4,
      duration: 1,
    }).to(
      meshRef.current.scale,
      {
        x: 1.8,
        y: 1.8,
        z: 1.8,
        duration: 0.5,
        yoyo: true,
        repeat: 1,
      },
      "<",
    )
  }, [])

  return (
    <mesh ref={meshRef}>
      <torusGeometry args={[1.5, 0.6, 32, 100]} />
      <MeshWobbleMaterial color="#10b981" speed={1} factor={0.6} metalness={0.5} roughness={0.2} />
    </mesh>
  )
}

export function TorusSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!textRef.current) return

    gsap.from(textRef.current.children, {
      scrollTrigger: {
        trigger: "#torus",
        start: "top center",
        end: "center center",
        scrub: 1,
      },
      opacity: 0,
      y: 50,
      stagger: 0.2,
    })
  }, [])

  return (
    <section
      id="torus"
      ref={sectionRef}
      className="relative min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-background to-secondary/20"
    >
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <div ref={textRef} className="space-y-6">
          <div className="inline-block px-4 py-2 bg-emerald-500/10 text-emerald-500 rounded-full text-sm font-medium">
            Geometría Compleja
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-balance">Toroide Wobble</h2>
          <p className="text-xl text-muted-foreground text-pretty">
            Un toroide con efecto wobble que rota en múltiples ejes. Combina rotación en Z con escalado para crear
            efectos dinámicos.
          </p>
          <ul className="space-y-3 text-muted-foreground">
            <li className="flex items-center gap-3">
              <div className="w-2 h-2 bg-emerald-500 rounded-full" />
              <span>Rotación múltiple con scroll</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="w-2 h-2 bg-emerald-500 rounded-full" />
              <span>Efecto wobble con MeshWobbleMaterial</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="w-2 h-2 bg-emerald-500 rounded-full" />
              <span>Animación de escala con yoyo</span>
            </li>
          </ul>
        </div>

        <div className="h-[500px] rounded-2xl overflow-hidden bg-card border border-border shadow-2xl">
          <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <pointLight position={[-10, -10, -5]} intensity={0.5} color="#ec4899" />
            <AnimatedTorus />
            <OrbitControls enableZoom={false} />
          </Canvas>
        </div>
      </div>
    </section>
  )
}
