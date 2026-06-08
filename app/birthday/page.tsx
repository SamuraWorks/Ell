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
import { Section } from '@/components/section'
import { PhotoGallery } from '@/components/photo-gallery'

import birthdayData from '@/data/birthday.json'
import ellaData from '@/data/ella.json'
import galleryData from '@/data/gallery.json'
import messagesData from '@/data/messages.json'
import { isAnniversaryUnlocked } from '@/lib/unlock'
import { useRouter } from 'next/navigation'

export default function BirthdayExperience() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [anniversaryOpen, setAnniversaryOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
    setAnniversaryOpen(isAnniversaryUnlocked())
    window.scrollTo(0, 0)
  }, [])

  if (!mounted) return null

  // Process traits from ellaData into the format needed by TraitsGrid
  // (Assuming data/ella.json has been updated with objects or we map strings if not yet)
  const traits = ellaData.traits.map(t => typeof t === 'string' ? { name: t, description: 'You carry this with quiet grace.' } : t)
  const heroPhotoUrl = '/gallery/hero.jpg'

  return (
    <main className="relative min-h-screen w-full bg-background selection:bg-[#C4687A]/20">
      <CustomCursor />
      <ScrollProgressBar />
      <ChapterNav />

      {/* Chapter 1: Cinematic Welcome */}
      <CinematicIntro photoUrl={heroPhotoUrl} />

      {/* Chapter 2: Who She Is */}
      <TraitsGrid traits={birthdayData.traits || traits.slice(0, 20)} />

      {/* Chapter 2.5: Funny Moments */}
      <Section eyebrow="Funny moments" title="Funny moments">
        <PhotoGallery photos={galleryData.funnyMoments || []} />
      </Section>

      {/* Chapter 3: The Gallery */}
      <BirthdayGallery sections={galleryData.birthdaySections} />

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
