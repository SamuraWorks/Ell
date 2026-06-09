import { Play } from 'lucide-react'
import { FadeIn } from '@/components/fade-in'

type Video = { title: string; src?: string }

export function VideoGrid({ videos }: { videos: Video[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {videos.map((video, i) => (
        <FadeIn key={video.title + i} delay={i * 80}>
          <figure className="overflow-hidden rounded-2xl border border-gold-soft/30 bg-card shadow-sm">
            <div className="relative aspect-video w-full bg-pink-soft/60">
              {video.src ? (
                <video controls preload="none" playsInline className="h-full w-full object-contain bg-black">
                  <source src={video.src} type="video/mp4" />
                  {'Your browser does not support the video element.'}
                </video>
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-card/80 text-gold shadow-sm">
                    <Play className="h-5 w-5" aria-hidden="true" />
                  </span>
                </div>
              )}
            </div>
            <figcaption className="px-3 py-2 text-center text-xs text-muted-foreground">
              {video.title}
            </figcaption>
          </figure>
        </FadeIn>
      ))}
    </div>
  )
}
