import { ArrowDown, Clock, MapPin } from 'lucide-react'
import { categoryColor, daysUntil, type CsiEvent } from '../data/events'

// Vertical timeline of upcoming events, grouped by month. Clicking "Details" jumps to the full write-up further down.
export default function UpcomingTimeline({ events, onSelect }: { events: CsiEvent[]; onSelect: (id: string) => void }) {
  if (!events.length) return null
  const groups: { key: string; label: string; items: CsiEvent[] }[] = []
  events.forEach((ev) => {
    const d = new Date(ev.date + 'T00:00:00')
    const key = ev.date.slice(0, 7)
    let g = groups.find((x) => x.key === key)
    if (!g) { g = { key, label: d.toLocaleString('en-US', { month: 'long', year: 'numeric' }), items: [] }; groups.push(g) }
    g.items.push(ev)
  })
  return (
    <div className="relative">
      <div className="absolute bottom-0 left-[15px] top-2 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-transparent md:left-[119px]" aria-hidden="true" />
      <ol className="space-y-10">
        {groups.map((g) => (
          <li key={g.key}>
            <div className="relative mb-4 flex items-center gap-4 pl-10 md:pl-0">
              <span className="text-sm font-semibold uppercase tracking-[0.14em] text-secondary md:w-[96px] md:text-right">{g.label.split(' ')[0].slice(0, 3)} {g.label.split(' ')[1]}</span>
              <span className="absolute left-[8px] size-4 rounded-full border-4 border-background bg-primary md:static md:ml-[3px] md:size-4" aria-hidden="true" />
            </div>
            <ul className="space-y-4">
              {g.items.map((ev) => {
                const d = new Date(ev.date + 'T00:00:00')
                const left = daysUntil(ev)
                const color = categoryColor[ev.category]
                return (
                  <li key={ev.id} className="relative pl-10 md:flex md:gap-8 md:pl-0">
                    <span className="absolute left-[11px] top-7 size-2.5 rounded-full md:left-[115px]" style={{ background: color }} aria-hidden="true" />
                    <div className="hidden w-[96px] shrink-0 pt-4 text-right md:block">
                      <div className="text-4xl font-black leading-none text-primary">{d.getDate()}</div>
                      <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{d.toLocaleString('en-US', { weekday: 'short' })}</div>
                    </div>
                    <div className="flex-1 md:ml-8">
                      <div className="group grid overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition hover:-translate-y-0.5 hover:border-primary sm:grid-cols-[200px_1fr]">
                        <div className="relative min-h-36 sm:min-h-full" style={{ background: `linear-gradient(135deg,#0f5a3f,${color})` }}>
                          {ev.image && <img src={ev.image} alt="" className="absolute inset-0 size-full object-cover" loading="lazy" />}
                          <span className="absolute left-3 top-3 rounded-full bg-[#03120e] px-2.5 py-1 text-[11px] font-semibold" style={{ color }}>{ev.category}</span>
                        </div>
                        <div className="p-4 sm:p-5">
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                            <span className="font-semibold text-primary md:hidden">{d.getDate()} {d.toLocaleString('en-US', { month: 'short' })}</span>
                            {ev.time && <span className="inline-flex items-center gap-1"><Clock className="size-3.5" aria-hidden="true" />{ev.time}</span>}
                            <span className="inline-flex items-center gap-1"><MapPin className="size-3.5" aria-hidden="true" />{ev.venue}</span>
                            <span className="ml-auto rounded-full bg-[#b8f35a] px-2.5 py-0.5 font-semibold text-[#03120e]">{left === 0 ? 'Today' : left === 1 ? 'Tomorrow' : `In ${left} days`}</span>
                          </div>
                          <h3 className="mt-2 text-xl font-extrabold text-secondary">{ev.title}</h3>
                          <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{ev.description}</p>
                          <div className="mt-3 flex flex-wrap gap-2">
                            <button onClick={() => onSelect(ev.id)} className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-1.5 text-sm font-medium text-primary transition hover:bg-muted"><ArrowDown className="size-4" aria-hidden="true" />Details</button>
                            {ev.registerUrl && <a href={ev.registerUrl} className="rounded-full bg-primary px-4 py-1.5 text-sm font-medium text-primary-foreground transition hover:opacity-90">Register</a>}
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>
          </li>
        ))}
      </ol>
    </div>
  )
}
