'use client'

import { FadeIn } from './fade-in'

export function AnniversaryClosing({ text }: { text: string }) {
  return (
    <FadeIn
      as="section"
      className="w-full px-6 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-2xl sm:text-3xl md:text-4xl font-heading font-semibold leading-relaxed text-gold">
          {text}
        </p>
        <div className="mt-8 h-1 w-12 mx-auto bg-gradient-to-r from-gold-soft/10 via-gold-soft/40 to-gold-soft/10" />
      </div>
    </FadeIn>
  )
}
