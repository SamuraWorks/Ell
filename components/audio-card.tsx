import { Mic } from 'lucide-react'

type Message = {
  from: string
  name: string
  note?: string
  src?: string
}

export function AudioCard({ message }: { message: Message }) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-gold-soft/30 bg-card p-5 shadow-sm">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-pink-soft text-gold">
          <Mic className="h-5 w-5" aria-hidden="true" />
        </span>
        <div>
          <p className="font-heading text-lg font-medium text-foreground">
            {message.from}
          </p>
          {message.note && (
            <p className="text-xs text-muted-foreground">{message.note}</p>
          )}
        </div>
      </div>
      {message.src ? (
        <audio controls preload="none" className="w-full">
          <source src={message.src} />
          {'Your browser does not support the audio element.'}
        </audio>
      ) : (
        <div className="rounded-3xl border border-gold-soft/40 bg-pink-soft/70 px-4 py-5 text-center text-sm text-foreground/80 shadow-sm shadow-pink-soft/20">
          {message.note || 'A soft message, just for you.'}
        </div>
      )}
    </div>
  )
}
