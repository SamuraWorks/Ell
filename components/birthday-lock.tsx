'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { WaxSeal } from '@/components/wax-seal'

interface BirthdayLockProps {
  onUnlock: () => void
}

export function BirthdayLock({ onUnlock }: BirthdayLockProps) {
  const [mounted, setMounted] = useState(false)
  const [step, setStep] = useState<'seal' | 'countdown'>('seal')
  const [shouldCrack, setShouldCrack] = useState(false)
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  // Target: June 20, 12:00 AM of the current year
  const getTargetDate = () => {
    const year = new Date().getFullYear()
    return new Date(year, 5, 20, 0, 0, 0) // Month 5 is June (0-indexed)
  }

  useEffect(() => {
    setMounted(true)
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('birthday_seal_broken')
      if (saved === 'true') {
        setStep('countdown')
      }
    }
  }, [])

  useEffect(() => {
    const target = getTargetDate()

    const updateTimer = () => {
      const now = new Date()
      const diff = target.getTime() - now.getTime()

      if (diff <= 0) {
        onUnlock()
      } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24))
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
        const minutes = Math.floor((diff / (1000 * 60)) % 60)
        const seconds = Math.floor((diff / 1000) % 60)
        setTime({ days, hours, minutes, seconds })
      }
    }

    updateTimer()
    const interval = setInterval(updateTimer, 1000)
    return () => clearInterval(interval)
  }, [onUnlock])

  const handleBreakSeal = () => {
    setShouldCrack(true)
  }

  const handleCrackComplete = () => {
    setStep('countdown')
    if (typeof window !== 'undefined') {
      localStorage.setItem('birthday_seal_broken', 'true')
    }
  }

  if (!mounted) return null

  const pad = (n: number) => n.toString().padStart(2, '0')

  const countdownUnits = [
    { label: 'Days', value: time.days },
    { label: 'Hours', value: time.hours },
    { label: 'Minutes', value: time.minutes },
    { label: 'Seconds', value: time.seconds },
  ]

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#FFF0F2] via-[#FFF8F8] to-[#FFEDF0] px-6 py-24">
      {/* Background Sparkles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 25 }).map((_, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              left: `${(i * 7 + 13) % 100}%`,
              top: `${(i * 11 + 7) % 100}%`,
              animation: `sparkle ${5 + (i % 5)}s ease-in-out infinite`,
              animationDelay: `${i * 0.2}s`,
            }}
          >
            <svg width="10" height="10" viewBox="0 0 24 24" fill="#C4687A" className="opacity-30">
              <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
            </svg>
          </div>
        ))}
      </div>
      <div className="grain grain-5 absolute inset-0 pointer-events-none" aria-hidden="true" />

      {/* Main card */}
      <div className="relative z-10 w-full max-w-xl">
        <AnimatePresence mode="wait">
          {step === 'seal' ? (
            <motion.div
              key="seal-step"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center text-center space-y-8"
            >
              {/* Emojis & Wax Seal */}
              <div className="flex flex-col items-center gap-6">
                <span className="text-6xl animate-hero-pulse">🎂💌</span>
                <WaxSeal pulse={!shouldCrack} shouldCrack={shouldCrack} onCrack={handleCrackComplete} size={110} />
              </div>

              {/* Message */}
              <div className="space-y-4 max-w-md">
                <p className="font-playfair text-[20px] sm:text-[22px] italic text-[#3D2C2C] leading-relaxed">
                  "Some surprises are too special to be opened early."
                </p>
                <p className="font-jost text-sm tracking-wide text-[#8B6E6E] uppercase leading-relaxed">
                  Something meaningful has been prepared with care, patience, and love.
                </p>
                <p className="font-dancing text-[32px] text-[#C4687A] pt-2">
                  But not yet...
                </p>
              </div>

              {/* Button */}
              <button
                onClick={handleBreakSeal}
                disabled={shouldCrack}
                className="group relative inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#C4687A]/30 bg-white/70 px-8 py-3 font-jost text-sm uppercase tracking-widest text-[#C4687A] transition-all hover:bg-white hover:border-[#C4687A] disabled:opacity-50"
              >
                <span>✨</span>
                <span>{shouldCrack ? 'Breaking Seal...' : 'Break The Seal'}</span>
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="countdown-step"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center text-center space-y-10"
            >
              {/* Emoji Header */}
              <span className="text-6xl animate-bounce" style={{ animationDuration: '3s' }}>⏳</span>

              {/* Message */}
              <div className="space-y-3">
                <h2 className="font-playfair text-[32px] text-[#3D2C2C] tracking-tight">Hang tight, Fay Fay❤️...</h2>
                <p className="font-jost text-base text-[#6E5250] max-w-md mx-auto leading-relaxed">
                  A birthday surprise is waiting quietly behind the curtain.
                  <br />
                  Every second brings you closer.
                </p>
              </div>

              {/* Live Countdown Timer Grid */}
              <div className="flex items-stretch justify-center gap-3 sm:gap-4">
                {countdownUnits.map((u) => (
                  <div
                    key={u.label}
                    className="flex min-w-[70px] flex-col items-center rounded-2xl border border-[#C4687A]/20 bg-white/80 px-3 py-4 shadow-[0_8px_30px_rgba(196,104,122,0.06)] backdrop-blur-sm sm:min-w-[85px]"
                  >
                    <span className="font-heading text-3xl font-semibold tabular-nums text-[#3D2C2C] sm:text-4xl">
                      {pad(u.value)}
                    </span>
                    <span className="mt-1 text-[9px] uppercase tracking-[0.2em] text-[#8B6E6E]">
                      {u.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Footer Quote */}
              <div className="flex flex-col items-center gap-3 pt-4">
                <span className="text-3xl">💖</span>
                <p className="font-playfair italic text-[18px] text-[#C4687A]">
                  "The wait is part of the gift."
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
