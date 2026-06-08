'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

export function BirthdayHero({
  title,
  subtitle,
  ctaText,
  onCTA,
}: {
  title: string
  subtitle: string
  ctaText: string
  onCTA: () => void
}) {
  const [isClicked, setIsClicked] = useState(false)

  const handleClick = () => {
    setIsClicked(true)
    setTimeout(() => {
      onCTA()
    }, 700)
  }

  return (
    <section className="relative min-h-screen w-full overflow-hidden px-6 py-16">
      <div className="absolute inset-0 bg-background" aria-hidden="true" />

      <div
        className={cn(
          'absolute inset-0 transition-opacity duration-700',
          isClicked ? 'opacity-0' : 'opacity-100',
        )}
        style={{
          backgroundImage:
            'radial-gradient(circle at top, rgba(255, 215, 229, 0.24) 0%, transparent 22%), radial-gradient(circle at bottom right, rgba(255, 198, 219, 0.18) 0%, transparent 20%)',
        }}
        aria-hidden="true"
      />

      <div
        className={cn(
          'absolute inset-0 pointer-events-none transition-opacity duration-700',
          isClicked ? 'opacity-0' : 'opacity-100',
        )}
        style={{
          backgroundImage:
            'radial-gradient(circle at center, rgba(255, 209, 102, 0.12) 0%, transparent 45%)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 flex min-h-screen w-full flex-col items-center justify-center text-center">
        <div className={cn('relative mx-auto max-w-3xl overflow-hidden rounded-[2rem] border border-pink-soft/40 bg-white/90 p-10 shadow-[0_35px_80px_rgba(255,182,193,0.16)] backdrop-blur-xl transition-all duration-700', isClicked ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0')}>
          <p className="mx-auto inline-flex rounded-full border border-pink/20 bg-pink-soft/70 px-4 py-2 text-xs uppercase tracking-[0.32em] text-pink text-opacity-80">
            a private love message
          </p>

          <h1 className="mt-8 text-5xl font-heading font-semibold tracking-tight text-foreground sm:text-6xl md:text-7xl leading-tight">
            {title}
          </h1>

          <p className="mt-6 text-base sm:text-lg md:text-xl leading-relaxed text-foreground/75">
            {subtitle}
          </p>
        </div>

        <button
          onClick={handleClick}
          className={cn(
            'mt-10 inline-flex items-center justify-center rounded-full border-2 border-pink/30 bg-pink text-lg font-semibold text-white transition-all duration-500',
            'hover:bg-pink/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink/50',
            isClicked ? 'opacity-0' : 'opacity-100',
          )}
        >
          {ctaText}
        </button>

        <div className={cn('mt-10 text-sm text-foreground/60 transition-opacity duration-700', isClicked ? 'opacity-0' : 'opacity-100')}>
          <p>Tap anywhere for a sweet surprise.</p>
        </div>

        <div className="pointer-events-none absolute bottom-8 flex items-center gap-3 text-pink/60">
          <span className="text-2xl animate-hero-pulse">💖</span>
          <span className="text-xs uppercase tracking-[0.3em]">soft glow</span>
        </div>
      </div>
    </section>
  )
}
