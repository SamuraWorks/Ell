'use client'

import { FadeIn } from './fade-in'

interface TimelineItem {
  event: string
  icon: string
}

export function AnniversaryTimeline({ items }: { items: TimelineItem[] }) {
  return (
    <FadeIn
      as="section"
      className="w-full px-6 py-16 sm:py-24"
    >
      <div className="mx-auto max-w-2xl">
        <h2 className="mb-12 text-center text-3xl sm:text-4xl font-heading font-semibold text-foreground">
          Our Journey 🧭
        </h2>

        <div className="space-y-8">
          {items.map((item, index) => (
            <FadeIn
              key={index}
              className="relative flex gap-6"
              delay={index * 120}
            >
              {/* Timeline dot and line */}
              <div className="flex flex-col items-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-gold-soft/40 bg-gold/5 text-lg hover:border-gold-soft/70 transition-all duration-300">
                  {item.icon}
                </div>
                {index < items.length - 1 && (
                  <div
                    className="my-2 w-1 h-8 bg-gradient-to-b from-gold-soft/40 to-gold-soft/10"
                    aria-hidden="true"
                  />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 pt-2">
                <p className="text-lg sm:text-xl font-heading font-semibold text-foreground">
                  {item.event}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </FadeIn>
  )
}
