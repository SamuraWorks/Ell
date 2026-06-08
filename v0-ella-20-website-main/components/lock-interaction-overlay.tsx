'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { getAnniversaryTarget, getBirthdayTarget, getCountdown, type Countdown } from '@/lib/unlock'

interface LockInteractionOverlayProps {
  variant: 'birthday' | 'anniversary'
  mode: 'locked' | 'question'
  onClose: () => void
  onUnlock?: () => void
}

const letterCopy = {
  birthday: {
    lines: [
      'I know you.',
      'I know exactly what you just did.',
      "You clicked that button because you couldn't wait — and honestly? That is one of the things I love most about you.",
      'But this one time, my love, I need you to wait.',
      'What is behind this seal was built with every single piece of me. Every memory. Every word. Every detail. It deserves the right moment.',
      'And so do you.',
      'Come back on your day. Everything will be ready. I promise.',
    ],
    footer: 'June 20th.',
    countdownLabel: 'Time until June 20th',
  },
  anniversary: {
    lines: [
      'You found it.',
      'Of course you did.',
      'Behind this door is everything that belongs to us. Every moment from the past two years. Every memory we made. Everything we became together.',
      'But this door opens on our day. Not before.',
      'What we have deserves its own moment. Its own day. Its own door.',
      'June 24th, my love. Come back then.',
      'I will be here. I am always here.',
    ],
    footer: 'Yours always, Samuel ♡',
    countdownLabel: 'Time until June 24th',
  },
}

function formatCountdown(value: number) {
  return value.toString().padStart(2, '0')
}

