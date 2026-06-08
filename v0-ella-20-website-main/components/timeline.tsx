import { FadeIn } from '@/components/fade-in'

type Item = { title: string; text: string }

export function Timeline({ items }: { items: Item[] }) {
  return (
    <ol className="relative ml-3 border-l border-gold-soft/50">
      {items.map((item, i) => (
        <FadeIn as="li" key={item.title + i} delay={i * 60} className="mb-8 pl-6 last:mb-0">
          <span
            className="absolute -left-[7px] mt-1.5 h-3.5 w-3.5 rounded-full border-2 border-gold bg-background"
            aria-hidden="true"
          />
          <h3 className="font-heading text-xl font-medium text-foreground">
            {item.title}
          </h3>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
            {item.text}
          </p>
        </FadeIn>
      ))}
    </ol>
  )
}
