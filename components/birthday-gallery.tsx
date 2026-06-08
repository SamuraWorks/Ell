'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'

export type GalleryItem = {
  id: number | string
  src: string
  caption: string
  type?: 'image' | 'video'
  poster?: string
  videoDuration?: string
  videoAutoplay?: boolean
  section?: string
  date?: string
  order?: number
  tags?: string[]
  aspectRatio?: string
}

export type BirthdaySection = {
  title: string
  subtitle: string
  layout: 'masonry' | 'mixed' | 'featured' | 'editorial' | 'friends' | 'family' | 'playful' | 'minimal'
  closingNote: string
  items: GalleryItem[]
}

function GalleryPhotoCard({
  photo,
  hoverCaption = true,
  visibleCaption = false,
  compact = false,
  onClick,
}: {
  photo: GalleryItem
  hoverCaption?: boolean
  visibleCaption?: boolean
  compact?: boolean
  onClick?: () => void
}) {
  return (
    <div
      className={`relative group overflow-hidden rounded-[28px] border border-[#E8D5C9] bg-white shadow-[0_14px_40px_rgba(196,104,122,0.08)] ${compact ? 'min-h-[260px]' : ''} ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
      onKeyDown={onClick ? (event) => event.key === 'Enter' && onClick() : undefined}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      <div className="relative w-full overflow-hidden aspect-[4/5] sm:aspect-[3/4]">
        <Image
          src={photo.src}
          alt={photo.caption || 'Memory'}
          fill
          className="object-cover transition-transform duration-700 hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          loading="lazy"
        />
      </div>

      {hoverCaption && photo.caption ? (
        <div className="absolute inset-0 bg-[#000000]/0 group-hover:bg-[#000000]/30 transition-colors duration-300 flex items-end">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-full p-6">
            <p className="font-dancing text-[22px] text-white drop-shadow-md leading-tight">
              {photo.caption}
            </p>
          </div>
        </div>
      ) : null}

      {visibleCaption && photo.caption ? (
        <div className="border-t border-[#F0E2D7] px-4 py-4 bg-[#FFF8F1]">
          <p className="font-jost text-sm leading-6 text-[#3D2C2C]">{photo.caption}</p>
        </div>
      ) : null}
    </div>
  )
}

function GalleryVideoCard({ photo, onClick }: { photo: GalleryItem; onClick?: () => void }) {
  return (
    <div
      className={`relative overflow-hidden rounded-[28px] border border-[#E8D5C9] bg-[#1A1620] shadow-[0_14px_40px_rgba(196,104,122,0.08)] ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
      onKeyDown={onClick ? (event) => event.key === 'Enter' && onClick() : undefined}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      <div className="relative w-full aspect-[4/5] sm:aspect-[3/4] bg-[#000]">
        <video
          src={photo.src}
          preload="metadata"
          controls
          playsInline
          className="h-full w-full object-cover"
          poster={photo.poster}
        >
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="px-4 py-4 bg-[#FFFAF7]">
        <p className="font-jost text-sm text-[#3D2C2C]">{photo.caption}</p>
      </div>
    </div>
  )
}

function SectionHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="mb-10 text-center">
      <p className="font-jost text-[14px] uppercase tracking-[0.4em] text-[#C4687A] mb-3">Section</p>
      <h3 className="font-playfair text-[32px] sm:text-[40px] text-[#3D2C2C] mb-3">{title}</h3>
      <p className="font-jost text-base text-[#6E5250] max-w-2xl mx-auto">{subtitle}</p>
    </div>
  )
}

