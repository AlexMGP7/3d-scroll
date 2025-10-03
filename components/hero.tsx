"use client"

import { useEffect, useRef } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Float, Text3D, Center } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

function Scene3D() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <Center>
          <Text3D
            font="/fonts/Inter_Bold.json"
            size={0.5}
            height={0.2}
            curveSegments={12}
            bevelEnabled
            bevelThickness={0.02}
            bevelSize={0.02}
            bevelOffset={0}
            bevelSegments={5}
          >
            3D Scroll
            <meshNormalMaterial />
          </Text3D>
        </Center>
      </Float>
      <OrbitControls enableZoom={false} enablePan={false} />
    </>
  )
}

export function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const buttonRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out",
      })

      gsap.from(subtitleRef.current, {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.2,
        ease: "power3.out",
      })

      gsap.from(buttonRef.current, {
        opacity: 0,
        y: 20,
        duration: 1,
        delay: 0.4,
        ease: "power3.out",
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
          <Scene3D />
        </Canvas>
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl">
        <h1
          ref={titleRef}
          className="text-6xl md:text-8xl font-bold mb-6 text-balance bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent"
        >
          Animaciones 3D con Scroll
        </h1>
        <p ref={subtitleRef} className="text-xl md:text-2xl text-muted-foreground mb-8 text-pretty">
          Explora el poder de React Three Fiber, Drei y GSAP ScrollTrigger
        </p>
        <div ref={buttonRef} className="flex gap-4 justify-center">
          <Button size="lg" className="rounded-full">
            Comenzar
          </Button>
          <Button size="lg" variant="outline" className="rounded-full bg-transparent">
            Ver Demo
          </Button>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-foreground/30 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-foreground/30 rounded-full" />
        </div>
      </div>
    </section>
  )
}
