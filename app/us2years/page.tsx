'use client'

import { useEffect, useState } from 'react'
import { isAnniversaryUnlocked } from '@/lib/unlock'
import { LockedScreen } from '@/components/locked-screen'
import { FadeIn } from '@/components/fade-in'
import { Section } from '@/components/section'
import { PhotoGallery } from '@/components/photo-gallery'
import { LoveBubbleBackground } from '@/components/love-bubble-background'
import { AnniversaryLock } from '@/components/anniversary-lock'
import us from '@/data/us.json'
import gallery from '@/data/gallery.json'

export default function Us2YearsPage() {
  const [mounted, setMounted] = useState(false)
  const [isLocked, setIsLocked] = useState(true)

  useEffect(() => {
    setMounted(true)
    const checkLockStatus = () => {
      const now = new Date()
      const year = now.getFullYear()
      const unlockDate = new Date(year, 5, 24, 0, 0, 0) // June 24, 12:00 AM (Month 5 is June)
      if (now.getTime() >= unlockDate.getTime()) {
        setIsLocked(false)
      } else {
        setIsLocked(true)
      }
    }
    checkLockStatus()
    const interval = setInterval(checkLockStatus, 1000)
    return () => clearInterval(interval)
  }, [])

  if (!mounted) return null

  if (isLocked) {
    return <AnniversaryLock onUnlock={() => setIsLocked(false)} />
  }

  return (
    <main className="relative overflow-hidden bg-background">
      <LoveBubbleBackground />
      {/* Intro */}
      <Section center className="min-h-screen">
        <FadeIn>
          <p className="mb-4 text-xs uppercase tracking-[0.35em] text-gold">
            June 24
          </p>
          <h1 className="text-balance font-heading text-5xl font-semibold tracking-tight text-foreground sm:text-7xl">
            Two years of us.
          </h1>
          <p className="mt-6 text-base leading-relaxed text-foreground/70">
            Click anywhere to reveal a sweet surprise.
          </p>
        </FadeIn>
      </Section>

      {/* 1. OUR JOURNEY */}
      <Section eyebrow="Year by year" title="Our journey">
        <div className="grid gap-6 sm:grid-cols-2">
          {us.journey.map((stage, i) => (
            <FadeIn key={stage.year} delay={i * 80}>
              <div className="h-full rounded-2xl border border-gold-soft/30 bg-card p-6 shadow-sm">
                <p className="mb-3 font-heading text-2xl font-medium text-gold">
                  {stage.year}
                </p>
                <ul className="space-y-2">
                  {stage.milestones.map((m) => (
                    <li
                      key={m}
                      className="flex items-start gap-2 text-sm leading-relaxed text-foreground"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" aria-hidden="true" />
                      {m}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* 2. BEST MOMENTS */}
      <Section eyebrow="Together" title="Best moments">
        <PhotoGallery photos={gallery.anniversary} />
      </Section>

      {/* 3. WHAT WE LEARNED */}
      <Section eyebrow="Along the way" title="What we learned">
        <ul className="space-y-4">
          {us.learned.map((item, i) => (
            <FadeIn as="li" key={i} delay={i * 60}>
              <div className="flex items-start gap-3 rounded-2xl border border-gold-soft/30 bg-card p-5 shadow-sm">
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-gold" aria-hidden="true" />
                <p className="text-base leading-relaxed text-foreground">{item}</p>
              </div>
            </FadeIn>
          ))}
        </ul>
      </Section>

      {/* 4. ANNIVERSARY LETTER */}
      <Section eyebrow="A note" title="For our anniversary" center className="min-h-screen">
        <FadeIn>
          <p className="text-pretty font-heading text-xl leading-relaxed text-foreground sm:text-2xl">
            {us.letter}
          </p>
          <div className="mx-auto mt-8 h-px w-16 bg-gold-soft" aria-hidden="true" />
        </FadeIn>
      </Section>
    </main>
  )
}
