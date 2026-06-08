'use client'

import { useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'

type GalleryItem = {
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

type AnniversarySection = {
  title: string
  subtitle?: string
  layout: 'hero' | 'editorial' | 'spotlight' | 'masonry' | 'mixed' | 'strict' | 'playful' | 'special'
  closingNote: string
  themeWord?: string
  items: GalleryItem[]
}

function GalleryCard({ photo, showCaption = true, onClick }: { photo: GalleryItem; showCaption?: boolean; onClick?: () => void }) {
  return (
    <div
      className={`relative overflow-hidden rounded-[28px] border border-[#E8D5C9] bg-white shadow-[0_14px_40px_rgba(196,104,122,0.08)] ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
      onKeyDown={onClick ? (event) => event.key === 'Enter' && onClick() : undefined}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      <div className="relative w-full aspect-[4/5] sm:aspect-[3/4]">
        {photo.type === 'video' || (typeof photo.src === 'string' && photo.src.toLowerCase().endsWith('.mp4')) ? (
          <video src={photo.src} preload="metadata" controls playsInline className="h-full w-full object-cover">
            <source src={photo.src} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <Image src={photo.src} alt={photo.caption || 'Memory'} fill className="object-cover transition-transform duration-700 hover:scale-105" sizes="(max-width: 640px) 100vw, 50vw" />
        )}
      </div>
      {showCaption && photo.caption ? (
        <div className="px-4 py-4 bg-[#FFFAF7] border-t border-[#F0E2D7]">
          <p className="font-jost text-sm text-[#3D2C2C]">{photo.caption}</p>
        </div>
      ) : null}
      {photo.videoDuration ? (
        <span className="absolute top-4 right-4 rounded-full bg-[#D4AF37]/95 px-3 py-1 text-[11px] font-jost uppercase tracking-[0.24em] text-white">{photo.videoDuration}</span>
      ) : null}
    </div>
  )
}

function SpotlightPhoto({ photo, onClick }: { photo: GalleryItem; onClick?: () => void }) {
  return (
    <div
      className={`mx-auto w-full max-w-[480px] rounded-[28px] border border-[rgba(201,168,76,0.6)] bg-white shadow-[0_16px_60px_rgba(196,104,122,0.2)] overflow-hidden ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
      onKeyDown={onClick ? (event) => event.key === 'Enter' && onClick() : undefined}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      <div className="relative w-full aspect-[4/5]">
        {photo.type === 'video' || (typeof photo.src === 'string' && photo.src.toLowerCase().endsWith('.mp4')) ? (
          <video src={photo.src} preload="metadata" controls playsInline className="h-full w-full object-cover">
            <source src={photo.src} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <Image src={photo.src} alt={photo.caption || 'Us together'} fill className="object-cover" />
        )}
      </div>
      <div className="bg-[#FFF6ED] px-6 py-6 text-center">
        <p className="font-playfair text-[22px] text-[#3D2C2C]">{photo.caption}</p>
      </div>
    </div>
  )
}

function renderAnniversarySection(section: AnniversarySection | Record<string, any>, onPhotoClick?: (photo: GalleryItem) => void) {
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

  const renderCard = (photo: GalleryItem, options?: { showCaption?: boolean }) => (
    <GalleryCard
      key={photo.id}
      photo={photo}
      showCaption={options?.showCaption ?? true}
      onClick={onPhotoClick ? () => onPhotoClick(photo) : undefined}
    />
  )

  if (section.layout === 'hero') {
    const [hero, ...support] = items
    return (
      <div className="space-y-12">
        <SpotlightPhoto photo={hero} onClick={onPhotoClick ? () => onPhotoClick(hero) : undefined} />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{support.map(photo => renderCard(photo, { showCaption: true }))}</div>
      </div>
    )
  }

  if (section.layout === 'spotlight') {
    return <SpotlightPhoto photo={items[0]} onClick={onPhotoClick ? () => onPhotoClick(items[0]) : undefined} />
  }

  if (section.layout === 'masonry') {
    return <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{items.map(photo => renderCard(photo, { showCaption: true }))}</div>
  }

  if (section.layout === 'mixed') {
    return (
      <div className="space-y-8">
        <div className="rounded-[28px] border border-[#E8D5C9] bg-white p-3">
          {renderCard(items[0], { showCaption: true })}
        </div>
        <div className="grid gap-6 lg:grid-cols-3">{items.slice(1).map(photo => renderCard(photo, { showCaption: true }))}</div>
      </div>
    )
  }

  if (section.layout === 'strict') {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {uniqueItems.map((photo, index) => (
          <div key={photo.id} className={`${index === uniqueItems.length - 1 ? 'lg:col-span-2' : ''}`}>
            {renderCard(photo, { showCaption: true })}
          </div>
        ))}
      </div>
    )
  }

  if (section.layout === 'playful') {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {uniqueItems.map(photo => (
          <div key={photo.id} className="rotate-[1.5deg] hover:rotate-0 transition-transform duration-300">
            {renderCard(photo, { showCaption: true })}
          </div>
        ))}
      </div>
    )
  }

  if (section.layout === 'special') {
    return (
      <div className="space-y-8">
        {uniqueItems.map(photo => (
          <div key={photo.id} className="rounded-[28px] border border-[#E8D5C9] bg-white p-6 shadow-[0_14px_40px_rgba(196,104,122,0.08)]">
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[24px]">
              {photo.type === 'video' || (typeof photo.src === 'string' && photo.src.toLowerCase().endsWith('.mp4')) ? (
                <video src={photo.src} preload="metadata" controls playsInline className="h-full w-full object-cover">
                  <source src={photo.src} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <Image src={photo.src} alt={photo.caption} fill className="object-cover" />
              )}
            </div>
            <div className="mt-6 text-[#3D2C2C]">
              <p className="font-playfair text-[22px] mb-3">{photo.caption}</p>
              <p className="font-jost text-sm leading-7">A story worth reading again. Every small detail matters here.</p>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{uniqueItems.map(photo => <GalleryCard key={photo.id} photo={photo} showCaption />)}</div>
}

export function AnniversaryGallery({ sections }: { sections?: Array<AnniversarySection | Record<string, any>> }) {
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryItem | null>(null)

  if (!sections?.length) return null

  return (
    <section id="chapter-gallery" className="relative w-full bg-[#FEF9F4] px-6 py-24 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-5" style={{ backgroundImage: 'linear-gradient(#D4AF37 1px, transparent 1px), linear-gradient(90deg, #D4AF37 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="text-center mb-24">
          <p className="font-jost text-[14px] uppercase tracking-[0.4em] text-[#C4687A] mb-4">Us</p>
          <h2 className="font-playfair text-[40px] sm:text-[56px] text-[#3D2C2C] mb-4">A gallery built around us.</h2>
          <p className="mx-auto max-w-2xl font-jost text-base text-[#6E5250]">Every image of us belongs here. Solo photos stay only if they help tell our story.</p>
        </div>

        {sections.map(section => (
          <div key={section.title} className="mb-28">
            <div className="mb-10 text-center">
              <p className="font-jost text-[14px] uppercase tracking-[0.4em] text-[#C4687A] mb-3">Section</p>
              <h3 className="font-playfair text-[32px] sm:text-[40px] text-[#3D2C2C] mb-3">{section.title}</h3>
              {section.subtitle ? <p className="mx-auto max-w-2xl font-jost text-base text-[#6E5250]">{section.subtitle}</p> : null}
              {section.themeWord ? <p className="mt-4 font-playfair text-[18px] uppercase tracking-[0.4em] text-[#C4687A]">{section.themeWord}</p> : null}
            </div>
            {renderAnniversarySection(section, (photo) => setSelectedPhoto(photo))}
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
