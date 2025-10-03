"use client"

import { StorylineCanvas } from "@/components/storyline-canvas"
import { Navigation } from "@/components/navigation"

export default function Home() {
  return (
    <main className="relative">
      <Navigation />
      <StorylineCanvas />
    </main>
  )
}
