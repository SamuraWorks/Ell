'use client'

import { useEffect, useRef } from 'react'

const START_AT = 3 // seconds trimmed from the front

export function VideoHero() {
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = ref.current
    if (!video) return

    const seekToStart = () => {
      if (video.currentTime < START_AT) {
        video.currentTime = START_AT
      }
    }

    // Skip the first 3 seconds on load and whenever it loops back.
    const handleLoaded = () => {
      video.currentTime = START_AT
      video.play().catch(() => {})
    }
    const handleTimeUpdate = () => {
      if (video.currentTime < START_AT - 0.05) {
        video.currentTime = START_AT
      }
    }

    video.addEventListener('loadedmetadata', handleLoaded)
    video.addEventListener('seeked', seekToStart)
    video.addEventListener('timeupdate', handleTimeUpdate)

    return () => {
      video.removeEventListener('loadedmetadata', handleLoaded)
      video.removeEventListener('seeked', seekToStart)
      video.removeEventListener('timeupdate', handleTimeUpdate)
    }
  }, [])

  return (
    <video
      ref={ref}
      className="absolute inset-0 h-full w-full object-cover"
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      aria-hidden="true"
    >
      <source src="/home-video.mp4" type="video/mp4" />
    </video>
  )
}
