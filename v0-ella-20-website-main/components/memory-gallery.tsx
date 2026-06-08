'use client'

import Image from 'next/image'
import { FadeIn } from './fade-in'

interface GalleryItem {
  id: number
  caption: string
}

export function MemoryGallery({ items }: { items: GalleryItem[] }) {
  return (
    <FadeIn
      as="section"
      className="w-full px-6 py-16 sm:py-24"
    >
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-12 text-center text-3xl sm:text-4xl font-heading font-semibold text-foreground">
          Memories 📸
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {items.map((item, index) => (
            <FadeIn
              key={item.id}
              className="group relative overflow-hidden rounded-xl border border-gold-soft/20 bg-slate-900/30 backdrop-blur-sm"
              delay={index * 100}
            >
              <div className="aspect-square overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                {/* Placeholder for image - will be filled with actual gallery images */}
                <div className="flex flex-col items-center justify-center gap-2 text-center p-6">
                  <div className="text-5xl">📷</div>
                  <p className="text-sm text-gold-soft/60">
                    Gallery #{item.id}
                  </p>
                </div>
              </div>

              {/* Caption overlay */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/50 to-transparent px-4 py-6">
                <p className="text-center text-gold-soft text-sm sm:text-base">
                  {item.caption}
                </p>
              </div>

              {/* Hover glow effect */}
              <div
                className="absolute inset-0 bg-gradient-to-t from-gold/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                aria-hidden="true"
              />
            </FadeIn>
          ))}
        </div>
      </div>
    </FadeIn>
  )
}
