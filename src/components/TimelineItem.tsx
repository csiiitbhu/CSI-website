import PlaceholderImage from './PlaceholderImage'
// Items alternate sides on desktop; stacked on mobile.
export default function TimelineItem({ month, title, description, flip }: { month: string; title: string; description: string; flip: boolean }) {
  return (
    <li className="relative grid gap-4 pl-16 md:grid-cols-2 md:gap-16 md:pl-0">
      <span className="absolute left-0 top-0 flex size-12 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground shadow-soft md:left-1/2 md:-translate-x-1/2">{month}</span>
      <PlaceholderImage label="Photo" className={`h-44 ${flip ? 'md:order-2' : ''}`} />
      <div className={`self-center ${flip ? 'md:order-1 md:text-right' : ''}`}>
        <h3 className="text-xl font-semibold text-primary">{title}</h3>
        <p className="mt-2 text-muted-foreground">{description}</p>
      </div>
    </li>
  )
}
