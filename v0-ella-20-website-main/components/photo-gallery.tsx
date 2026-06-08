import Image from 'next/image'
import { FadeIn } from '@/components/fade-in'

type Photo = { src: string; caption?: string }

export function PhotoGallery({ photos }: { photos: Photo[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
      {photos.map((photo, i) => (
        <FadeIn key={photo.src + i} delay={(i % 3) * 80}>
          <figure className="group overflow-hidden rounded-2xl border border-gold-soft/30 bg-card shadow-sm">
            <div className="relative aspect-square w-full overflow-hidden">
              <Image
                src={photo.src || '/placeholder.svg'}
                alt={photo.caption || 'A memory'}
                fill
                sizes="(max-width: 640px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
            </div>
            {photo.caption && (
              <figcaption className="px-3 py-2 text-center text-xs text-muted-foreground">
                {photo.caption}
              </figcaption>
            )}
          </figure>
        </FadeIn>
      ))}
    </div>
  )
}
