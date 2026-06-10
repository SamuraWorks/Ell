'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import birthdayData from '@/data/birthday.json'
import { isBirthdayPasswordOk } from '@/lib/unlock'
import { BirthdayLock } from '@/components/birthday-lock'

export default function BirthdayLetterPage() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [isLocked, setIsLocked] = useState(true)

  useEffect(() => {
    setMounted(true)
    const checkLockStatus = () => {
      if (!isBirthdayPasswordOk()) {
        setIsLocked(true)
      } else {
        setIsLocked(false)
      }
    }
    checkLockStatus()
    const interval = setInterval(checkLockStatus, 1000)
    return () => clearInterval(interval)
  }, [])

  const letter = birthdayData.letter

  if (!mounted) return null

  if (isLocked) {
    return <BirthdayLock onUnlock={() => setIsLocked(false)} />
  }

  return (
    <main className="min-h-screen bg-[#FDF8F3] px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/birthday"
          className="text-sm uppercase tracking-[0.28em] text-[#8B6E6E] transition hover:text-[#C4687A]"
        >
          ← Back to your birthday page
        </Link>

        <section className="mt-8 rounded-[32px] border border-[#E8D5A3] bg-white p-10 shadow-[0_20px_80px_rgba(212,175,55,0.14)]">
          <div className="mb-12 text-center">
            <p className="font-playfair text-[#D4AF37] text-sm uppercase tracking-[0.28em]">Full birthday letter</p>
            <h1 className="mt-4 font-playfair text-[42px] sm:text-[52px] text-[#3D2C2C]">For my Fay Fay</h1>
            <p className="mt-4 max-w-2xl mx-auto text-[#8B6E6E] text-base leading-relaxed">
              Every word is given space here so the letter can be read fully, slowly, with room to breathe.
            </p>
          </div>

          <div className="space-y-10">
            <div className="space-y-6 text-[#3D2C2C] text-base leading-relaxed">
              <p className="font-dancing text-[24px] leading-[1.8]">{letter.opening}</p>
              {letter.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              {letter.prayers && (
                <div className="rounded-[24px] border border-[#F5E6E7] bg-[#FEF7F5] p-6">
                  <h2 className="font-playfair text-[22px] text-[#C4687A] mb-4">Prayers</h2>
                  <div className="space-y-4 text-sm leading-relaxed text-[#3D2C2C]">
                    {letter.prayers.map((item, index) => (
                      <p key={index}>{item}</p>
                    ))}
                  </div>
                </div>
              )}

              {letter.careerGoals && (
                <div className="rounded-[24px] border border-[#F5E6E7] bg-[#F9F1E9] p-6">
                  <h2 className="font-playfair text-[22px] text-[#D4AF37] mb-4">Career goals</h2>
                  <div className="space-y-4 text-sm leading-relaxed text-[#3D2C2C]">
                    {letter.careerGoals.map((item, index) => (
                      <p key={index}>{item}</p>
                    ))}
                  </div>
                </div>
              )}

              {letter.wishes && (
                <div className="rounded-[24px] border border-[#F5E6E7] bg-[#FFF8F3] p-6">
                  <h2 className="font-playfair text-[22px] text-[#3D2C2C] mb-4">Wishes</h2>
                  <div className="space-y-4 text-sm leading-relaxed text-[#3D2C2C]">
                    {letter.wishes.map((item, index) => (
                      <p key={index}>{item}</p>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="text-right text-[#3D2C2C] font-semibold">Love, your person.</div>
          </div>
        </section>
      </div>
    </main>
  )
}
