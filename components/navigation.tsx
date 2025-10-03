"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

export function Navigation() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/80 backdrop-blur-lg border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          3D Scroll
        </div>
        <div className="flex items-center gap-6">
          <a href="#cube" className="text-sm font-medium hover:text-primary transition-colors">
            Cube
          </a>
          <a href="#sphere" className="text-sm font-medium hover:text-primary transition-colors">
            Sphere
          </a>
          <a href="#torus" className="text-sm font-medium hover:text-primary transition-colors">
            Torus
          </a>
          <Button size="sm" className="rounded-full">
            Get Started
          </Button>
        </div>
      </div>
    </nav>
  )
}
