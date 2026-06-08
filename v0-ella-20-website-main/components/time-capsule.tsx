'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export function TimeCapsule() {
  const initialMessage = `Dear thirty-year-old Ella,

If you are reading this, the years have folded into a quiet, golden morning and you are exactly where I have always hoped you would be.

I wanted to leave you this message with all the tenderness I carry for you today: the way your laughter still feels like sunlight, the way your quiet strength has always made the world safer, and the way your heart continues to show up with more love than anyone could ask for.

I hope you remember the dreams that were still growing in your chest in 2026, the songs you played to calm yourself, the mornings when a simple cup of coffee felt like a promise. I hope the life you have now holds the people who ground you, the work that fills you, and the peace you deserve.

You are still my favorite story, Ella. I pray you have carried your kindness forward, stayed curious, and still believe that you are enough—not someday, but always.

On your thirtieth birthday, celebrate how far you have come, and never forget how deeply you are loved by the girl who wrote this.

With love from your younger self,
The one who is still falling for you every day.`

  const [message, setMessage] = useState(initialMessage)
  const [isSaved, setIsSaved] = useState(false)
  const [savedMessage, setSavedMessage] = useState<string | null>(null)
  const [emailStatus, setEmailStatus] = useState<string | null>(null)

  useEffect(() => {
    // Check local storage for existing capsule
    const existing = localStorage.getItem('ella_time_capsule')
    if (existing) {
      setIsSaved(true)
      setSavedMessage(existing)
    }
  }, [])

  const handleSave = async () => {
    if (!message.trim()) return
    localStorage.setItem('ella_time_capsule', message)
    setSavedMessage(message)
    setIsSaved(true)

    try {
      const response = await fetch('/api/time-capsule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      })

      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Email failed')

      setEmailStatus('Email triggered to contehfavour51@gmail.com')
    } catch (error) {
      console.error('Time capsule email error', error)
      setEmailStatus('Email trigger failed. Check server configuration.')
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="w-full max-w-2xl mx-auto mt-24 mb-16 bg-[#2C1A1A] rounded-[24px] p-8 sm:p-12 text-center text-white border border-[#D4AF37]/30 shadow-2xl relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')] opacity-20" />
      
      <div className="relative z-10">
        <div className="mx-auto w-16 h-16 mb-6 rounded-full bg-[#D4AF37]/20 flex items-center justify-center border border-[#D4AF37]/50">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        </div>

        <h3 className="font-playfair text-[28px] text-[#FDF8F3] mb-2">
          The Time Capsule
        </h3>
        <p className="font-jost text-[14px] text-[#E8D5A3] mb-8 uppercase tracking-[0.1em]">
          Locked until June 4, 2036
        </p>

        {!isSaved ? (
          <div className="space-y-6">
            <p className="font-jost text-[16px] text-white/80 leading-relaxed max-w-md mx-auto">
              Write something for the 30-year-old version of her. It will be sealed and hidden until exactly 10 years from today.
            </p>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Dear 30-year-old Ella..."
              className="w-full h-40 bg-[#FFFAF7]/5 border border-[#D4AF37]/30 rounded-xl p-4 text-[#FDF8F3] font-jost focus:outline-none focus:border-[#D4AF37] transition-colors resize-none placeholder:text-white/30"
            />
            <button
              onClick={handleSave}
              className="px-8 py-3 bg-[#D4AF37] text-[#2C1A1A] font-jost font-medium rounded-full hover:bg-[#E8D5A3] transition-colors"
            >
              Seal Capsule
            </button>
          </div>
        ) : (
          <div className="space-y-4 py-8">
            <p className="font-cormorant italic text-[24px] text-[#C4687A]">
              Message sealed securely.
            </p>
            <p className="font-jost text-[16px] text-white/60">
              She will receive an email notification on her 30th birthday.
            </p>
            {emailStatus && (
              <p className="font-jost text-[14px] text-[#D4AF37]">
                {emailStatus}
              </p>
            )}
          </div>
        )}
      </div>
    </motion.div>
  )
}
