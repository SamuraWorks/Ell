'use client'

import { FadeIn } from './fade-in'

export function BirthdayWish({ text }: { text: string }) {
  return (
    <FadeIn
      as="section"
      className="w-full px-6 py-16 sm:py-24"
    >
      <div className="mx-auto max-w-2xl text-center">
        <div className="rounded-2xl border border-gold-soft/30 bg-gradient-to-br from-slate-900/50 via-purple-900/30 to-slate-900/50 backdrop-blur-md p-8 sm:p-12">
          <p className="text-xl sm:text-2xl md:text-3xl leading-relaxed text-white/90">
            {text}
          </p>
        </div>
      </div>
    </FadeIn>
  )
}
