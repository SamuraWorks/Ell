'use client'

import { useEffect, useRef } from 'react'

export function ScrollProgressBar() {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const bar = barRef.current
    if (!bar) return

    const update = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
      bar.style.width = `${pct}%`
    }

    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 z-[9998] h-[2px] bg-transparent">
      <div
        ref={barRef}
        className="h-full bg-gradient-to-r from-[#C4687A] to-[#D4AF37] transition-[width] duration-100"
        style={{ width: '0%' }}
        aria-hidden="true"
      />
    </div>
  )
}
