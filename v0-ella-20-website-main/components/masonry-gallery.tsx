'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

interface Photo {
  id: number
  src: string
  caption?: string
}

interface MasonryGalleryProps {
  groups: {
    title: string
    photos: Photo[]
  }[]
}

export function MasonryGallery({ groups }: MasonryGalleryProps) {
  const [lightbox, setLightbox] = useState<Photo | null>(null)

  return (
    <section id="chapter-gallery" className="relative w-full bg-[#FDF8F3] px-6 py-24 overflow-hidden">
      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-5"
        style={{
          backgroundImage: 'linear-gradient(#C4687A 1px, transparent 1px), linear-gradient(90deg, #C4687A 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Title */}
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block relative"
          >
            <h2 className="font-playfair text-[36px] sm:text-[56px] text-[#3D2C2C] mb-2">
              A Collection of Meaningful Days
            </h2>
            <div className="h-[2px] w-full bg-[#D4AF37]" aria-hidden="true" />
            <p className="mt-4 font-jost text-[16px] text-[#C4687A] uppercase tracking-[0.2em]">
              The ones we kept
            </p>
          </motion.div>
        </div>

        {/* Gallery Groups */}
        {groups.map((group, groupIdx) => (
          <div key={groupIdx} className="mb-24 last:mb-0">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 mb-12"
            >
              <h3 className="font-cormorant italic text-[28px] text-[#D4AF37]">
                {group.title}
              </h3>
              <div className="h-[1px] flex-grow bg-[rgba(212,175,55,0.3)]" />
            </motion.div>

            {/* Masonry Grid (columns approach for Tailwind) */}
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
              {group.photos.map((photo, i) => (
                <motion.div
                  key={photo.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ delay: (i % 3) * 0.1, duration: 0.6 }}
                  className="break-inside-avoid"
                >
                  <div 
                    className="relative rounded-[24px] overflow-hidden group cursor-pointer border border-[rgba(196,104,122,0.1)] shadow-[0_8px_30px_rgba(196,104,122,0.08)] bg-white"
                    onClick={() => setLightbox(photo)}
                  >
                    <Image
                      src={photo.src || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800"} // Placeholder
                      alt={photo.caption || "Memory"}
                      width={600}
                      height={800} // Assume a vertical default, object-cover handles it
                      className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      // Removed intrinsic height dependency for masonry, setting generic aspect or height might be needed per photo, but Next Image with layout responsive usually handles it if height/width ratio is known. Let's rely on object-cover and reasonable dims.
                    />
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-[#F9E8E8]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-6 text-center">
                      {photo.caption && (
                        <p className="font-dancing text-[24px] text-white drop-shadow-md transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                          {photo.caption}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#2C1A1A]/95 p-4"
            onClick={() => setLightbox(null)}
          >
            <button 
              className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors"
              onClick={() => setLightbox(null)}
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
              <Image
                src={lightbox.src || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=1600"}
                alt={lightbox.caption || "Lightbox"}
                width={1200}
                height={1200}
                className="w-auto max-h-[80vh] object-contain rounded-lg shadow-2xl"
              />
              {lightbox.caption && (
                <p className="text-center mt-6 font-jost text-white/90 text-lg">
                  {lightbox.caption}
                </p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
