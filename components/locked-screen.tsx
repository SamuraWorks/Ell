'use client'

import Link from 'next/link'
import { Lock } from 'lucide-react'

export function LockedScreen({
  title,
  unlockLabel,
}: {
  title: string
  unlockLabel: string
}) {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-pink-soft via-background to-pink px-6 py-16 text-center">
      <div className="flex w-full max-w-md flex-col items-center gap-6">
        <span className="flex h-14 w-14 items-center justify-center rounded-full border border-gold-soft/50 bg-card/70 text-gold shadow-sm">
          <Lock className="h-6 w-6" aria-hidden="true" />
        </span>
        <h1 className="text-balance font-heading text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          {title}
        </h1>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {unlockLabel}
        </p>
        <div className="h-px w-12 bg-gold-soft" aria-hidden="true" />
        <Link
          href="/"
          className="rounded-full border border-gold-soft/50 bg-card/70 px-6 py-2 text-sm text-foreground transition-colors hover:bg-accent"
        >
          Back to home
        </Link>
      </div>
    </main>
  )
}
