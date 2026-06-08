'use client'

import { motion } from 'framer-motion'

interface Trait {
  name: string
  description: string
}

export function TraitsGrid({ traits }: { traits: Trait[] }) {
  return (
    <section id="chapter-ella" className="relative w-full bg-[#F9E8E8] px-6 py-24 overflow-hidden">
      <div className="absolute left-4 sm:left-12 top-0 bottom-0 w-[2px] bg-[rgba(196,104,122,0.3)] pointer-events-none" aria-hidden="true" />
      <div className="grain grain-5 absolute inset-0 pointer-events-none" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-6xl">
        
        {/* Section 2A — Opening Statement */}
        <div className="text-center max-w-3xl mx-auto mb-32">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8 }}
            className="font-cormorant text-[26px] sm:text-[38px] text-[#3D2C2C] leading-relaxed"
          >
            I could describe you in a thousand ways. But if I had to pick twenty things, it would be these.
            <br />
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 1 }}
              className="block mt-6 text-[32px] sm:text-[44px] text-[#C4687A]"
            >
              Just Ella.
            </motion.span>
          </motion.p>
        </div>

        {/* Section 2B — 20 Things About Ella */}
        <div className="text-center mb-16">
          <div className="inline-block relative">
            <h2 className="font-playfair text-[36px] sm:text-[48px] text-[#3D2C2C] mb-2">
              Twenty Things
            </h2>
            <div className="h-[1px] w-full bg-[#D4AF37]" aria-hidden="true" />
          </div>
          <p className="mt-4 font-jost italic text-[16px] text-[#C4687A]">
            In no particular order. All of them true.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {traits.map((trait, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ delay: (idx % 4) * 0.08, duration: 0.6 }}
              className="bg-[#FFFAF7] rounded-[24px] p-8 shadow-[0_8px_40px_rgba(196,104,122,0.12)] border border-[rgba(196,104,122,0.1)] flex flex-col h-full hover:shadow-[0_12px_50px_rgba(196,104,122,0.18)] transition-shadow duration-300"
            >
              <span className="font-cormorant text-[14px] text-[#D4AF37] opacity-60 mb-4 block">
                {String(idx + 1).padStart(2, '0')}
              </span>
              <h3 className="font-playfair text-[20px] text-[#C4687A] mb-3">
                {trait.name}
              </h3>
              <p className="font-jost text-[14px] text-[#3D2C2C] leading-[1.7] flex-grow">
                {trait.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Section 2C — Her Quote Block */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8 }}
          className="mt-32 w-full bg-[#F9E8E8] border border-[#E8D5A3] rounded-[24px] p-12 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.4)_0%,transparent_70%)] pointer-events-none" />
          <p className="relative z-10 font-cormorant italic text-[24px] sm:text-[36px] text-[#C4687A]">
            "There's a quiet strength in knowing exactly who you are, without needing to prove it to anyone."
          </p>
          <div className="relative z-10 mx-auto mt-8 h-8 w-8 opacity-60">
            <svg viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.5">
              <path d="M12 4v16M4 12h16" strokeLinecap="round" />
            </svg>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
