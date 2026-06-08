'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

export function AnniversaryHero({
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
    }, 400)
  }

  return (
    <section className="relative min-h-screen w-full overflow-hidden px-6 py-16">
      <div className="absolute inset-0 bg-background" aria-hidden="true" />

      <div
        className="absolute inset-0 opacity-80"
        style={{
          backgroundImage:
            'radial-gradient(circle at top left, rgba(255, 215, 229, 0.35) 0%, transparent 24%), radial-gradient(circle at bottom right, rgba(255, 192, 219, 0.2) 0%, transparent 22%)',
        }}
        aria-hidden="true"
      />

      <div
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            'radial-gradient(circle at center, rgba(255, 240, 245, 0.9) 0%, transparent 42%)',
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 flex h-screen w-full flex-col items-center justify-center gap-8 text-center">
        <div className="fade-in-up space-y-6">
          <h1
            className={cn(
              'text-5xl font-semibold tracking-tight text-foreground sm:text-6xl md:text-7xl font-heading',
              'transition-all duration-700',
              isClicked && 'scale-95 opacity-50',
            )}
          >
            {title}
          </h1>
          <p
            className={cn(
              'text-lg sm:text-xl md:text-2xl text-foreground/70 transition-all duration-700',
              isClicked && 'scale-95 opacity-30',
            )}
          >
            {subtitle}
          </p>
        </div>

        <button
          onClick={handleClick}
          className={cn(
            'fade-in-up relative mt-8 px-8 py-4',
            'rounded-full border-2 border-gold/40 bg-gold/5 backdrop-blur-sm',
            'text-lg font-semibold text-gold hover:bg-gold/15 hover:border-gold',
            'transition-all duration-300 ease-out',
            'hover:shadow-[0_0_20px_rgba(219,164,102,0.2)]',
            isClicked && 'scale-90 opacity-0',
          )}
          style={{ transitionDelay: '200ms' }}
        >
          {ctaText}
        </button>

        {/* Scroll indicator - subtle */}
        <div
          className="fade-in-up absolute bottom-8 text-gold-soft/40"
          style={{ transitionDelay: '400ms' }}
        >
          <p className="text-sm">↓ Scroll to remember</p>
        </div>
      </div>
    </section>
  )
}
