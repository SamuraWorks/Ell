'use client'

import { motion } from 'framer-motion'

interface AspirationPanelsProps {
  dreams: string[]
  promises: string[]
  reminder: string
}

export function AspirationPanels({ dreams, promises, reminder }: AspirationPanelsProps) {
  return (
    <section id="chapter-future" className="relative w-full bg-gradient-to-b from-[#F9E8E8] to-[#F5E6C8] px-6 py-32 overflow-hidden">
      {/* Sparkles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 40 }).map((_, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              bottom: `${Math.random() * 100}%`,
              animation: `sparkle ${Math.random() * 5 + 5}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="#D4AF37" className="opacity-40">
              <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
            </svg>
          </div>
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-4xl space-y-16">
        
        <div className="text-center mb-16">
          <h2 className="font-playfair text-[36px] sm:text-[56px] text-[#3D2C2C]">
            The Next Chapter
          </h2>
        </div>

        {/* Panel A - Dreams */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8 }}
          className="w-full bg-[#FFFAF7]/80 backdrop-blur-md rounded-[24px] p-10 sm:p-16 border border-[rgba(212,175,55,0.3)] shadow-[0_8px_40px_rgba(212,175,55,0.1)]"
        >
          <h3 className="font-playfair text-[28px] text-[#C4687A] mb-8 text-center">
            Where You Are Going
          </h3>
          <div className="space-y-6">
            {dreams.map((dream, i) => (
              <p key={i} className="font-jost text-[16px] sm:text-[18px] text-[#3D2C2C] leading-relaxed text-center">
                {dream}
              </p>
            ))}
          </div>
        </motion.div>

        {/* Panel B - Promises */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full bg-[#C4687A] rounded-[24px] p-10 sm:p-16 shadow-[0_12px_40px_rgba(196,104,122,0.3)] text-white"
        >
          <h3 className="font-playfair text-[28px] text-white mb-8 text-center relative inline-block left-1/2 -translate-x-1/2">
            What I Promise You
            <div className="absolute -bottom-4 left-0 w-full h-[1px] bg-[#F9E8E8]/30" />
          </h3>
          <ul className="space-y-6 mt-12 max-w-2xl mx-auto">
            {promises.map((promise, i) => (
              <li key={i} className="flex gap-4">
                <span className="font-cormorant text-[#E8D5A3] text-xl">❧</span>
                <span className="font-jost text-[16px] sm:text-[18px] leading-relaxed">
                  {promise}
                </span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Panel C - Reminder */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="w-full text-center py-12"
        >
          <p className="font-cormorant italic text-[24px] sm:text-[34px] text-[#3D2C2C] max-w-3xl mx-auto leading-relaxed">
            "{reminder}"
          </p>
          <p className="mt-8 font-jost text-[14px] text-[#C4687A] uppercase tracking-[0.1em]">
            Come back and read this when you doubt it.
          </p>
        </motion.div>

      </div>
    </section>
  )
}