export function LockInteractionOverlay({ variant, mode, onClose, onUnlock }: LockInteractionOverlayProps) {
  const [countdown, setCountdown] = useState<Countdown>({ days: 0, hours: 0, minutes: 0, seconds: 0, done: false })
  const [answer, setAnswer] = useState('')
  const [attempted, setAttempted] = useState(false)
  const [error, setError] = useState('')
  const [shaking, setShaking] = useState(false)

  const target = variant === 'birthday' ? getBirthdayTarget() : getAnniversaryTarget()
  const copy = letterCopy[variant]

  useEffect(() => {
    const tick = () => setCountdown(getCountdown(target))
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [target])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const normalized = answer.trim().toLowerCase()
    if (normalized === 'sammie') {
      onUnlock?.()
      return
    }
    setError('Try again, my love.')
    setShaking(true)
    setAttempted(true)
    setTimeout(() => {
      setShaking(false)
      setAnswer('')
    }, 500)
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="absolute inset-0 bg-black/35 backdrop-blur-sm"
        onClick={onClose}
      />

      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-3xl rounded-[32px] border border-white/20 bg-[#FFFBF7]/95 p-6 shadow-2xl shadow-black/20 backdrop-blur-xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="grid gap-8 lg:grid-cols-[1fr_320px] items-start">
          <div className="space-y-6 text-[#3D2C2C]">
            <div className="space-y-3">
              <p className="text-sm uppercase tracking-[0.28em] text-[#B98375]">A soft note</p>
              <h2 className="text-3xl font-semibold sm:text-4xl">{variant === 'birthday' ? 'Wait just a little longer.' : mode === 'question' ? 'What do you call your man?' : 'Not yet, my love.'}</h2>
            </div>

            {mode === 'locked' ? (
              <div className="space-y-4 text-base leading-8 text-[#3D2C2C]">
                {copy.lines.map((line, index) => (
                  <p key={index}>{line}</p>
                ))}
                <p className="mt-4 font-semibold text-[#A76D7B]">{copy.footer}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <p className="text-lg leading-8 text-[#3D2C2C]">Type your answer below to open the door.</p>
                <label className="block text-sm font-medium uppercase tracking-[0.2em] text-[#8B6E6E]">Answer</label>
                <motion.div
                  animate={shaking ? { x: [0, -8, 8, -6, 6, 0] } : { x: 0 }}
                  transition={{ duration: 0.4 }}
                  className="rounded-3xl border border-[#D4AF37]/40 bg-white px-4 py-3 shadow-sm"
                >
                  <input
                    value={answer}
                    onChange={(event) => {
                      setAnswer(event.target.value)
                      setError('')
                    }}
                    placeholder="Sammie"
                    className="w-full border-none bg-transparent px-0 text-lg font-semibold text-[#3D2C2C] outline-none placeholder:text-[#A89E99]"
                    autoFocus
                  />
                </motion.div>
                {attempted && error ? <p className="text-sm text-[#A76D7B]">{error}</p> : null}
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-full bg-[#C4687A] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#a05662]"
                >
                  Confirm
                </button>
              </form>
            )}

            {mode === 'locked' ? (
              <div className="rounded-3xl border border-[#D4AF37]/40 bg-[#FFF5E9] p-4 text-sm text-[#3D2C2C] shadow-sm">
                <p className="uppercase tracking-[0.24em] text-[#8B6E6E]">{copy.countdownLabel}</p>
                <div className="mt-4 grid grid-cols-4 gap-3 text-center text-sm font-semibold text-[#3D2C2C]">
                  <div className="rounded-3xl bg-white px-3 py-2 shadow-sm">
                    <div>{formatCountdown(countdown.days)}</div>
                    <div className="mt-1 uppercase tracking-[0.2em] text-[#8B6E6E]">Days</div>
                  </div>
                  <div className="rounded-3xl bg-white px-3 py-2 shadow-sm">
                    <div>{formatCountdown(countdown.hours)}</div>
                    <div className="mt-1 uppercase tracking-[0.2em] text-[#8B6E6E]">Hours</div>
                  </div>
                  <div className="rounded-3xl bg-white px-3 py-2 shadow-sm">
                    <div>{formatCountdown(countdown.minutes)}</div>
                    <div className="mt-1 uppercase tracking-[0.2em] text-[#8B6E6E]">Minutes</div>
                  </div>
                  <div className="rounded-3xl bg-white px-3 py-2 shadow-sm">
                    <div>{formatCountdown(countdown.seconds)}</div>
                    <div className="mt-1 uppercase tracking-[0.2em] text-[#8B6E6E]">Seconds</div>
                  </div>
                </div>
              </div>
            ) : null}
          </div>

          <div className="relative flex items-center justify-center">
            <motion.div
              initial={{ y: 180, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="relative w-full max-w-[320px]"
            >
              <div className="absolute inset-x-0 top-0 h-24 rounded-b-[40px] bg-gradient-to-b from-[#F9E8E8] to-transparent opacity-90" />
              <div className="relative mx-auto h-[320px] w-[320px] overflow-hidden rounded-[40px] bg-[#F5E6C8] shadow-[0_42px_80px_rgba(0,0,0,0.16)]">
                <motion.div
                  initial={{ y: 120, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="absolute inset-x-0 top-[36%] mx-auto h-[48%] w-[88%] rounded-3xl bg-[#FFFAF7] p-5 shadow-lg border border-[#E8D5A3]"
                >
                  <div className="space-y-3 text-[#3D2C2C]">
                    {mode === 'locked' ? (
                      <>
                        <p className="text-sm uppercase tracking-[0.28em] text-[#B98375]">A letter</p>
                        <p className="text-base leading-7">{variant === 'birthday' ? 'Please wait until your day.' : 'Hold on, the door opens on June 24th.'}</p>
                      </>
                    ) : (
                      <p className="text-base leading-7">Type Sammie to unlock the door.</p>
                    )}
                  </div>
                </motion.div>
                <motion.div
                  initial={{ rotateX: 0 }}
                  animate={mode === 'locked' ? { rotateX: -140 } : { rotateX: -140 }}
                  transition={{ duration: 0.9, delay: 0.5, ease: 'easeInOut' }}
                  style={{ transformOrigin: 'top' }}
                  className="absolute inset-x-0 top-0 h-24 rounded-b-[40px] bg-[#E8D5A3]"
                />
                <div className="absolute inset-x-0 bottom-0 h-12 bg-[#C4687A]/10" />
              </div>
            </motion.div>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="mt-8 inline-flex items-center justify-center rounded-full border border-[#C4687A]/20 bg-white px-6 py-3 text-sm font-semibold text-[#3D2C2C] transition hover:bg-[#F9E6E8]"
        >
          Close
        </button>
      </motion.div>
    </motion.div>
  )
}
