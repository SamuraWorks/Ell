'use client'

import { FadeIn } from './fade-in'

export function AnniversaryLetter({
  opening,
  paragraphs,
}: {
  opening: string
  paragraphs: string[]
}) {
  return (
    <FadeIn
      as="section"
      className="w-full px-6 py-16 sm:py-24"
    >
      <article className="mx-auto max-w-2xl space-y-8 sm:space-y-10">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-semibold text-foreground text-center">
          {opening}
        </h2>

        <div className="space-y-6 sm:space-y-8 text-base sm:text-lg leading-relaxed text-foreground/90">
          {paragraphs.map((paragraph, index) => (
            <FadeIn
              key={index}
              className="text-foreground/85 leading-relaxed"
              delay={index * 80}
            >
              <p>{paragraph}</p>
            </FadeIn>
          ))}
        </div>

        {/* Decorative element with memory breathing effect */}
        <div className="flex justify-center py-8">
          <div className="text-4xl animate-memory-breath">💖</div>
        </div>
      </article>
    </FadeIn>
  )
}
