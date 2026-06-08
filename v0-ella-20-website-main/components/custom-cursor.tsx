'use client'

import { useEffect, useRef } from 'react'

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return
    let raf: number

    const move = (e: MouseEvent) => {
      raf && cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        cursor.style.transform = `translate(${e.clientX - 16}px, ${e.clientY - 16}px)`
      })
    }

    const show = () => { cursor.style.opacity = '1' }
    const hide = () => { cursor.style.opacity = '0' }

    window.addEventListener('mousemove', move)
    document.addEventListener('mouseenter', show)
    document.addEventListener('mouseleave', hide)

    return () => {
      window.removeEventListener('mousemove', move)
      document.removeEventListener('mouseenter', show)
      document.removeEventListener('mouseleave', hide)
      raf && cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed left-0 top-0 z-[9999] h-8 w-8 rounded-full opacity-0 transition-opacity duration-200 hidden md:block"
      style={{
        background: 'radial-gradient(circle, rgba(196,104,122,0.5) 0%, rgba(196,104,122,0.15) 60%, transparent 100%)',
        border: '1px solid rgba(196,104,122,0.4)',
        backdropFilter: 'blur(2px)',
      }}
      aria-hidden="true"
    />
  )
}
