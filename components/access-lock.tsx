'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { WaxSeal } from '@/components/wax-seal'

interface AccessLockProps {
  type: 'birthday' | 'anniversary'
  onUnlock: () => void
}

export function AccessLock({ type, onUnlock }: AccessLockProps) {
  const [mounted, setMounted] = useState(false)
  const [step, setStep] = useState<'seal' | 'countdown'>('seal')
  const [shouldCrack, setShouldCrack] = useState(false)
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  const isBirthday = type === 'birthday'

  // Target Dates (local time)
  const getTargetDate = () => {
    const year = new Date().getFullYear()
    if (isBirthday) {
      return new Date(year, 5, 20, 0, 0, 0) // June 20, 12:00 AM (Month 5 is June)
    } else {
      return new Date(year, 5, 24, 0, 0, 0) // June 24, 12:00 AM
    }
  }

  useEffect(() => {
    setMounted(true)
    if (typeof window !== 'undefined') {
      const storageKey = isBirthday ? 'birthday_seal_broken' : 'anniversary_seal_broken'
      const saved = localStorage.getItem(storageKey)
      if (saved === 'true') {
        setStep('countdown')
      }
    }
  }, [isBirthday])

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
  }, [type, onUnlock])

  const handleBreakSeal = () => {
    setShouldCrack(true)
  }

  const handleCrackComplete = () => {
    setStep('countdown')
    if (typeof window !== 'undefined') {
      const storageKey = isBirthday ? 'birthday_seal_broken' : 'anniversary_seal_broken'
      localStorage.setItem(storageKey, 'true')
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

  // Copy definitions for Birthday vs Anniversary
  const copy = {
    emojis1: isBirthday ? '🎂💌' : '💍🌹',
    quote1: isBirthday 
      ? '"Some surprises are too special to be opened early."' 
      : '"Some chapters deserve the right moment before they are reopened."',
    desc1: isBirthday
      ? 'Something meaningful has been prepared with care, patience, and love.'
      : 'Our story is waiting.',
    sub1: isBirthday ? 'But not yet...' : 'Just not today.',
    btn: isBirthday ? '✨ Break The Seal' : '🌙 Break The Seal',
    emojis2: '⏳',
    title2: isBirthday ? 'Hang tight, Fay Fay❤️...' : 'Hang tight...',
    desc2: isBirthday
      ? 'A birthday surprise is waiting quietly behind the curtain. Every second brings you closer.'
      : 'A special chapter is waiting to be revisited. The story is almost ready.',
    footerEmoji: isBirthday ? '💖' : '💞',
    footerText: isBirthday ? '"The wait is part of the gift."' : '"Beautiful things are worth waiting for."',
  }

  // Themes
  const bgGradient = isBirthday
    ? 'bg-gradient-to-b from-[#FFF0F2] via-[#FFF8F8] to-[#FFEDF0]'
    : 'bg-gradient-to-b from-[#F9E8E8] to-[#F5E6C8]'

  const sparkleColor = isBirthday ? '#C4687A' : '#D4AF37'
  const buttonBorderClass = isBirthday ? 'border-[#C4687A]/30 text-[#C4687A] hover:border-[#C4687A]' : 'border-[#D4AF37]/30 text-[#D4AF37] hover:border-[#D4AF37]'

  return (
    <div className={`relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-24 ${bgGradient}`}>
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
            <svg width="10" height="10" viewBox="0 0 24 24" fill={sparkleColor} className="opacity-30">
              <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
            </svg>
          </div>
        ))}
      </div>
      <div className="grain grain-5 absolute inset-0 pointer-events-none" aria-hidden="true" />

      {/* Main card wrapper */}
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
                <span className="text-6xl animate-hero-pulse">{copy.emojis1}</span>
                <WaxSeal pulse={!shouldCrack} shouldCrack={shouldCrack} onCrack={handleCrackComplete} size={110} />
              </div>

              {/* Message */}
              <div className="space-y-4 max-w-md">
                <p className="font-playfair text-[20px] sm:text-[22px] italic text-[#3D2C2C] leading-relaxed">
                  {copy.quote1}
                </p>
                <p className="font-jost text-sm tracking-wide text-[#8B6E6E] uppercase leading-relaxed">
                  {copy.desc1}
                </p>
                <p className="font-dancing text-[32px] text-[#C4687A] pt-2">
                  {copy.sub1}
                </p>
              </div>

              {/* Button */}
              <button
                onClick={handleBreakSeal}
                disabled={shouldCrack}
                className={`group relative inline-flex items-center justify-center gap-2 rounded-full border-2 bg-white/70 px-8 py-3 font-jost text-sm uppercase tracking-widest transition-all hover:bg-white disabled:opacity-50 ${buttonBorderClass}`}
              >
                <span>{isBirthday ? '✨' : '🌙'}</span>
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
              <span className="text-6xl animate-bounce" style={{ animationDuration: '3s' }}>{copy.emojis2}</span>

              {/* Message */}
              <div className="space-y-3">
                <h2 className="font-playfair text-[32px] text-[#3D2C2C] tracking-tight">{copy.title2}</h2>
                <p className="font-jost text-base text-[#6E5250] max-w-md mx-auto leading-relaxed">
                  {copy.desc2}
                </p>
              </div>

              {/* Live Countdown Timer Grid */}
              <div className="flex items-stretch justify-center gap-3 sm:gap-4">
                {countdownUnits.map((u) => (
                  <div
                    key={u.label}
                    className="flex min-w-[70px] flex-col items-center rounded-2xl border border-[#D4AF37]/30 bg-white/80 px-3 py-4 shadow-[0_8px_30px_rgba(196,104,122,0.04)] backdrop-blur-sm sm:min-w-[85px]"
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
                <span className="text-3xl">{copy.footerEmoji}</span>
                <p className="font-playfair italic text-[18px] text-[#C4687A]">
                  {copy.footerText}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