function renderSection(section: BirthdaySection | Record<string, any>, onPhotoClick?: (photo: GalleryItem) => void) {
  const items = ((section.items || []) as GalleryItem[])
    .map((item) => ({
      ...item,
      type: item.type || (typeof item.src === 'string' && item.src.toLowerCase().endsWith('.mp4') ? 'video' : 'image'),
    }))
    .filter((item: GalleryItem) => item.caption && item.src)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))

  const uniqueItems: GalleryItem[] = []
  const seen = new Set<string | number>()
  for (const item of items) {
    const key = typeof item.src === 'string' ? `src:${item.src}` : `id:${item.id ?? ''}`
    if (seen.has(key)) continue
    seen.add(key)
    uniqueItems.push(item)
  }

  if (!uniqueItems.length) return null

  const renderCard = (
    photo: GalleryItem,
    options: { compact?: boolean; hoverCaption?: boolean; visibleCaption?: boolean } = {},
  ) =>
    photo.type === 'video' ? (
      <GalleryVideoCard
        key={photo.id ?? photo.src}
        photo={photo}
        onClick={onPhotoClick ? () => onPhotoClick(photo) : undefined}
      />
    ) : (
      <GalleryPhotoCard
        key={photo.id ?? photo.src}
        photo={photo}
        hoverCaption={options.hoverCaption ?? section.layout !== 'minimal'}
        visibleCaption={options.visibleCaption ?? section.layout === 'minimal'}
        compact={options.compact ?? false}
        onClick={onPhotoClick ? () => onPhotoClick(photo) : undefined}
      />
    )

  const photoCards = uniqueItems.map(photo => renderCard(photo))

  if (section.layout === 'masonry') {
    return <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{photoCards}</div>
  }

  if (section.layout === 'mixed') {
    return (
      <div className="grid gap-6">
        <div className="grid gap-6 lg:grid-cols-2">
          {uniqueItems.slice(0, 1).map(photo => renderCard(photo, { hoverCaption: true }))}
          <div className="grid gap-6">
            {uniqueItems.slice(1, 4).map(photo => renderCard(photo, { hoverCaption: true, compact: true }))}
          </div>
        </div>
      </div>
    )
  }

  if (section.layout === 'featured') {
    const [hero, ...support] = uniqueItems
    return (
      <div className="space-y-8">
        <div className="rounded-[28px] border border-[#C9A84C]/20 bg-[#F5E6C8] p-4">
          <div className="relative overflow-hidden rounded-[20px] border border-[rgba(201,168,76,0.5)]">
            <div className="relative aspect-[16/9] w-full">
              {hero.type === 'video' ? (
                <video src={hero.src} preload="metadata" controls playsInline className="h-full w-full object-cover">
                  <source src={hero.src} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <Image src={hero.src} alt={hero.caption} fill className="object-cover" sizes="100vw" />
              )}
            </div>
            <div className="p-6 bg-gradient-to-t from-[#000000]/30 to-transparent">
              <p className="font-dancing text-[22px] text-white">{hero.caption}</p>
            </div>
          </div>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{support.map(photo => renderCard(photo, { hoverCaption: true }))}</div>
      </div>
    )
  }

  if (section.layout === 'editorial') {
    return (
      <div className="space-y-10">
        {uniqueItems.map((photo, index) => (
          <div key={photo.id} className={`grid gap-6 items-center ${index % 2 === 0 ? 'lg:grid-cols-[1.2fr_0.8fr]' : 'lg:grid-cols-[0.8fr_1.2fr]'} `}>
            <div className="rounded-[28px] overflow-hidden border border-[#E7D4C9] bg-white shadow-[0_10px_30px_rgba(196,104,122,0.08)]">
              <div className="relative aspect-[16/12] w-full">
                {photo.type === 'video' ? (
                  <video src={photo.src} preload="metadata" controls playsInline className="h-full w-full object-cover">
                    <source src={photo.src} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <Image src={photo.src} alt={photo.caption} fill className="object-cover" />
                )}
              </div>
            </div>
            <div className="space-y-4">
              <p className="font-dancing text-[24px] text-[#3D2C2C]">{photo.caption}</p>
              <p className="font-jost text-base text-[#6E5250]">A moment that felt most like you.</p>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (section.layout === 'friends') {
    return <div className="grid gap-4 sm:grid-cols-3">{photoCards}</div>
  }

  if (section.layout === 'family') {
    return <div className="grid gap-6 sm:grid-cols-2">{photoCards}</div>
  }

  if (section.layout === 'playful') {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {uniqueItems.map(photo => (
          <div key={photo.id} className="rotate-[1deg] hover:rotate-[0deg] transition-transform duration-300">
            {renderCard(photo, { hoverCaption: true, compact: true })}
          </div>
        ))}
      </div>
    )
  }

  if (section.layout === 'minimal') {
    return (
      <div className="grid gap-6 sm:grid-cols-2">{uniqueItems.map(photo => renderCard(photo, { hoverCaption: false, visibleCaption: true }))}</div>
    )
  }

  return <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{photoCards}</div>
}

export function BirthdayGallery({ sections }: { sections?: Array<BirthdaySection | Record<string, any>> }) {
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryItem | null>(null)

  if (!sections?.length) return null

  return (
    <section id="chapter-gallery" className="relative w-full bg-[#FDF8F3] px-6 py-24 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-5" style={{ backgroundImage: 'linear-gradient(#C4687A 1px, transparent 1px), linear-gradient(90deg, #C4687A 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="text-center mb-24">
          <p className="font-jost text-[14px] uppercase tracking-[0.4em] text-[#C4687A] mb-4">You, Before Us</p>
          <h2 className="font-playfair text-[40px] sm:text-[56px] text-[#3D2C2C] mb-4">A gallery with a home for every moment.</h2>
          <p className="mx-auto max-w-2xl font-jost text-base text-[#6E5250]">This is how I built your story into sections, with captions and meaning at every turn. Nothing floats alone.</p>
        </div>

        {sections.map((section, index) => (
          <div key={section.title} className="mb-28">
            <SectionHeader title={section.title} subtitle={section.subtitle} />
            {renderSection(section, (photo) => setSelectedPhoto(photo))}
            <div className="mt-8 text-center">
              <p className="font-dancing text-[22px] text-[#C4687A]">{section.closingNote}</p>
            </div>
          </div>
        ))}
        <AnimatePresence>
          {selectedPhoto && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center bg-[#2C1A1A]/95 p-4"
              onClick={() => setSelectedPhoto(null)}
            >
              <button
                className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors"
                onClick={() => setSelectedPhoto(null)}
              >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="relative max-w-[90vw] max-h-[85vh]"
                onClick={(e) => e.stopPropagation()}
              >
                {selectedPhoto.type === 'video' ? (
                  <video
                    src={selectedPhoto.src}
                    controls
                    playsInline
                    preload="metadata"
                    className="w-auto max-h-[80vh] object-contain rounded-lg shadow-2xl"
                  >
                    <source src={selectedPhoto.src} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <Image
                    src={selectedPhoto.src}
                    alt={selectedPhoto.caption || 'Memory'}
                    width={1200}
                    height={1200}
                    className="w-auto max-h-[80vh] object-contain rounded-lg shadow-2xl"
                  />
                )}
                {selectedPhoto.caption && (
                  <p className="text-center mt-6 font-jost text-white/90 text-lg">
                    {selectedPhoto.caption}
                  </p>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
