import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { FadeIn } from '@/components/fade-in'

export function Section({
  eyebrow,
  title,
  children,
  className,
  center,
}: {
  eyebrow?: string
  title?: string
  children: ReactNode
  className?: string
  center?: boolean
}) {
  return (
    <section
      className={cn(
        'flex min-h-screen w-full flex-col justify-center px-6 py-20 sm:px-10',
        className,
      )}
    >
      <div
        className={cn(
          'mx-auto w-full max-w-3xl',
          center && 'flex flex-col items-center text-center',
        )}
      >
        {(eyebrow || title) && (
          <FadeIn className="mb-10">
            {eyebrow && (
              <p className="mb-3 text-xs uppercase tracking-[0.3em] text-gold">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="text-balance font-heading text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
                {title}
              </h2>
            )}
          </FadeIn>
        )}
        {children}
      </div>
    </section>
  )
}
