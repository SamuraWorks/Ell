'use client'

import { useEffect, useRef, useState } from 'react'

interface WaxSealProps {
  onCrack?: () => void
  shouldCrack?: boolean
  size?: number
  pulse?: boolean
}

export function WaxSeal({ onCrack, shouldCrack = false, size = 120, pulse = true }: WaxSealProps) {
  const [cracking, setCracking] = useState(false)
  const [cracked, setCracked] = useState(false)

  useEffect(() => {
    if (shouldCrack && !cracking && !cracked) {
      setCracking(true)
      setTimeout(() => {
        setCracked(true)
        onCrack?.()
      }, 1200)
    }
  }, [shouldCrack, cracking, cracked, onCrack])

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      {/* Outer pulse ring */}
      {pulse && !cracked && (
        <div
          className="absolute inset-0 rounded-full"
          style={{
            animation: 'wax-glow 3s ease-in-out infinite',
            borderRadius: '50%',
          }}
          aria-hidden="true"
        />
      )}

      {/* Seal SVG */}
      <svg
        viewBox="0 0 100 100"
        width={size}
        height={size}
        className="relative z-10"
        style={{
          animation: cracking
            ? 'wax-crack 1.2s ease-in-out forwards'
            : pulse ? 'breathe 6s ease-in-out infinite' : 'none',
          opacity: cracked ? 0 : 1,
          transition: 'opacity 0.3s',
        }}
        aria-label="Wax seal"
      >
        {/* Seal body */}
        <polygon
          points="50,5 61,35 95,35 68,57 79,91 50,70 21,91 32,57 5,35 39,35"
          fill="#C4687A"
          stroke="#D4AF37"
          strokeWidth="1.5"
        />
        {/* Inner ring */}
        <circle cx="50" cy="50" r="22" fill="none" stroke="#D4AF37" strokeWidth="1" opacity="0.7" />
        {/* Letter E */}
        <text
          x="50"
          y="57"
          textAnchor="middle"
          fill="#FFFAF7"
          fontSize="22"
          fontFamily="Georgia, serif"
          fontWeight="bold"
          opacity="0.9"
        >
          E
        </text>
      </svg>
    </div>
  )
}
