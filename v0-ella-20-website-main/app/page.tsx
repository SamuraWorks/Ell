'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { CountdownTimer } from '@/components/countdown'
import { ParticleCanvas } from '@/components/particle-canvas'
import { WaxSeal } from '@/components/wax-seal'
import { VideoHero } from '@/components/video-hero'
import { isBirthdayUnlocked } from '@/lib/unlock'

export default function HomePage() {
  const router = useRouter()
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [isOpening, setIsOpening] = useState(false)

  useEffect(() => {
    setIsUnlocked(isBirthdayUnlocked())
  }, [])

  const handleUnlock = () => {
    if (!isUnlocked) return
    setIsOpening(true)
    
    // Freeze particles
    if (typeof window !== 'undefined' && (window as any).freezeParticles) {
      (window as any).freezeParticles()
    }

    // Sequence: 2s for text, then 1.5s for fade to site
    setTimeout(() => {
      router.push('/birthday')
    }, 3500)
  }

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background">
      {/* Video Background */}
      <VideoHero />

      {/* Background Gradient Mesh */}
      <div 
        className="absolute inset-0 z-0 opacity-60"
        style={{
          background: 'radial-gradient(circle at 20% 30%, #F9E8E8 0%, transparent 50%), radial-gradient(circle at 80% 70%, #F5E6C8 0%, transparent 50%), radial-gradient(circle at 50% 50%, #FDF8F3 0%, transparent 100%)',
          animation: 'gradient-shift 15s ease infinite alternate'
        }}
      />
      
      {/* Particles */}
      <ParticleCanvas />

      {/* Grain overlay */}
      <div className="grain grain-5 absolute inset-0 z-0 pointer-events-none" />

      {/* Giant faint watermark */}
      <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none select-none">
        <span className="font-cormorant text-[20vw] font-bold text-[#C4687A] opacity-5 tracking-widest">
          ELLA
        </span>
      </div>

      {/* Content */}
      <AnimatePresence>
        {!isOpening ? (
          <motion.div 
            exit={{ scale: 1.05, opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="relative z-10 flex w-full max-w-xl flex-col items-center gap-10"
          >
            <div className="space-y-4 text-center">
              <p className="text-xs font-jost uppercase tracking-[0.35em] text-[#D4AF37]">
                A private experience
              </p>
              <h1 className="font-cormorant text-5xl sm:text-6xl text-[#3D2C2C] drop-shadow-sm">
                Ella <span className="italic text-[#C4687A]">@ 20</span>
              </h1>
            </div>

            {/* Countdown / Lock status */}
            {!isUnlocked ? (
              <div className="flex flex-col items-center gap-8">
                <CountdownTimer />
                <p className="font-jost text-sm tracking-wide text-[#8B6E6E] max-w-xs text-center leading-relaxed">
                  This space belongs to you. Come back when the time is right.
                </p>
                <WaxSeal pulse={false} size={80} />
              </div>
            ) : (
              <div className="flex flex-col items-center gap-8 animate-fade-in-up">
                <p className="font-playfair italic text-[24px] text-[#3D2C2C]">
                  The time has come.
                </p>
                <button
                  onClick={handleUnlock}
                  className="group relative flex items-center justify-center focus:outline-none"
                >
                  <WaxSeal pulse={true} size={120} />
                  <span className="absolute -bottom-10 font-jost text-sm uppercase tracking-widest text-[#C4687A] opacity-0 group-hover:opacity-100 transition-opacity">
                    Break the seal
                  </span>
                </button>
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative z-20 flex flex-col items-center"
          >
            {/* Wax seal cracks */}
            <div className="mb-12">
              <WaxSeal shouldCrack={true} size={160} />
            </div>

            {/* Fade in text */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="font-dancing text-[42px] sm:text-[56px] text-[#C4687A]"
            >
              You're here.
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
