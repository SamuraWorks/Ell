'use client'

import { useEffect, useState } from 'react'

const SURPRISES = [
  'A heart just for you ❤️',
  'Pink surprise! 🌸',
  'You are so loved.',
  'Soft sparkles for your day.',
  'A little love bubble.',
  'You make everything brighter.',
]

type Bubble = {
  id: string
  left: number
  size: number
  duration: number
  delay: number
  opacity: number
  created: number
}

type Surprise = {
  id: string
  left: number
  top: number
  text: string
  created: number
}

function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min
}

function createBubble(): Bubble {
  return {
    id: `${Date.now()}-${Math.random()}`,
    left: randomBetween(0, 100),
    size: randomBetween(24, 76),
    duration: randomBetween(12, 22),
    delay: randomBetween(-10, 0),
    opacity: randomBetween(0.15, 0.35),
    created: Date.now(),
  }
}

export function LoveBubbleBackground() {
  const [bubbles, setBubbles] = useState<Bubble[]>([])
  const [surprises, setSurprises] = useState<Surprise[]>([])

  useEffect(() => {
    const interval = window.setInterval(() => {
      setBubbles((current) => {
        const next = current.length > 18 ? current.slice(-16) : current
        return [...next, createBubble()]
      })
    }, 900)

    return () => window.clearInterval(interval)
  }, [])

  useEffect(() => {
    const cleanup = window.setInterval(() => {
      setBubbles((current) => current.filter((bubble) => Date.now() - bubble.created < 18000))
      setSurprises((current) => current.filter((item) => Date.now() - item.created < 1100))
    }, 300)

    return () => window.clearInterval(cleanup)
  }, [])

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      setSurprises((current) => {
        const next = [
          ...current,
          {
            id: `${Date.now()}-${Math.random()}`,
            left: event.clientX,
            top: event.clientY,
            text: SURPRISES[Math.floor(Math.random() * SURPRISES.length)],
            created: Date.now(),
          },
        ]
        return next.slice(-5)
      })
    }

    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  return (
    <div className="love-background" aria-hidden="true">
      {bubbles.map((bubble) => (
        <span
          key={bubble.id}
          className="love-bubble"
          style={{
            left: `${bubble.left}%`,
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            animationDuration: `${bubble.duration}s`,
            animationDelay: `${bubble.delay}s`,
            opacity: bubble.opacity,
          }}
        />
      ))}

      {surprises.map((surprise) => (
        <span
          key={surprise.id}
          className="love-bubble-pop"
          style={{ left: surprise.left, top: surprise.top }}
        >
          {surprise.text}
        </span>
      ))}
    </div>
  )
}
