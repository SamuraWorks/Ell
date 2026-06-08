'use client'

import { useEffect, useRef } from 'react'

export function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let width = 0
    let height = 0

    interface Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      opacity: number
      rotation: number
      rotSpeed: number
      hue: number
    }

    const particles: Particle[] = []

    const resize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }

    const createParticle = (): Particle => ({
      x: Math.random() * width,
      y: height + Math.random() * 100,
      size: 3 + Math.random() * 6,
      speedX: (Math.random() - 0.5) * 0.6,
      speedY: -(0.4 + Math.random() * 0.8),
      opacity: 0.15 + Math.random() * 0.35,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.03,
      hue: 340 + Math.random() * 30, // pink-rose range
    })

    // Seed initial particles across screen
    resize()
    for (let i = 0; i < 70; i++) {
      const p = createParticle()
      p.y = Math.random() * height // scattered across screen on load
      particles.push(p)
    }

    const drawPetal = (p: Particle) => {
      ctx.save()
      ctx.translate(p.x, p.y)
      ctx.rotate(p.rotation)
      ctx.globalAlpha = p.opacity
      ctx.beginPath()
      // Elliptical petal shape
      ctx.ellipse(0, 0, p.size * 0.6, p.size, 0, 0, Math.PI * 2)
      const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, p.size)
      gradient.addColorStop(0, `hsla(${p.hue}, 70%, 80%, 1)`)
      gradient.addColorStop(1, `hsla(${p.hue}, 60%, 70%, 0)`)
      ctx.fillStyle = gradient
      ctx.fill()
      ctx.restore()
    }

    let frozen = false
    ;(window as Window & { freezeParticles?: () => void }).freezeParticles = () => {
      frozen = true
    }

    const tick = () => {
      ctx.clearRect(0, 0, width, height)

      if (!frozen) {
        // Add new particles
        if (particles.length < 80 && Math.random() < 0.3) {
          particles.push(createParticle())
        }

        // Update & cull
        for (let i = particles.length - 1; i >= 0; i--) {
          const p = particles[i]
          p.x += p.speedX
          p.y += p.speedY
          p.rotation += p.rotSpeed
          p.opacity -= 0.0005
          if (p.y < -20 || p.opacity <= 0) {
            particles.splice(i, 1)
          }
        }
      }

      for (const p of particles) {
        drawPetal(p)
      }

      animId = requestAnimationFrame(tick)
    }

    window.addEventListener('resize', resize)
    tick()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
      aria-hidden="true"
    />
  )
}
