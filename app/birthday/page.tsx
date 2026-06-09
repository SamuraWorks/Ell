'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { CinematicIntro } from '@/components/cinematic-intro'
import { TraitsGrid } from '@/components/traits-grid'
import { BirthdayGallery } from '@/components/birthday-gallery'
import { BirthdayTimeline } from '@/components/birthday-timeline'
import { NicknameCards } from '@/components/nickname-cards'
import { AudioCard } from '@/components/audio-card'
import { EnvelopeLetter } from '@/components/envelope-letter'
import { AspirationPanels } from '@/components/aspiration-panels'
import { TimeCapsule } from '@/components/time-capsule'
import { ChapterNav } from '@/components/chapter-nav'
import { ScrollProgressBar } from '@/components/progress-bar'
import { CustomCursor } from '@/components/custom-cursor'
import { SealedDoor } from '@/components/sealed-door'
import { BirthdayLock } from '@/components/birthday-lock'

import birthdayData from '@/data/birthday.json'
import ellaData from '@/data/ella.json'
import galleryData from '@/data/gallery.json'
import messagesData from '@/data/messages.json'
import { isAnniversaryUnlocked } from '@/lib/unlock'
import { validateSections } from '@/lib/content-schema'
import type { ContentSection } from '@/lib/content-schema'
import { useRouter } from 'next/navigation'

export default function BirthdayExperience() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [anniversaryOpen, setAnniversaryOpen] = useState(false)
  const [isLocked, setIsLocked] = useState(true)

  useEffect(() => {
    setMounted(true)
    setAnniversaryOpen(isAnniversaryUnlocked())
    window.scrollTo(0, 0)

    const checkLockStatus = () => {
      const now = new Date()
      const year = now.getFullYear()
      const unlockDate = new Date(year, 5, 20, 0, 0, 0) // June 20, 12:00 AM (Month 5 is June)
      if (now.getTime() >= unlockDate.getTime()) {
        setIsLocked(false)
      } else {
        setIsLocked(true)
      }
    }

    checkLockStatus()
    const interval = setInterval(checkLockStatus, 1000)
    return () => clearInterval(interval)
  }, [])

  if (!mounted) return null

  if (isLocked) {
    return <BirthdayLock onUnlock={() => setIsLocked(false)} />
  }

  // Process traits from ellaData into the format needed by TraitsGrid
  const traits = ellaData.traits.map(t =>
    typeof t === 'string' ? { name: t, description: 'You carry this with quiet grace.' } : t
  )
  const heroPhotoUrl = '/gallery/hero.jpg'

  /**
   * Birthday gallery sections — each section explicitly owns its own items array.
   * The separate `galleryData.funnyMoments` flat array is intentionally NOT used here;
   * the "Funny Moments" section in birthdaySections owns its assets directly.
   *
   * `validateSections` will:
   *  - Deduplicate section titles (guards against "Funny Moments" appearing twice)
   *  - Replace any missing/empty src with a placeholder and log it to the console
   *  - Warn on asset-count mismatches
   */
  const birthdaySections = validateSections(
    (galleryData.birthdaySections as ContentSection[])
  )

  return (
    <main className="relative min-h-screen w-full bg-background selection:bg-[#C4687A]/20">
      <CustomCursor />
      <ScrollProgressBar />
      <ChapterNav />

      {/* Chapter 1: Cinematic Welcome */}
      <CinematicIntro photoUrl={heroPhotoUrl} />

      {/* Chapter 2: Who She Is */}
      <TraitsGrid traits={birthdayData.traits || traits.slice(0, 20)} />

      {/* Chapter 3: The Gallery
          NOTE: "Funny Moments" is section #7 inside birthdaySections — rendered once here.
          The old standalone <Section eyebrow="Funny moments"> has been removed to prevent
          the section appearing twice. */}
      <BirthdayGallery sections={birthdaySections} />

      {/* Chapter 4: Our Story (Timeline) */}
      <div id="chapter-story" className="bg-[#F9E8E8] py-24">
        <BirthdayTimeline items={birthdayData.timeline} />
      </div>

      {/* Chapter 5: Our Language (Nicknames) */}
      <NicknameCards nicknames={birthdayData.nicknames || ellaData.language} />

      {/* Chapter 6: Voices for Ella */}
      <section id="chapter-voices" className="bg-[#FFFAF7] px-6 py-32 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_left,rgba(249,232,232,0.6)_0%,transparent_50%)] pointer-events-none" />
        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="font-playfair text-[36px] sm:text-[48px] text-[#3D2C2C] mb-4">
              Voices for you
            </h2>
            <div className="h-[1px] w-24 bg-[#D4AF37] mx-auto" />
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {messagesData.messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <AudioCard message={msg} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Chapter 7: The Birthday Letter */}
      <EnvelopeLetter
        opening={birthdayData.letter.opening}
        paragraphs={birthdayData.letter.paragraphs}
        prayers={birthdayData.letter.prayers}
        careerGoals={birthdayData.letter.careerGoals}
        wishes={birthdayData.letter.wishes}
        href="/birthday/letter"
        buttonText="Read the full birthday letter"
      />

      {/* Chapter 8: Her Next Chapter */}
      <AspirationPanels
        dreams={birthdayData.aspirations?.dreams || ["Keep choosing what feels true.", "Your calm is a strength."]}
        promises={birthdayData.aspirations?.promises || ["I will always be in your corner.", "I will listen when you need quiet."]}
        reminder={birthdayData.aspirations?.reminder || "The world has not yet seen what you are capable of."}
      />

      {/* Time Capsule */}
      <div className="bg-gradient-to-b from-[#F5E6C8] to-[#FDF8F3] pt-12 pb-32 px-6">
        <TimeCapsule />
      </div>

      {/* Anniversary Teaser / Sealed Door */}
      <div id="chapter-anniversary-teaser">
        <SealedDoor onOpen={() => router.push('/anniversary')} />
      </div>

    </main>
  )
}
