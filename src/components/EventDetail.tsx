import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { MapPin, Calendar, Clock, ChevronDown, Ticket, Users, ListChecks, Info } from 'lucide-react'
import { categoryColor, isUpcoming, type CsiEvent } from '../data/events'

// Full write-up for one event. The id is the anchor the orbit scrolls to.
export default function EventDetail({ ev, index, flash }: { ev: CsiEvent; index: number; flash: boolean }) {
  const [open, setOpen] = useState(false)
  const color = categoryColor[ev.category]
  const flip = index % 2 === 1
  const soon = isUpcoming(ev)
  const panelId = `more-${ev.id}`
  return (
    <article id={`event-${ev.id}`} className={`scroll-mt-24 rounded-3xl border bg-card p-4 shadow-soft transition-all duration-500 sm:p-6 ${flash ? 'border-primary ring-4 ring-primary/25' : 'border-border'}`}>
      <div className={`grid items-center gap-6 md:grid-cols-2 md:gap-10 ${flip ? 'md:[&>*:first-child]:order-2' : ''}`}>
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl" style={{ background: 'linear-gradient(135deg, var(--color-primary), color-mix(in srgb, var(--color-secondary) 55%, white))' }}>
          {ev.image
            ? <img src={ev.image} alt={ev.title} className="size-full object-cover" loading="lazy" />
            : <svg viewBox="0 0 200 150" className="size-full" aria-hidden="true"><g fill="none" stroke="white" strokeOpacity=".5"><circle cx="130" cy="75" r="22" /><circle cx="130" cy="75" r="44" /><circle cx="130" cy="75" r="66" /></g></svg>}
          <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-card px-3 py-1 text-xs font-bold text-foreground shadow-soft"><span className="size-2 rounded-full" style={{ background: color }} aria-hidden="true" />{ev.category}</span>
          {soon && <span className="absolute right-4 top-4 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">Upcoming</span>}
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
          <div className="mt-6 flex flex-wrap gap-3">
            <button type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls={panelId}
              className="inline-flex items-center gap-2 rounded-full border-2 border-primary px-5 py-2.5 text-sm font-bold text-primary transition hover:bg-primary hover:text-primary-foreground">
              {open ? 'Show less' : 'Know more'}<ChevronDown className={`size-4 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
            </button>
            {soon ? (
              <Link to="/events/$eventId/register" params={{ eventId: ev.id }}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-bold text-primary-foreground shadow-soft transition hover:-translate-y-0.5 hover:opacity-90">
                <Ticket className="size-4" aria-hidden="true" />Register
              </Link>
            ) : (
              <span className="inline-flex items-center gap-2 rounded-full bg-muted px-6 py-2.5 text-sm font-bold text-muted-foreground"><Ticket className="size-4" aria-hidden="true" />Registration closed</span>
            )}
          </div>
        </div>
      </div>

      <div id={panelId} inert={!open} className={`grid transition-[grid-template-rows] duration-300 ease-out ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
        <div className="overflow-hidden">
          <div className="mt-6 grid gap-4 border-t border-border pt-6 md:grid-cols-3">
            <div className="rounded-2xl bg-muted p-4">
              <h4 className="flex items-center gap-2 text-sm font-bold text-foreground"><Info className="size-4 text-primary" aria-hidden="true" />Quick facts</h4>
              <dl className="mt-3 space-y-2 text-sm">
                <div><dt className="text-xs uppercase tracking-wider text-muted-foreground">Type</dt><dd className="font-semibold text-foreground">{ev.category}</dd></div>
                <div><dt className="text-xs uppercase tracking-wider text-muted-foreground">Date</dt><dd className="font-semibold text-foreground">{ev.dateLabel}{ev.time ? `, ${ev.time}` : ''}</dd></div>
                <div><dt className="text-xs uppercase tracking-wider text-muted-foreground">Venue</dt><dd className="font-semibold text-foreground">{ev.venue}</dd></div>
              </dl>
            </div>
            <div className="rounded-2xl bg-muted p-4">
              <h4 className="flex items-center gap-2 text-sm font-bold text-foreground"><Users className="size-4 text-primary" aria-hidden="true" />Who can join</h4>
              <p className="mt-3 text-sm text-muted-foreground">{ev.audience ?? 'Open to all students.'}</p>
            </div>
            <div className="rounded-2xl bg-muted p-4">
              <h4 className="flex items-center gap-2 text-sm font-bold text-foreground"><ListChecks className="size-4 text-primary" aria-hidden="true" />What to expect</h4>
              {ev.agenda?.length
                ? <ol className="mt-3 space-y-2 text-sm text-muted-foreground">{ev.agenda.map((a, i) => <li key={a} className="flex gap-2.5"><span className="font-bold text-primary">{i + 1}.</span>{a}</li>)}</ol>
                : <p className="mt-3 text-sm text-muted-foreground">Details will be shared with registered participants.</p>}
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
