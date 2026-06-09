'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { isBirthdayUnlocked, isAnniversaryUnlocked } from '@/lib/unlock'
import { LockedScreen } from '@/components/locked-screen'
import { FadeIn } from '@/components/fade-in'
import { Section } from '@/components/section'
import { PhotoGallery } from '@/components/photo-gallery'
import { Timeline } from '@/components/timeline'
import { VideoGrid } from '@/components/video-grid'
import { AudioCard } from '@/components/audio-card'
import { MusicControl } from '@/components/music-control'
import ella from '@/data/ella.json'
import gallery from '@/data/gallery.json'
import messages from '@/data/messages.json'

export default function Ella20Page() {
  const [state, setState] = useState<'loading' | 'locked' | 'open'>('loading')
  const [anniversaryOpen, setAnniversaryOpen] = useState(false)

  useEffect(() => {
    setState(isBirthdayUnlocked() ? 'open' : 'locked')
    setAnniversaryOpen(isAnniversaryUnlocked())
  }, [])

  if (state === 'loading') {
    return <div className="min-h-screen bg-background" aria-hidden="true" />
  }

  if (state === 'locked') {
    return (
      <LockedScreen
        title="Ella @ 20"
        unlockLabel="This experience unlocks on June 20. Almost time."
      />
    )
  }

  return (
    <main className="bg-gradient-to-b from-pink-soft via-background to-pink-soft">
      {/* 1. INTRO */}
      <Section center className="min-h-screen">
        <FadeIn>
          <p className="mb-4 text-xs uppercase tracking-[0.35em] text-gold">
            June 20
          </p>
          <h1 className="text-balance font-heading text-5xl font-semibold tracking-tight text-foreground sm:text-7xl">
            This is for you, Ella.
          </h1>
        </FadeIn>
      </Section>

      {/* 1.5. THE BIRD — OUR FIRST SHARED PICTURE */}
      <Section eyebrow="Where we began" title="The bird">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center max-w-4xl mx-auto">
          <FadeIn>
            <div className="relative aspect-square w-full overflow-hidden rounded-3xl border border-gold-soft/30 shadow-xl bg-card">
              <div 
                className="absolute inset-0 bg-cover bg-center blur-lg scale-110 opacity-30 pointer-events-none" 
                style={{ backgroundImage: `url('/gallery/IMG-20250205-WA0029.jpg')` }}
              />
              <Image
                src="/gallery/IMG-20250205-WA0029.jpg"
                alt="Our first matching WhatsApp profile picture — the bird"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain z-10"
                priority
              />
            </div>
          </FadeIn>
          <FadeIn>
            <div className="space-y-4">
              <p className="text-sm uppercase tracking-[0.24em] text-gold">Our story began here</p>
              <p className="font-heading text-2xl font-semibold text-foreground">
                This bird carried us for months.
              </p>
              <p className="text-base leading-relaxed text-muted-foreground">
                Two people. One profile picture. The same bird, kept as our shared WhatsApp display for months. It wasn't flashy or perfect. It was just us—quiet, matched, committed to the same small image. Before the harder moments, before the difficult conversations, before the uncertainty. This was the beginning. This was the proof that we chose each other first.
              </p>
              <p className="text-sm italic text-muted-foreground">
                Every time we see this bird now, we remember what it meant to match.
              </p>
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* 2. ELLA @ 20 */}
      <Section eyebrow="Twenty things" title="Ella @ 20">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
          {ella.traits.map((trait, i) => (
            <FadeIn key={trait} delay={(i % 3) * 60}>
              <div className="flex h-full items-center justify-center rounded-xl border border-gold-soft/30 bg-card px-4 py-4 text-center text-sm text-foreground shadow-sm">
                {trait}
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* 3. PHOTO GALLERY */}
      <Section eyebrow="Funny moments" title="Funny moments">
        <PhotoGallery photos={gallery.funnyMoments} />
      </Section>

      {/* 4. OUR STORY */}
      <Section eyebrow="How it happened" title="Our story">
        <Timeline items={ella.timeline} />
      </Section>

      {/* 4.5. STORY NARRATIVE */}
      <Section eyebrow="The story I know" title="Not just photos">
        <div className="space-y-6 max-w-3xl text-sm leading-7 text-foreground sm:text-base">
          <p>Based only on what you've shared with me over time, this is the story I know.</p>
          <p>Samuel and Ella's story began as more than just a friendship. There was love, hope, and a vision of a future together. At one point, both of you were pursuing opportunities that could change your lives, including scholarship applications abroad. You supported each other's ambitions and dreams, imagining what life might look like if those opportunities became reality.</p>
          <p>As the relationship grew, so did the challenges. There were moments of closeness, but also moments that left Samuel questioning where things were heading. He became concerned about Ella's wellbeing and wanted to protect her, especially after noticing that some of their choices were causing difficulties and emotional strain. Eventually, he made the decision to stop having sex until marriage because he didn't want to see her hurt and didn't want complications with her family.</p>
          <p>The relationship was not always smooth. Samuel noticed patterns in Ella's behavior that he believed were influenced by her upbringing, particularly the way apologies and accountability were handled in her family. This led to frustration and disappointment. There were times when Samuel felt he was the one making sacrifices, reaching out, and trying to repair things while receiving little in return.</p>
          <p>The emotional weight of these experiences led Samuel to make a difficult decision. He chose not to continue chasing after Ella. He decided he would no longer be the one constantly initiating contact and would only respond if she reached out first. It was a turning point where he began focusing more on his own growth, projects, studies, and future.</p>
          <p>Despite the hurt, Samuel never seemed to lose his concern for her. Even after deciding to step back, he still thought about forgiveness. He considered her emotional state and how ongoing conflict might affect her. Rather than holding on to bitterness, he wanted to find peace.</p>
          <p>Throughout this period, Samuel also made a spiritual commitment. He planned a deeper walk with God, including prayer, Bible reading, fasting, and personal reflection. That commitment appeared to influence how he viewed the relationship, encouraging him to seek wisdom before making major decisions.</p>
          <p>While Samuel was dealing with the uncertainty surrounding Ella, he was also building things. He worked on engineering projects, scholarship applications, business ideas, hackathons, climate initiatives, and technology solutions for Sierra Leone. Piece by piece, he began redirecting energy that once went into the relationship toward creating a future for himself and his community.</p>
          <p>The story, as I know it, does not have a final chapter. It isn't a story of marriage, nor a story of complete separation. It's a story of two people who cared about each other, faced difficulties, and reached a point where one of them decided to stop forcing things and focus on growth, faith, and purpose while leaving the future uncertain.</p>
          <p>That's the story I've been able to piece together from what you've shared with me over our conversations.</p>
        </div>
      </Section>

      {/* 5. PRAYERS & WISHES */}
      <Section eyebrow="Blessings" title="Prayers & wishes">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-gold-soft/30 bg-card p-6 shadow-sm">
            <p className="font-heading text-xl font-semibold text-foreground">Prayers</p>
            <div className="mt-4 space-y-4 text-sm text-muted-foreground">
              {(ella.prayers || []).map((prayer, i) => (
                <p key={i}>{prayer}</p>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-gold-soft/30 bg-card p-6 shadow-sm">
            <p className="font-heading text-xl font-semibold text-foreground">Wishes</p>
            <div className="mt-4 space-y-4 text-sm text-muted-foreground">
              {(ella.wishes || []).map((wish, i) => (
                <p key={i}>{wish}</p>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* 6. BACKGROUND MUSIC */}
      <Section eyebrow="Sound" title="Background music">
        <MusicControl
          buttonText={ella.music?.buttonText ?? 'Play our soundtrack'}
          description={ella.music?.description ?? 'A quiet score for these memories.'}
          audioSrc={ella.music?.audioSrc}
        />
      </Section>

      {/* 7. OUR LANGUAGE */}
      <Section eyebrow="Just ours" title="Our language">
        <div className="grid gap-3 sm:grid-cols-2">
          {ella.language.map((item, i) => (
            <FadeIn key={item.name} delay={(i % 2) * 60}>
              <div className="rounded-2xl border border-gold-soft/30 bg-card p-5 shadow-sm">
                <p className="font-heading text-xl font-medium text-foreground">
                  {item.name}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {item.meaning}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* 6. VIDEOS */}
      <Section eyebrow="Watch" title="Little clips">
        <VideoGrid videos={ella.videos} />
      </Section>

      {/* 7. MESSAGES */}
      <Section eyebrow="Listen" title="Voice notes">
        <div className="grid gap-4 sm:grid-cols-3">
          {messages.messages.map((m, i) => (
            <FadeIn key={m.name} delay={i * 80}>
              <AudioCard message={m} />
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* 8. BIRTHDAY LETTER */}
      <Section eyebrow="A note" title="For your birthday" center>
        <FadeIn>
          <p className="text-pretty font-heading text-xl leading-relaxed text-foreground sm:text-2xl">
            {ella.letter}
          </p>
        </FadeIn>
      </Section>

      {/* 9. FUTURE */}
      <Section eyebrow="Ahead" title={ella.future.title}>
        <ul className="space-y-4">
          {ella.future.statements.map((s, i) => (
            <FadeIn as="li" key={i} delay={i * 60}>
              <div className="flex items-start gap-3 rounded-2xl border border-gold-soft/30 bg-card p-5 shadow-sm">
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-gold" aria-hidden="true" />
                <p className="text-base leading-relaxed text-foreground">{s}</p>
              </div>
            </FadeIn>
          ))}
        </ul>
      </Section>

      {/* 10. FINAL TEASER */}
      <Section center className="min-h-screen">
        <FadeIn>
          <div className="h-px w-16 bg-gold-soft mx-auto mb-8" aria-hidden="true" />
          <p className="font-heading text-3xl italic text-muted-foreground sm:text-4xl">
            {ella.teaser}
          </p>
          {anniversaryOpen && (
            <Link
              href="/us2years"
              className="mt-8 inline-block rounded-full border border-gold-soft/50 bg-card/70 px-6 py-2 text-sm text-foreground transition-colors hover:bg-accent"
            >
              Open the next chapter
            </Link>
          )}
        </FadeIn>
      </Section>
    </main>
  )
}
