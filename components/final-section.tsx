"use client"

import { useEffect, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Float } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import type * as THREE from "three"

gsap.registerPlugin(ScrollTrigger)

function MultiShapes() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.2
    }
  })

  return (
    <group ref={groupRef}>
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
    </group>
  )
}

export function FinalSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!contentRef.current) return

    gsap.from(contentRef.current.children, {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top center",
        end: "center center",
        scrub: 1,
      },
      opacity: 0,
      scale: 0.8,
      stagger: 0.2,
    })
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-secondary/20 to-background"
    >
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <pointLight position={[-10, -10, -5]} intensity={0.5} color="#6366f1" />
          <MultiShapes />
          <OrbitControls enableZoom={false} />
        </Canvas>
      </div>

      <div ref={contentRef} className="relative z-10 text-center px-6 max-w-4xl space-y-8">
        <h2 className="text-5xl md:text-7xl font-bold text-balance bg-gradient-to-r from-primary via-accent to-emerald-500 bg-clip-text text-transparent">
          ¡Listo para Practicar!
        </h2>
        <p className="text-xl md:text-2xl text-muted-foreground text-pretty">
          Ahora tienes una base sólida para experimentar con React Three Fiber, Drei y GSAP ScrollTrigger. Modifica los
          componentes, cambia colores, añade nuevas geometrías y crea tus propias animaciones.
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          <div className="px-6 py-3 bg-card border border-border rounded-xl">
            <div className="text-sm text-muted-foreground">React Three Fiber</div>
            <div className="text-2xl font-bold text-primary">✓</div>
          </div>
          <div className="px-6 py-3 bg-card border border-border rounded-xl">
            <div className="text-sm text-muted-foreground">Drei Helpers</div>
            <div className="text-2xl font-bold text-accent">✓</div>
          </div>
          <div className="px-6 py-3 bg-card border border-border rounded-xl">
            <div className="text-sm text-muted-foreground">GSAP ScrollTrigger</div>
            <div className="text-2xl font-bold text-emerald-500">✓</div>
          </div>
        </div>

        <div className="flex gap-4 justify-center pt-4">
          <Button size="lg" className="rounded-full">
            Comenzar a Practicar
          </Button>
          <Button size="lg" variant="outline" className="rounded-full bg-transparent">
            Ver Código
          </Button>
        </div>
      </div>
    </section>
  )
}
