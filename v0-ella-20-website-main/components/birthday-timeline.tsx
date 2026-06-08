'use client'

import { FadeIn } from './fade-in'

interface TimelineItem {
  event: string
  icon: string
  description?: string
}

export function BirthdayTimeline({ items }: { items: TimelineItem[] }) {
  return (
    <FadeIn
      as="section"
      className="w-full px-6 py-16 sm:py-24"
    >
      <div className="mx-auto max-w-2xl">
        <h2 className="mb-12 text-center text-3xl sm:text-4xl font-heading font-semibold text-foreground">
          Our journey
        </h2>

        <div className="space-y-8">
          {items.map((item, index) => (
            <FadeIn
              key={index}
              className="relative flex gap-6"
              delay={index * 100}
            >
              <div className="flex flex-col items-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-gold/50 bg-gold/10 text-lg">
                  {item.icon}
                </div>
                {index < items.length - 1 && (
                  <div
                    className="my-2 w-1 h-8 bg-gradient-to-b from-gold/50 to-gold/10"
                    aria-hidden="true"
                  />
                )}
              </div>

              <div className="flex-1 pt-2">
                <p className="text-lg sm:text-xl font-heading font-semibold text-foreground">
                  {item.event}
                </p>
                {item.description && (
                  <p className="mt-2 text-sm leading-relaxed text-foreground/70">
                    {item.description}
                  </p>
                )}
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </FadeIn>
  )
}
