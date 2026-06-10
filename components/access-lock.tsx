'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { WaxSeal } from '@/components/wax-seal'
import { getBirthdayTarget, getAnniversaryTarget } from '@/lib/unlock'

interface AccessLockProps {
  type: 'birthday' | 'anniversary'
  onUnlock: () => void
}

const CORRECT_PASSWORD = '7024ellA'

export function AccessLock({ type, onUnlock }: AccessLockProps) {
  const [mounted, setMounted] = useState(false)
  const [step, setStep] = useState<'seal' | 'countdown' | 'password'>('seal')
  const [shouldCrack, setShouldCrack] = useState(false)
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  // Password state
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState(false)
  const [shaking, setShaking] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const isBirthday = type === 'birthday'

  // Always targets the NEXT upcoming date — never returns a past date,
  // so the timer always counts forward and never starts at 0.
  const getTargetDate = () => isBirthday ? getBirthdayTarget() : getAnniversaryTarget()

  useEffect(() => {
    setMounted(true)
    if (typeof window !== 'undefined') {
      const storageKey = isBirthday ? 'birthday_seal_broken' : 'anniversary_seal_broken'
      const saved = localStorage.getItem(storageKey)
      if (saved === 'true') {
        // Always restore to countdown — never jump straight to password.
        // The countdown must complete before the password step is accessible.
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
        setTime({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        // Advance from countdown to password when timer actually hits zero
        setStep((prev) => (prev === 'countdown' ? 'password' : prev))
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
  }, [type])

  // Focus input when password step is shown
  useEffect(() => {
    if (step === 'password') {
      setTimeout(() => inputRef.current?.focus(), 400)
    }
  }, [step])

  const handleBreakSeal = () => {
    setShouldCrack(true)
  }

  const handleCrackComplete = () => {
    // Always go to countdown after seal — never skip to password directly
    setStep('countdown')
    if (typeof window !== 'undefined') {
      const storageKey = isBirthday ? 'birthday_seal_broken' : 'anniversary_seal_broken'
      localStorage.setItem(storageKey, 'true')
    }
  }

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === CORRECT_PASSWORD) {
      setPasswordError(false)
      onUnlock()
    } else {
      setPasswordError(true)
      setShaking(true)
      setPassword('')
      setTimeout(() => setShaking(false), 600)
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

  const bgGradient = isBirthday
    ? 'bg-gradient-to-b from-[#FFF0F2] via-[#FFF8F8] to-[#FFEDF0]'
    : 'bg-gradient-to-b from-[#F9E8E8] to-[#F5E6C8]'

  const sparkleColor = isBirthday ? '#C4687A' : '#D4AF37'
  const accentColor = isBirthday ? '#C4687A' : '#D4AF37'
  const buttonBorderClass = isBirthday
    ? 'border-[#C4687A]/30 text-[#C4687A] hover:border-[#C4687A]'
    : 'border-[#D4AF37]/30 text-[#D4AF37] hover:border-[#D4AF37]'

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

          {/* ── Step 1: Wax Seal ── */}
          {step === 'seal' && (
            <motion.div
              key="seal-step"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center text-center space-y-8"
            >
              <div className="flex flex-col items-center gap-6">
                <span className="text-6xl animate-hero-pulse">{copy.emojis1}</span>
                <WaxSeal pulse={!shouldCrack} shouldCrack={shouldCrack} onCrack={handleCrackComplete} size={110} />
              </div>
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
              <button
                onClick={handleBreakSeal}
                disabled={shouldCrack}
                className={`group relative inline-flex items-center justify-center gap-2 rounded-full border-2 bg-white/70 px-8 py-3 font-jost text-sm uppercase tracking-widest transition-all hover:bg-white disabled:opacity-50 ${buttonBorderClass}`}
              >
                <span>{isBirthday ? '✨' : '🌙'}</span>
                <span>{shouldCrack ? 'Breaking Seal...' : 'Break The Seal'}</span>
              </button>
            </motion.div>
          )}

          {/* ── Step 2: Countdown ── */}
          {step === 'countdown' && (
            <motion.div
              key="countdown-step"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center text-center space-y-10"
            >
              <span className="text-6xl animate-bounce" style={{ animationDuration: '3s' }}>{copy.emojis2}</span>
              <div className="space-y-3">
                <h2 className="font-playfair text-[32px] text-[#3D2C2C] tracking-tight">{copy.title2}</h2>
                <p className="font-jost text-base text-[#6E5250] max-w-md mx-auto leading-relaxed">
                  {copy.desc2}
                </p>
              </div>
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
              <div className="flex flex-col items-center gap-3 pt-4">
                <span className="text-3xl">{copy.footerEmoji}</span>
                <p className="font-playfair italic text-[18px] text-[#C4687A]">
                  {copy.footerText}
                </p>
              </div>
            </motion.div>
          )}

          {/* ── Step 3: Password Gate ── */}
          {step === 'password' && (
            <motion.div
              key="password-step"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center text-center space-y-8"
            >
              {/* Icon */}
              <span className="text-6xl animate-hero-pulse">{isBirthday ? '🎁' : '💌'}</span>

              {/* Heading */}
              <div className="space-y-3 max-w-sm">
                <h2 className="font-playfair text-[28px] sm:text-[32px] text-[#3D2C2C] tracking-tight">
                  {isBirthday ? 'The moment has arrived 🎉' : 'The time has come 💞'}
                </h2>
                <p className="font-jost text-sm tracking-wide text-[#8B6E6E] leading-relaxed">
                  {isBirthday
                    ? 'Enter your secret key to unwrap your birthday surprise.'
                    : 'Enter your secret key to open this special chapter.'}
                </p>
              </div>

              {/* Password Form */}
              <motion.form
                onSubmit={handlePasswordSubmit}
                animate={shaking ? { x: [-10, 10, -8, 8, -5, 5, 0] } : { x: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-xs flex flex-col items-center gap-4"
              >
                <div className="relative w-full">
                  <input
                    ref={inputRef}
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value)
                      setPasswordError(false)
                    }}
                    placeholder="Enter your secret key..."
                    className={`w-full rounded-2xl border-2 bg-white/80 px-5 py-3 pr-12 font-jost text-sm text-[#3D2C2C] placeholder-[#C4A4A4] backdrop-blur-sm outline-none transition-all
                      ${passwordError
                        ? 'border-red-400 focus:border-red-500'
                        : `border-[${accentColor}]/30 focus:border-[${accentColor}]`
                      }`}
                    style={{
                      borderColor: passwordError ? undefined : `${accentColor}50`,
                    }}
                  />
                  {/* Show/hide toggle */}
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8B6E6E] hover:text-[#3D2C2C] transition-colors"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                        <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                        <line x1="1" y1="1" x2="23" y2="23" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </div>

                {/* Error message */}
                <AnimatePresence>
                  {passwordError && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="font-jost text-xs text-red-400 tracking-wide"
                    >
                      That's not the right key. Try again 🔐
                    </motion.p>
                  )}
                </AnimatePresence>

                <button
                  type="submit"
                  className={`inline-flex items-center justify-center gap-2 rounded-full border-2 bg-white/70 px-8 py-3 font-jost text-sm uppercase tracking-widest transition-all hover:bg-white ${buttonBorderClass}`}
                >
                  <span>{isBirthday ? '🎀' : '🗝️'}</span>
                  <span>Unlock</span>
                </button>
              </motion.form>

              {/* Footer */}
              <p className="font-playfair italic text-[15px] text-[#B08080]">
                {isBirthday ? '"Only you know the key." 💖' : '"Some doors open only for the right person." 🌹'}
              </p>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  )
}
