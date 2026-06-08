'use client'

import { useEffect, useState } from 'react'

interface Chapter {
  id: string
  label: string
}

const CHAPTERS: Chapter[] = [
  { id: 'chapter-welcome',   label: 'Welcome' },
  { id: 'chapter-ella',      label: 'Who You Are' },
  { id: 'chapter-gallery',   label: 'Gallery' },
  { id: 'chapter-story',     label: 'Our Story' },
  { id: 'chapter-language',  label: 'Our Language' },
  { id: 'chapter-voices',    label: 'Voices' },
  { id: 'chapter-letter',    label: 'Letter' },
  { id: 'chapter-future',    label: 'Next Chapter' },
]

export function ChapterNav() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const els = CHAPTERS.map(c => document.getElementById(c.id))

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const idx = els.findIndex(el => el === entry.target)
            if (idx !== -1) setActive(idx)
          }
        })
      },
      { rootMargin: '-40% 0px -40% 0px', threshold: 0 }
    )

    els.forEach(el => el && observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav
      className="fixed right-5 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-3"
      aria-label="Chapter navigation"
    >
      {CHAPTERS.map((ch, i) => (
        <button
          key={ch.id}
          onClick={() => scrollTo(ch.id)}
          title={ch.label}
          aria-label={`Go to ${ch.label}`}
          className="group relative flex items-center justify-end"
        >
          {/* Tooltip label */}
          <span className="absolute right-7 whitespace-nowrap rounded-full bg-[#2C1A1A]/80 px-3 py-1 text-xs text-white opacity-0 transition-all duration-200 group-hover:opacity-100 font-jost tracking-wide pointer-events-none">
            {ch.label}
          </span>
          {/* Dot */}
          <span
            className="block rounded-full transition-all duration-300"
            style={{
              width:  i === active ? '10px' : '6px',
              height: i === active ? '10px' : '6px',
              background: i === active ? '#C4687A' : 'rgba(196,104,122,0.35)',
              boxShadow: i === active ? '0 0 0 3px rgba(196,104,122,0.2)' : 'none',
            }}
          />
        </button>
      ))}
    </nav>
  )
}
