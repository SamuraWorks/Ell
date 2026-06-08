'use client'

import { useRouter } from 'next/navigation'
import { useState, useRef } from 'react'
import { motion } from 'framer-motion'

interface EnvelopeLetterProps {
  opening: string
  paragraphs: string[]
  prayers?: string[]
  careerGoals?: string[]
  wishes?: string[]
  closing?: string
  href?: string
  buttonText?: string
}

export function EnvelopeLetter({
  opening,
  paragraphs,
  prayers,
  careerGoals,
  wishes,
  closing = "Love, your person.",
  href,
  buttonText,
}: EnvelopeLetterProps) {
  const router = useRouter()
  const containerRef = useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = useState(false)

  const toggleOpen = () => {
    if (href) {
      router.push(href)
      return
    }
    setIsOpen((current) => !current)
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      toggleOpen()
    }
  }

  return (
    <section id="chapter-letter" className="relative w-full bg-[#FDF8F3] px-6 py-32 overflow-hidden flex flex-col items-center min-h-[880px]">
      {/* Background lined paper texture */}
      <div 
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: 'repeating-linear-gradient(transparent, transparent 31px, #C4687A 31px, #C4687A 32px)',
          backgroundSize: '100% 32px'
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(253,248,243,0.9)_100%)] pointer-events-none" />

      <div className="relative z-10 w-full max-w-3xl">
        <div
          ref={containerRef}
          role="button"
          tabIndex={0}
          aria-expanded={isOpen}
          aria-label="Toggle letter envelope open"
          onClick={toggleOpen}
          onKeyDown={handleKeyDown}
          className="cursor-pointer"
        >
        
        {/* Envelope Container */}
        <div className="relative w-full overflow-hidden flex justify-center perspective-[1000px] mb-28">
          
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative w-full max-w-[600px]"
          >
            {/* The Envelope SVG (Back) */}
            <svg viewBox="0 0 600 400" className="w-full drop-shadow-2xl">
              <rect width="600" height="400" fill="#F5E6C8" rx="8" />
              <path d="M0 0 L300 200 L600 0" fill="#E8D5A3" />
            </svg>

            {/* The Letter (slides out) */}
            <motion.div
              initial={{ y: 0 }}
              animate={isOpen ? { y: -160 } : {}}
              transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
              className="absolute top-[20%] left-[5%] w-[90%] bg-[#FFFAF7] rounded-sm shadow-lg border border-[rgba(212,175,55,0.2)] p-8 sm:p-12 z-40"
            >
              {/* Fold lines */}
              <div className="absolute top-1/3 left-0 w-full h-[1px] bg-[#E8D5A3]/30" />
              <div className="absolute top-2/3 left-0 w-full h-[1px] bg-[#E8D5A3]/30" />

              <div className="text-center mb-8">
                <span className="font-playfair text-[#D4AF37] text-sm tracking-[0.2em] uppercase">June 4, 2026</span>
              </div>

              <div className="font-dancing text-[22px] sm:text-[26px] text-[#3D2C2C] leading-[2.0]">
                <p className="mb-6">{opening}</p>
                {paragraphs.map((p, i) => (
                  <p key={i} className="mb-6">{p}</p>
                ))}

                {prayers && prayers.length > 0 && (
                  <div className="mt-8">
                    <p className="font-semibold text-[#C4687A] mb-4">Prayers</p>
                    {prayers.map((prayer, index) => (
                      <p key={`prayer-${index}`} className="mb-4">{prayer}</p>
                    ))}
                  </div>
                )}

                {careerGoals && careerGoals.length > 0 && (
                  <div className="mt-8">
                    <p className="font-semibold text-[#C4687A] mb-4">Career Goals</p>
                    {careerGoals.map((goal, index) => (
                      <p key={`career-${index}`} className="mb-4">{goal}</p>
                    ))}
                  </div>
                )}

                {wishes && wishes.length > 0 && (
                  <div className="mt-8">
                    <p className="font-semibold text-[#C4687A] mb-4">Wishes</p>
                    {wishes.map((wish, index) => (
                      <p key={`wish-${index}`} className="mb-4">{wish}</p>
                    ))}
                  </div>
                )}

                <p className="mt-12 text-right">{closing}</p>
              </div>
            </motion.div>

            {/* The Envelope Flap (opens) */}
            <motion.div
              initial={{ rotateX: 0 }}
              animate={isOpen ? { rotateX: -180, zIndex: -1 } : {}}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              style={{ transformOrigin: "top" }}
              className="absolute top-0 left-0 w-full z-20"
            >
              <svg viewBox="0 0 600 200" className="w-full">
                <path d="M0 0 L300 200 L600 0 Z" fill="#F5E6C8" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.1))" />
              </svg>
            </motion.div>

            {/* The Envelope Front */}
            <div className="absolute bottom-0 left-0 w-full h-full z-10 pointer-events-none">
              <svg viewBox="0 0 600 400" className="w-full h-full">
                <path d="M0 400 L300 200 L600 400 Z" fill="#FDF8F3" />
                <path d="M0 0 L0 400 L300 200 Z" fill="#FDF8F3" />
                <path d="M600 0 L600 400 L300 200 Z" fill="#F9E8E8" />
              </svg>
              
              {/* Wax Seal on Envelope */}
              <motion.div
                initial={{ opacity: 1 }}
                animate={isOpen ? { opacity: 0 } : {}}
                transition={{ duration: 0.3 }}
                className="absolute top-[180px] left-[280px] w-10 h-10 bg-[#C4687A] rounded-full shadow-md flex items-center justify-center border-[2px] border-[#D4AF37]"
              >
                <span className="font-georgia text-[#FFFAF7] font-bold text-sm">E</span>
              </motion.div>
            </div>

            {!isOpen ? (
              <div className="absolute inset-x-0 bottom-[-2.5rem] flex justify-center">
                <span className="rounded-full bg-[#F9E8E8]/90 px-4 py-2 text-sm text-[#3D2C2C] shadow-sm ring-1 ring-[#C4687A]/20">
                  Click to open the envelope
                </span>
              </div>
            ) : null}

          </motion.div>
        </div>
        </div>

        <div className="relative z-10 mt-10 text-center">
          {href ? (
            <button
              type="button"
              onClick={() => router.push(href)}
              className="inline-flex items-center justify-center rounded-full border border-[#C4687A]/20 bg-white px-6 py-3 text-sm font-semibold text-[#3D2C2C] shadow-sm transition hover:bg-[#F9E6E8]"
            >
              {buttonText || 'Read the full letter'}
            </button>
          ) : (
            <button
              type="button"
              onClick={toggleOpen}
              className="inline-flex items-center justify-center rounded-full border border-[#C4687A]/20 bg-white px-6 py-3 text-sm font-semibold text-[#3D2C2C] shadow-sm transition hover:bg-[#F9E6E8]"
            >
              {isOpen ? 'Close the letter' : 'Open the letter'}
            </button>
          )}
          <p className="mt-3 text-xs uppercase tracking-[0.24em] text-[#8B6E6E]">
            {href ? 'Click the envelope or button to read the full letter on its own page.' : 'Tap the envelope or use the button to view the full letter contents.'}
          </p>
        </div>
      </div>
    </section>
  )
}
