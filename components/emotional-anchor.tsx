'use client'

import { FadeIn } from './fade-in'

export function EmotionalAnchor({ text }: { text: string }) {
  return (
    <FadeIn
      as="section"
      className="w-full px-6 py-16 sm:py-24"
    >
      <div className="mx-auto max-w-2xl text-center">
        <blockquote className="space-y-6">
          <p className="text-2xl sm:text-3xl md:text-4xl font-heading font-semibold leading-relaxed text-gold">
            "{text}"
          </p>
          <div className="flex justify-center gap-2">
            <div className="h-1 w-1 rounded-full bg-gold/50" />
            <div className="h-1 w-1 rounded-full bg-gold/30" />
            <div className="h-1 w-1 rounded-full bg-gold/20" />
          </div>
        </blockquote>
      </div>
    </FadeIn>
  )
}
