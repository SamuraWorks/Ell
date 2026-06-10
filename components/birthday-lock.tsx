'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { WaxSeal } from '@/components/wax-seal'
import { checkPassword, saveBirthdayPassword, isBirthdayPasswordOk, getBirthdayTarget } from '@/lib/unlock'

interface BirthdayLockProps {
  onUnlock: () => void
}

export function BirthdayLock({ onUnlock }: BirthdayLockProps) {
  const [mounted, setMounted] = useState(false)
  // Strict flow: seal → countdown → password
  // 'countdown' is always shown after seal-break — no shortcuts to 'password'
  const [step, setStep] = useState<'seal' | 'countdown' | 'password'>('seal')
  const [shouldCrack, setShouldCrack] = useState(false)
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [countdownDone, setCountdownDone] = useState(false)

  // Password gate state
  const [pwd, setPwd] = useState('')
  const [showPwd, setShowPwd] = useState(false)
  const [shake, setShake] = useState(false)
  const [wrongAttempt, setWrongAttempt] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setMounted(true)

    // If password was already verified this session (same tab), skip straight to content.
    // This avoids re-asking the password on in-session navigation (e.g. back button).
    if (isBirthdayPasswordOk()) {
      onUnlock()
      return
    }

    // If the seal was already broken in a previous visit, restore the countdown step.
    // We NEVER skip directly to 'password' from localStorage — the countdown must run.
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('birthday_seal_broken')
      if (saved === 'true') {
        setStep('countdown')
      }
    }
  }, [onUnlock])

  useEffect(() => {
    // getBirthdayTarget() always returns the next upcoming June 20, rolling to next
    // year if this year's date has already passed — so the timer is never instantly 0.
    const target = getBirthdayTarget()

    const updateTimer = () => {
      const now = new Date()
      const diff = target.getTime() - now.getTime()

      if (diff <= 0) {
        setTime({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        setCountdownDone(true)
        // Advance to password step once the timer actually reaches zero
        setStep((current) => (current === 'countdown' ? 'password' : current))
      } else {
        setCountdownDone(false)
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
  }, [])

  useEffect(() => {
    if (step === 'password') {
      setTimeout(() => inputRef.current?.focus(), 400)
    }
  }, [step])

  const handleBreakSeal = () => setShouldCrack(true)

  const handleCrackComplete = () => {
    // Always go to countdown after seal — never jump to password directly
    setStep('countdown')
    if (typeof window !== 'undefined') {
      localStorage.setItem('birthday_seal_broken', 'true')
    }
  }

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (checkPassword(pwd)) {
      saveBirthdayPassword()
      onUnlock()
    } else {
      setShake(true)
      setWrongAttempt(true)
      setPwd('')
      setTimeout(() => setShake(false), 600)
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

          {/* ── Step 1: Wax Seal ─────────────────────────────── */}
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
                <span className="text-6xl animate-hero-pulse">🎂💌</span>
                <WaxSeal pulse={!shouldCrack} shouldCrack={shouldCrack} onCrack={handleCrackComplete} size={110} />
              </div>

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

              <button
                onClick={handleBreakSeal}
                disabled={shouldCrack}
                className="group relative inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#C4687A]/30 bg-white/70 px-8 py-3 font-jost text-sm uppercase tracking-widest text-[#C4687A] transition-all hover:bg-white hover:border-[#C4687A] disabled:opacity-50"
              >
                <span>✨</span>
                <span>{shouldCrack ? 'Breaking Seal...' : 'Break The Seal'}</span>
              </button>
            </motion.div>
          )}

          {/* ── Step 2: Countdown (must complete before password unlocks) ── */}
          {step === 'countdown' && (
            <motion.div
              key="countdown-step"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center text-center space-y-10"
            >
              <span className="text-6xl animate-bounce" style={{ animationDuration: '3s' }}>⏳</span>

              <div className="space-y-3">
                <h2 className="font-playfair text-[32px] text-[#3D2C2C] tracking-tight">Hang tight, Fay Fay❤️...</h2>
                <p className="font-jost text-base text-[#6E5250] max-w-md mx-auto leading-relaxed">
                  A birthday surprise is waiting quietly behind the curtain.
                  <br />
                  Every second brings you closer.
                </p>
              </div>

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

              <div className="flex flex-col items-center gap-3 pt-4">
                <span className="text-3xl">💖</span>
                <p className="font-playfair italic text-[18px] text-[#C4687A]">
                  "The wait is part of the gift."
                </p>
              </div>

              {/* No shortcut button — password is only accessible after the timer hits zero */}
            </motion.div>
          )}

          {/* ── Step 3: Password Gate (only reachable after countdown finishes) ── */}
          {step === 'password' && (
            <motion.div
              key="password-step"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.7 }}
              className="flex flex-col items-center text-center space-y-8"
            >
              {/* Icon */}
              <motion.div
                animate={{ rotate: [0, -5, 5, -5, 5, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 3 }}
              >
                <span className="text-6xl">🔐</span>
              </motion.div>

              {/* Heading */}
              <div className="space-y-3 max-w-sm">
                <h2 className="font-playfair text-[30px] sm:text-[36px] text-[#3D2C2C]">
                  The time has come.
                </h2>
                <p className="font-jost text-sm text-[#8B6E6E] uppercase tracking-widest">
                  This space is private — enter the password to continue.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handlePasswordSubmit} className="w-full max-w-xs space-y-4">
                <motion.div
                  animate={shake ? { x: [-10, 10, -8, 8, -4, 4, 0] } : {}}
                  transition={{ duration: 0.4 }}
                  className="relative"
                >
                  <input
                    ref={inputRef}
                    id="birthday-password"
                    type={showPwd ? 'text' : 'password'}
                    value={pwd}
                    onChange={(e) => { setPwd(e.target.value); setWrongAttempt(false) }}
                    placeholder="Enter password"
                    autoComplete="current-password"
                    className={`w-full rounded-2xl border-2 bg-white/80 px-5 py-4 pr-12 font-jost text-base text-[#3D2C2C] placeholder-[#C4A0A0] backdrop-blur-sm outline-none transition-all
                      ${wrongAttempt
                        ? 'border-red-400 focus:border-red-500'
                        : 'border-[#C4687A]/30 focus:border-[#C4687A]'
                      }`}
                  />
                  {/* Show / hide toggle */}
                  <button
                    type="button"
                    onClick={() => setShowPwd(v => !v)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#C4687A]/60 hover:text-[#C4687A] transition-colors"
                    tabIndex={-1}
                    aria-label={showPwd ? 'Hide password' : 'Show password'}
                  >
                    {showPwd ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17.94 17.94A10.07 10.07 0 0112 20C7 20 2.73 16.11 1 12a10.07 10.07 0 012.06-3.94"/>
                        <path d="M9.9 4.24A9.12 9.12 0 0112 4c5 0 9.27 3.89 11 8a10.39 10.39 0 01-1.68 2.83"/>
                        <line x1="1" y1="1" x2="23" y2="23"/>
                      </svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                        <circle cx="12" cy="12" r="3"/>
                      </svg>
                    )}
                  </button>
                </motion.div>

                {wrongAttempt && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="font-jost text-xs text-red-400 tracking-wide"
                  >
                    That's not quite right. Try again 💌
                  </motion.p>
                )}

                <button
                  type="submit"
                  className="w-full rounded-full bg-[#C4687A] px-8 py-4 font-jost text-sm uppercase tracking-widest text-white shadow-[0_8px_30px_rgba(196,104,122,0.35)] transition-all hover:bg-[#B05A6C] hover:shadow-[0_12px_40px_rgba(196,104,122,0.45)] active:scale-95"
                >
                  Enter ✨
                </button>
              </form>

              <p className="font-dancing text-[24px] text-[#C4687A] opacity-80">
                Only for you.
              </p>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  )
}
