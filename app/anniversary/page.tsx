'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { EnvelopeLetter } from '@/components/envelope-letter'
import { CustomCursor } from '@/components/custom-cursor'
import { ScrollProgressBar } from '@/components/progress-bar'
import { AnniversaryGallery } from '@/components/anniversary-gallery'

import { AnniversaryLock } from '@/components/anniversary-lock'
import anniversaryData from '@/data/anniversary.json'
import galleryData from '@/data/gallery.json'
import { isAnniversaryUnlocked, isAnniversaryPasswordOk } from '@/lib/unlock'
import { validateSections } from '@/lib/content-schema'
import type { ContentSection } from '@/lib/content-schema'
import { useRouter } from 'next/navigation'

export default function AnniversaryExperience() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [isLocked, setIsLocked] = useState(true)

  useEffect(() => {
    setMounted(true)
    window.scrollTo(0, 0)

    const checkLockStatus = () => {
      setIsLocked(!isAnniversaryPasswordOk())
    }

    checkLockStatus()
    const interval = setInterval(checkLockStatus, 1000)
    return () => clearInterval(interval)
  }, [])

  if (!mounted) return null

  if (isLocked) {
    return <AnniversaryLock onUnlock={() => setIsLocked(false)} />
  }

  /**
   * Anniversary gallery sections — each section exclusively owns its items.
   * The old shared flat `galleryData.anniversary` array is NOT used here.
   * `validateSections` deduplicates titles, replaces missing srcs with a
   * placeholder, and logs every problem to the console.
   */
  const anniversarySections = validateSections(
    (galleryData.anniversarySections as ContentSection[])
  )

  return (
    <main className="relative min-h-screen w-full bg-background selection:bg-[#D4AF37]/20">
      <CustomCursor />
      <ScrollProgressBar />

      {/* Hero */}
      <section className="relative flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#F9E8E8] to-[#F5E6C8] px-6 py-24 overflow-hidden">
        {/* Sparkles */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              className="absolute"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
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
        <div className="grain grain-5 absolute inset-0 pointer-events-none" aria-hidden="true" />

        <div className="relative z-10 text-center max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="font-playfair text-[48px] sm:text-[72px] text-[#3D2C2C] mb-6">
              Two Years.
            </h1>
            <p className="font-cormorant italic text-[24px] sm:text-[32px] text-[#C4687A]">
              Discovery and Depth.
            </p>
          </motion.div>
        </div>
        
        {/* Scroll Prompt */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-12 animate-bounce"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C4687A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-60">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </motion.div>
      </section>

      {/* Chapter A: Us @ Two Years (Timeline Grid) */}
      <section className="bg-[#FFFAF7] px-6 py-32">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 md:gap-8">
            {/* Year One */}
            <div>
              <div className="text-center mb-12">
                <h3 className="font-playfair text-[32px] text-[#D4AF37]">Year One</h3>
                <p className="font-jost text-[14px] text-[#8B6E6E] uppercase tracking-widest mt-2">Discovery</p>
              </div>
              <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-[2px] before:bg-gradient-to-b before:from-[#F9E8E8] before:to-[#C4687A]">
                {anniversaryData.timeline.slice(0, 3).map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
                  >
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-[#D4AF37] bg-white text-sm shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                      {item.icon}
                    </div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-[24px] bg-white border border-[#F9E8E8] shadow-[0_8px_30px_rgba(196,104,122,0.05)]">
                      <h4 className="font-playfair text-[20px] text-[#C4687A] mb-2">{item.event}</h4>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Year Two */}
            <div>
              <div className="text-center mb-12">
                <h3 className="font-playfair text-[32px] text-[#D4AF37]">Year Two</h3>
                <p className="font-jost text-[14px] text-[#8B6E6E] uppercase tracking-widest mt-2">Depth</p>
              </div>
              <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-[2px] before:bg-gradient-to-b before:from-[#C4687A] before:to-[#D4AF37]">
                {anniversaryData.timeline.slice(3).map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
                  >
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-[#D4AF37] bg-white text-sm shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                      {item.icon}
                    </div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-[24px] bg-[#F5E6C8]/30 border border-[#D4AF37]/20 shadow-[0_8px_30px_rgba(212,175,55,0.05)]">
                      <h4 className="font-playfair italic text-[20px] text-[#3D2C2C] mb-2">{item.event}</h4>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Chapter B: The Anniversary Gallery */}
      <AnniversaryGallery sections={anniversarySections} />

      {/* Chapter C: What We Learned */}
      <section className="bg-[#F9E8E8] px-6 py-32">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-[42px] text-[#3D2C2C]">What We Learned</h2>
            <div className="h-[2px] w-24 bg-[#D4AF37] mx-auto mt-4" />
          </div>

          {[
            { topic: "Communication", text: "What we got wrong. How we got better. What it cost us and what it gave us." },
            { topic: "Forgiveness", text: "The moments we chose to stay. Why they matter more than the easy days." },
            { topic: "Growth", text: "Who we were at the start. Who we are now. The distance between those two things." }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-[24px] p-10 border border-[rgba(196,104,122,0.1)] shadow-[0_12px_40px_rgba(196,104,122,0.08)]"
            >
              <h3 className="font-playfair text-[28px] text-[#C4687A] mb-4">{item.topic}</h3>
              <p className="font-jost text-[18px] text-[#3D2C2C] leading-relaxed">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Chapter D: Anniversary Letter */}
      <EnvelopeLetter 
        opening={anniversaryData.letter.opening}
        paragraphs={anniversaryData.letter.paragraphs}
        prayers={anniversaryData.letter.prayers}
        careerGoals={anniversaryData.letter.careerGoals}
        wishes={anniversaryData.letter.wishes}
        closing="Grateful for two years. Happy Anniversary."
        href="/anniversary/letter"
        buttonText="Read the full anniversary letter"
      />
    </main>
  )
}
