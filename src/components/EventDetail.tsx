import { MapPin, Calendar, Clock, ArrowUp } from 'lucide-react'
import { categoryColor, isUpcoming, type CsiEvent } from '../data/events'

// Full write-up for one event. The id is the anchor the orbit scrolls to.
export default function EventDetail({ ev, index, flash, onTop }: { ev: CsiEvent; index: number; flash: boolean; onTop: () => void }) {
  const color = categoryColor[ev.category]
  const flip = index % 2 === 1
  const soon = isUpcoming(ev)
  return (
    <article id={`event-${ev.id}`} className={`scroll-mt-24 rounded-3xl border bg-card p-4 shadow-soft transition-all duration-500 sm:p-6 ${flash ? 'border-primary ring-4 ring-primary/25' : 'border-border'}`}>
      <div className={`grid items-center gap-6 md:grid-cols-2 md:gap-10 ${flip ? 'md:[&>*:first-child]:order-2' : ''}`}>
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl" style={{ background: `linear-gradient(135deg,#0f5a3f,${color})` }}>
          {ev.image
            ? <img src={ev.image} alt={ev.title} className="size-full object-cover" loading="lazy" />
            : <svg viewBox="0 0 200 150" className="size-full" aria-hidden="true"><g fill="none" stroke="#03120e" strokeOpacity=".35"><circle cx="130" cy="75" r="22" /><circle cx="130" cy="75" r="44" /><circle cx="130" cy="75" r="66" /></g></svg>}
          <span className="absolute left-4 top-4 rounded-full bg-[#03120e] px-3 py-1 text-xs font-semibold" style={{ color }}>{ev.category}</span>
          {soon && <span className="absolute right-4 top-4 rounded-full bg-[#b8f35a] px-3 py-1 text-xs font-bold text-[#03120e]">Upcoming</span>}
          <span className="absolute bottom-3 right-4 select-none text-6xl font-black text-white/25">{String(index + 1).padStart(2, '0')}</span>
        </div>
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-lg bg-primary px-3.5 py-2 text-base font-extrabold text-primary-foreground"><Calendar className="size-5" aria-hidden="true" />{ev.dateLabel}</span>
            {ev.time && <span className="inline-flex items-center gap-2 rounded-lg bg-foreground px-3.5 py-2 text-base font-extrabold text-background"><Clock className="size-5" aria-hidden="true" />{ev.time}</span>}
            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground"><MapPin className="size-4" aria-hidden="true" />{ev.venue}</span>
          </div>
          <h3 className="mt-4 text-3xl font-extrabold text-secondary">{ev.title}</h3>
          <p className="mt-3 leading-relaxed text-muted-foreground">{ev.description}</p>
          <ul className="mt-5 space-y-2.5">
            {ev.highlights.map((h) => (
              <li key={h.label} className="flex gap-3 text-sm">
                <span className="mt-1.5 size-2 shrink-0 rounded-full" style={{ background: color }} aria-hidden="true" />
                <span><b className="font-semibold text-foreground">{h.label}:</b> <span className="text-muted-foreground">{h.value}</span></span>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap gap-2">
          {soon && ev.registerUrl && <a href={ev.registerUrl} className="rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90">Register</a>}
          <button onClick={onTop} className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm font-medium text-primary transition hover:bg-muted">
            <ArrowUp className="size-4" aria-hidden="true" />Back to orbit
          </button>
          </div>
        </div>
      </div>
    </article>
  )
}
