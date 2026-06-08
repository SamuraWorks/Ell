'use client'

import { useRef, useState } from 'react'
import { FadeIn } from './fade-in'

export function MusicControl({
  buttonText,
  description,
  audioSrc,
}: {
  buttonText: string
  description: string
  audioSrc?: string
}) {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const toggleMusic = () => {
    if (!audioSrc || !audioRef.current) {
      setIsPlaying(!isPlaying)
      return
    }

    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      audioRef.current.play().catch(() => {
        setIsPlaying(false)
      })
      setIsPlaying(true)
    }
  }

  return (
    <FadeIn
      as="section"
      className="w-full px-6 py-12"
    >
      <div className="mx-auto max-w-md text-center">
        <button
          onClick={toggleMusic}
          className="mx-auto px-6 py-3 rounded-full border-2 border-gold/50 bg-gold/10 backdrop-blur-sm text-lg font-semibold text-gold hover:bg-gold/20 hover:border-gold transition-all duration-300 hover:shadow-[0_0_30px_rgba(219,164,102,0.3)]"
        >
          {isPlaying ? '⏸️ Pause music' : buttonText}
        </button>
        <p className="mt-4 text-sm text-gold-soft/70 italic">
          {description}
        </p>
        {audioSrc ? (
          <audio ref={audioRef} src={audioSrc} preload="none" />
        ) : null}
      </div>
    </FadeIn>
  )
}
