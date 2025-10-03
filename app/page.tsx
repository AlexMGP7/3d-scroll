"use client"

import { Hero } from "@/components/hero"
import { CubeSection } from "@/components/cube-section"
import { SphereSection } from "@/components/sphere-section"
import { TorusSection } from "@/components/torus-section"
import { FinalSection } from "@/components/final-section"
import { Navigation } from "@/components/navigation"

export default function Home() {
  return (
    <main className="relative">
      <Navigation />
      <Hero />
      <CubeSection />
      <SphereSection />
      <TorusSection />
      <FinalSection />
    </main>
  )
}
