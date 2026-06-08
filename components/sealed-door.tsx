'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { getAnniversaryTarget, getCountdown, type Countdown, isAnniversaryUnlocked } from '@/lib/unlock'
import { WaxSeal } from './wax-seal'

function pad(n: number) {
  return n.toString().padStart(2, '0')
}

export function SealedDoor({ onOpen }: { onOpen: () => void }) {
  const [time, setTime] = useState<Countdown | null>(null)
  const [unlocked, setUnlocked] = useState(false)
  const [opening, setOpening] = useState(false)

  useEffect(() => {
    // Initial check
    const isReady = isAnniversaryUnlocked()
    setUnlocked(isReady)

    if (!isReady) {
      const target = getAnniversaryTarget()
      const tick = () => {
        const remaining = getCountdown(target)
        setTime(remaining)
        if (remaining.done) {
          setUnlocked(true)
        }
      }
      tick()
      const id = setInterval(tick, 1000)
      return () => clearInterval(id)
    }
  }, [])

  const handleCrack = () => {
    setOpening(true)
    setTimeout(() => {
      onOpen()
    }, 2000)
  }

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center bg-[#2C1A1A] px-6 py-24 overflow-hidden">
      {/* Gold geometric pattern overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l30 30-30 30L0 30z' fill='none' stroke='%23D4AF37' stroke-width='1'/%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }}
      />
      
      <div className="relative z-10 flex flex-col items-center">
        
        {/* The Door/Seal Container */}
        <motion.div
          animate={opening ? { scale: 1.1, opacity: 0 } : { scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="relative"
        >
          {opening && (
            <div className="absolute inset-0 bg-[#FDF8F3] blur-[100px] rounded-full z-0" style={{ animation: 'fade-in 1.5s ease-out' }} />
          )}
          <WaxSeal 
            shouldCrack={unlocked && opening} 
            onCrack={handleCrack} 
            pulse={!opening} 
            size={160} 
          />
        </motion.div>

        <motion.div
          animate={opening ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-16 text-center"
        >
          <h2 className="font-playfair text-[24px] sm:text-[32px] text-[#FDF8F3] mb-6">
            The Next Chapter
          </h2>

          {!unlocked ? (
            <div className="flex items-center justify-center gap-4 text-[#E8D5A3] font-jost tabular-nums text-lg">
              <div className="flex flex-col items-center">
                <span className="text-3xl">{time ? pad(time.days) : '--'}</span>
                <span className="text-[10px] uppercase tracking-widest opacity-60">Days</span>
              </div>
              <span className="text-3xl pb-4 opacity-30">:</span>
              <div className="flex flex-col items-center">
                <span className="text-3xl">{time ? pad(time.hours) : '--'}</span>
                <span className="text-[10px] uppercase tracking-widest opacity-60">Hrs</span>
              </div>
              <span className="text-3xl pb-4 opacity-30">:</span>
              <div className="flex flex-col items-center">
                <span className="text-3xl">{time ? pad(time.minutes) : '--'}</span>
                <span className="text-[10px] uppercase tracking-widest opacity-60">Min</span>
              </div>
              <span className="text-3xl pb-4 opacity-30">:</span>
              <div className="flex flex-col items-center">
                <span className="text-3xl">{time ? pad(time.seconds) : '--'}</span>
                <span className="text-[10px] uppercase tracking-widest opacity-60">Sec</span>
              </div>
            </div>
          ) : (
            <button
              onClick={handleCrack}
              disabled={opening}
              className="px-8 py-3 bg-transparent border border-[#D4AF37] text-[#D4AF37] font-jost tracking-widest uppercase text-sm rounded-full hover:bg-[#D4AF37]/10 transition-colors"
            >
              Break the Seal
            </button>
          )}
          
          <p className="mt-8 font-cormorant italic text-[#FDF8F3]/50 text-lg">
            {!unlocked ? "Some things are worth waiting for." : "The time has come."}
          </p>
        </motion.div>

      </div>
    </section>
  )
}
