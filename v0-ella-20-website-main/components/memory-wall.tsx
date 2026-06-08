'use client'

import { FadeIn } from './fade-in'

interface MemoryItem {
  id: number
  title: string
  icon: string
  caption: string
}

export function MemoryWall({ items }: { items: MemoryItem[] }) {
  return (
    <FadeIn
      as="section"
      className="w-full px-6 py-16 sm:py-24"
    >
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-12 text-center text-3xl sm:text-4xl font-heading font-semibold text-foreground">
          Our Memory Wall 📸
        </h2>

        <div className="space-y-8">
          {items.map((item, index) => (
            <FadeIn
              key={item.id}
              className="group relative flex flex-col items-center gap-4 text-center"
              delay={index * 120}
            >
              <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-gold-soft/30 bg-gold/5 backdrop-blur-sm text-4xl group-hover:border-gold-soft/50 transition-all duration-300">
                {item.icon}
              </div>
              <div className="space-y-2">
                <h3 className="text-lg sm:text-xl font-heading font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="text-sm sm:text-base text-gold-soft/80">
                  {item.caption}
                </p>
              </div>
              {index < items.length - 1 && (
                <div
                  className="w-0.5 h-8 bg-gradient-to-b from-gold-soft/50 to-gold-soft/10 mt-4"
                  aria-hidden="true"
                />
              )}
            </FadeIn>
          ))}
        </div>
      </div>
    </FadeIn>
  )
}
