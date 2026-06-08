'use client'

import { useEffect, useState } from 'react'
import { getBirthdayTarget, getCountdown, type Countdown } from '@/lib/unlock'

const EMPTY: Countdown = {
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
  done: false,
}

function pad(n: number) {
  return n.toString().padStart(2, '0')
}

export function CountdownTimer() {
  const [time, setTime] = useState<Countdown | null>(null)

  useEffect(() => {
    const target = getBirthdayTarget()
    const tick = () => setTime(getCountdown(target))
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  const t = time ?? EMPTY

  const units = [
    { label: 'Days', value: t.days },
    { label: 'Hours', value: t.hours },
    { label: 'Minutes', value: t.minutes },
    { label: 'Seconds', value: t.seconds },
  ]

  return (
    <div
      className="flex items-stretch justify-center gap-3 sm:gap-5"
      aria-label="Countdown to June 20"
      suppressHydrationWarning
    >
      {units.map((u) => (
        <div
          key={u.label}
          className="flex min-w-[64px] flex-col items-center rounded-2xl border border-gold-soft/40 bg-card/70 px-3 py-4 shadow-sm backdrop-blur-sm sm:min-w-[84px] sm:px-5"
        >
          <span
            className="font-heading text-3xl font-semibold tabular-nums text-foreground sm:text-5xl"
            suppressHydrationWarning
          >
            {time ? pad(u.value) : '--'}
          </span>
          <span className="mt-1 text-[10px] uppercase tracking-[0.2em] text-muted-foreground sm:text-xs">
            {u.label}
          </span>
        </div>
      ))}
    </div>
  )
}
