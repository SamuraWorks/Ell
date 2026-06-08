'use client'

import { useEffect, useState } from 'react'
import { FadeIn } from './fade-in'

export function AnniversaryCountdownCard({
  targetDate,
}: {
  targetDate: string
}) {
  const [isAnniversaryReached, setIsAnniversaryReached] = useState(false)
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const target = new Date(targetDate).getTime()

    const tick = () => {
      const now = new Date().getTime()
      const diff = target - now

      if (diff <= 0) {
        setIsAnniversaryReached(true)
        return
      }

      setCountdown({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / 1000 / 60) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      })
    }

    tick()
    const interval = setInterval(tick, 1000)
    return () => clearInterval(interval)
  }, [targetDate])

  return (
    <FadeIn
      as="section"
      className="w-full px-6 py-20"
    >
      <div className="mx-auto max-w-2xl">
        <div className="rounded-2xl border border-gold-soft/20 bg-gradient-to-br from-slate-900/40 via-red-900/10 to-slate-900/40 backdrop-blur-md p-8 sm:p-12 text-center">
          {isAnniversaryReached ? (
            <div className="space-y-4">
              <h2 className="text-4xl sm:text-5xl font-heading font-semibold text-white">
                Today marks our story… still unfolding 💖
              </h2>
              <p className="text-lg text-gold-soft">
                Another year of memories together
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              <h2 className="text-3xl sm:text-4xl font-heading font-semibold text-white">
                Counting every moment that led us here 💫
              </h2>
              <div className="grid grid-cols-4 gap-4">
                {[
                  { label: 'Days', value: countdown.days },
                  { label: 'Hours', value: countdown.hours },
                  { label: 'Minutes', value: countdown.minutes },
                  { label: 'Seconds', value: countdown.seconds },
                ].map((unit) => (
                  <div key={unit.label} className="space-y-2">
                    <div className="rounded-lg border border-gold/15 bg-gold/5 py-4">
                      <p className="text-2xl sm:text-3xl font-heading font-semibold tabular-nums text-gold">
                        {unit.value.toString().padStart(2, '0')}
                      </p>
                    </div>
                    <p className="text-xs sm:text-sm text-gold-soft/70 uppercase tracking-wider">
                      {unit.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </FadeIn>
  )
}
