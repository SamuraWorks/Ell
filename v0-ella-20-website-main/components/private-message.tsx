'use client'

import { useState } from 'react'
import { FadeIn } from './fade-in'

export function PrivateMessage({
  title,
  buttonText,
  content,
}: {
  title: string
  buttonText: string
  content: string
}) {
  const [isRevealed, setIsRevealed] = useState(false)

  return (
    <FadeIn
      as="section"
      className="w-full px-6 py-16 sm:py-24"
    >
      <div className="mx-auto max-w-2xl">
        <div className="rounded-2xl border border-gold-soft/30 bg-gradient-to-br from-slate-900/50 via-purple-900/30 to-slate-900/50 backdrop-blur-md p-8 sm:p-12 text-center">
          <h2 className="mb-6 text-3xl sm:text-4xl font-heading font-semibold text-white">
            {title}
          </h2>

          {!isRevealed ? (
            <button
              onClick={() => setIsRevealed(true)}
              className="mx-auto px-8 py-3 rounded-full border-2 border-gold/50 bg-gold/10 backdrop-blur-sm text-lg font-semibold text-gold hover:bg-gold/20 hover:border-gold transition-all duration-300 hover:shadow-[0_0_30px_rgba(219,164,102,0.3)]"
            >
              {buttonText}
            </button>
          ) : (
            <div className="space-y-6 animate-fade-in">
              <p className="text-lg sm:text-xl leading-relaxed text-white/90">
                {content}
              </p>
              <div className="text-4xl">💌</div>
            </div>
          )}
        </div>
      </div>
    </FadeIn>
  )
}
