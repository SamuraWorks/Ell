'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface Nickname {
  name: string
  meaning: string
  emoji: string
}

export function NicknameCards({ nicknames }: { nicknames: Nickname[] }) {
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null)

  return (
    <section id="chapter-language" className="relative w-full bg-[#2C1A1A] px-6 py-32 overflow-hidden text-white">
      {/* Dark background, gold floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-[#D4AF37]"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              opacity: Math.random() * 0.4 + 0.1,
              animation: `float-particle ${Math.random() * 10 + 10}s linear infinite`,
              animationDelay: `-${Math.random() * 10}s`,
            }}
          />
        ))}
      </div>
      <div className="grain grain-6 absolute inset-0 pointer-events-none" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block relative"
          >
            <h2 className="font-playfair text-[36px] sm:text-[56px] text-[#FDF8F3] mb-2">
              The Things I Call You
            </h2>
            <div className="h-[2px] w-full bg-[#D4AF37]" aria-hidden="true" />
          </motion.div>
        </div>

        <div className="flex overflow-x-auto pb-12 snap-x snap-mandatory hide-scrollbar md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:pb-0 md:overflow-visible">
          {nicknames.map((nn, idx) => {
            const isFlipped = flippedIndex === idx

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                className="min-w-[80vw] sm:min-w-[300px] md:min-w-0 h-[320px] snap-center flip-card-container"
                onClick={() => setFlippedIndex(isFlipped ? null : idx)}
              >
                <div className={`flip-card w-full h-full ${isFlipped ? 'flipped' : ''}`}>
                  {/* Front */}
                  <div className="flip-card-front bg-[#FFFAF7]/5 border border-[#D4AF37]/20 rounded-[24px] flex flex-col items-center justify-center p-8 backdrop-blur-sm shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
                    <span className="text-6xl mb-6">{nn.emoji || '✨'}</span>
                    <h3 className="font-playfair text-[28px] text-[#FDF8F3] text-center">
                      {nn.name}
                    </h3>
                  </div>

                  {/* Back */}
                  <div className="flip-card-back bg-[#F5E6C8] border border-[#D4AF37]/40 rounded-[24px] flex flex-col items-center justify-center p-8 text-[#2C1A1A]">
                    <h3 className="font-playfair text-[24px] text-[#C4687A] mb-4 text-center">
                      {nn.name}
                    </h3>
                    <div className="w-12 h-[1px] bg-[#D4AF37] mb-6" />
                    <p className="font-jost text-[16px] text-center leading-relaxed">
                      {nn.meaning}
                    </p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-center mt-20"
        >
          <p className="font-cormorant italic text-[24px] text-[#E8D5A3]">
            A language only we speak.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
