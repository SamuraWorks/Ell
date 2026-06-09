'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

interface CinematicIntroProps {
  photoUrl?: string
}

export function CinematicIntro({ photoUrl }: CinematicIntroProps) {
  const line1 = "This space was built for one person.".split(" ")
  
  return (
    <section id="chapter-welcome" className="relative flex min-h-screen flex-col items-center justify-center bg-[#FFFAF7] px-6 py-24 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(249,232,232,0.6)_0%,transparent_60%)] pointer-events-none" aria-hidden="true" />
      <div className="grain grain-5 absolute inset-0 pointer-events-none" aria-hidden="true" />

      <div className="relative z-10 flex flex-col items-center w-full max-w-4xl text-center">
        
        {/* Line 1 */}
        <div className="flex flex-wrap justify-center gap-x-[0.3em] font-cormorant text-[32px] sm:text-[52px] text-[#3D2C2C] leading-[1.6]">
          {line1.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 + 0.5, duration: 0.8 }}
            >
              {word}
            </motion.span>
          ))}
        </div>

        {/* Line 2 */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: line1.length * 0.15 + 1.5, duration: 1 }}
          className="mt-6 font-cormorant text-[64px] sm:text-[96px] text-[#C4687A] leading-none"
        >
          You.
        </motion.div>

        {/* Line 3 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: line1.length * 0.15 + 3.0, duration: 1.2 }}
          className="mt-8 font-playfair italic text-[28px] text-[#D4AF37]"
        >
          Happy Birthday, Ella.
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 120 }}
          transition={{ delay: line1.length * 0.15 + 4.5, duration: 1.5, ease: "easeInOut" }}
          className="h-[1px] bg-[#C4687A] mt-12"
        />

        {/* Photo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: line1.length * 0.15 + 5.5, duration: 1.5 }}
          className="mt-16 w-full max-w-3xl flex flex-col items-center"
        >
          <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-[0_8px_40px_rgba(196,104,122,0.12)] bg-neutral-900/5">
            <div 
              className="absolute inset-0 bg-cover bg-center blur-lg scale-110 opacity-30 pointer-events-none" 
              style={{ backgroundImage: `url(${photoUrl || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=1200"})` }}
            />
            <Image
              src={photoUrl || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=1200"} // Placeholder
              alt="Ella"
              fill
              className="object-contain sepia-[0.08] brightness-[1.05] saturate-[1.1] z-10"
              priority
            />
          </div>
          <p className="mt-6 font-dancing text-[20px] text-[#3D2C2C]">
            Twenty years of being exactly who you are.
          </p>
        </motion.div>

        {/* Scroll Prompt */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: line1.length * 0.15 + 7.0, duration: 1 }}
          className="mt-20 animate-bounce"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C4687A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-60">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </motion.div>
      </div>
    </section>
  )
}
