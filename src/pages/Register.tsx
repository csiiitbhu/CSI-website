import { useState } from 'react'
import type { FormEvent, ReactNode } from 'react'
import { Link, useParams } from '@tanstack/react-router'
import { ArrowLeft, Calendar, CalendarPlus, Check, Clock, MapPin, Ticket, Sparkles } from 'lucide-react'
import usePageMeta from '../components/usePageMeta'
import { apiUrl, categoryColor, getEvent, isUpcoming, type CsiEvent } from '../data/events'

type Form = { name: string; email: string; phone: string; enrollment: string; program: string; branch: string; year: string; teamName: string; teamSize: string; notes: string; consent: boolean }
type Errors = Partial<Record<keyof Form, string>>
const empty: Form = { name: '', email: '', phone: '', enrollment: '', program: '', branch: '', year: '', teamName: '', teamSize: '1', notes: '', consent: false }
const programs = ['B.Tech', 'IDD', 'M.Tech', 'M.Sc', 'Ph.D', 'Other']
const years = ['1st year', '2nd year', '3rd year', '4th year', '5th year', 'Not applicable']

function validate(f: Form, team: boolean): Errors {
  const e: Errors = {}
  if (f.name.trim().length < 2) e.name = 'Enter your full name'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim())) e.email = 'Enter a valid email address'
  if (!/^[6-9]\d{9}$/.test(f.phone.replace(/[\s-]/g, '').replace(/^(\+91|0)/, ''))) e.phone = 'Enter a 10-digit mobile number'
  if (f.enrollment.trim().length < 4) e.enrollment = 'Enter your enrollment or roll number'
  if (!f.program) e.program = 'Choose your programme'
  if (f.branch.trim().length < 2) e.branch = 'Enter your branch or department'
  if (!f.year) e.year = 'Choose your year'
  if (team && f.teamName.trim().length < 2) e.teamName = 'Enter a team name'
  if (!f.consent) e.consent = 'Please agree so we can contact you about this event'
  return e
}

// Downloads a calendar file (.ics) for the event, so participants can add it to their phone or Google Calendar.
function downloadCalendar(ev: CsiEvent) {
  const d = (iso: string, plus = 0) => { const t = new Date(iso + 'T00:00:00Z'); t.setUTCDate(t.getUTCDate() + plus); return t.toISOString().slice(0, 10).replace(/-/g, '') }
  const esc = (t: string) => t.replace(/([,;])/g, '\\$1')
  const lines = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//CSI IIT BHU//Events//EN', 'BEGIN:VEVENT', `UID:${ev.id}@csi`, `DTSTAMP:${new Date().toISOString().replace(/[-:]|\.\d+/g, '')}`,
    `DTSTART;VALUE=DATE:${d(ev.date)}`, `DTEND;VALUE=DATE:${d(ev.date, 1)}`, `SUMMARY:${esc(ev.title)}`, `LOCATION:${esc(ev.venue)}`, `DESCRIPTION:${esc(ev.description)}`, 'END:VEVENT', 'END:VCALENDAR']
  const url = URL.createObjectURL(new Blob([lines.join('\r\n')], { type: 'text/calendar' }))
  const a = document.createElement('a'); a.href = url; a.download = `${ev.id}.ics`; a.click(); URL.revokeObjectURL(url)
}

const input = (bad?: string) => `w-full rounded-xl border bg-background px-3.5 py-2.5 text-sm text-foreground outline-none transition placeholder:text-muted-foreground/70 focus:border-primary focus:ring-4 focus:ring-primary/15 ${bad ? 'border-red-500' : 'border-border'}`

function Field({ label, error, optional, children }: { label: string; error?: string; optional?: boolean; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-baseline justify-between text-sm font-semibold text-foreground">{label}{optional && <span className="text-xs font-normal text-muted-foreground">Optional</span>}</span>
      {children}
      {error && <span role="alert" className="mt-1.5 block text-xs font-medium text-red-600">{error}</span>}
    </label>
  )
}

export default function Register() {
  const { eventId } = useParams({ strict: false }) as { eventId?: string }
  const ev = getEvent(eventId)
  usePageMeta(ev ? `Register for ${ev.title} | CSI` : 'Register | CSI', ev ? `Register for ${ev.title} at IIT (BHU).` : 'Event registration')
  const [f, setF] = useState<Form>(empty)
  const [errors, setErrors] = useState<Errors>({})
  const [busy, setBusy] = useState(false)
  const [serverError, setServerError] = useState('')
  const [done, setDone] = useState<{ ref: string; name: string } | null>(null)

  if (!ev) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <h1 className="text-3xl font-extrabold text-primary">We couldn't find that event</h1>
        <p className="mt-3 text-muted-foreground">The link may be old or mistyped.</p>
        <Link to="/events" className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-bold text-primary-foreground"><ArrowLeft className="size-4" aria-hidden="true" />Back to events</Link>
      </div>
    )
  }

  if (!isUpcoming(ev)) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <h1 className="text-3xl font-extrabold text-primary">Registration closed</h1>
        <p className="mt-3 text-muted-foreground"><b className="text-foreground">{ev.title}</b> has already taken place.</p>
        <Link to="/events" className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-bold text-primary-foreground"><ArrowLeft className="size-4" aria-hidden="true" />Back to events</Link>
      </div>
    )
  }

  const color = categoryColor[ev.category]
  const team = ev.category === 'Competition'
  const set = <K extends keyof Form>(k: K, v: Form[K]) => { setF((p) => ({ ...p, [k]: v })); if (errors[k]) setErrors((p) => ({ ...p, [k]: undefined })) }

  async function submit(e: FormEvent) {
    e.preventDefault()
    if (!ev) return
    const found = validate(f, team)
    setErrors(found)
    if (Object.keys(found).length) { document.querySelector<HTMLElement>('[role=alert]')?.scrollIntoView({ block: 'center', behavior: 'smooth' }); return }
    setBusy(true); setServerError('')
    const payload = { eventId: ev.id, eventTitle: ev.title, ...f, teamName: team ? f.teamName : '', teamSize: team ? f.teamSize : '' }
    try {
      const res = await fetch(`${apiUrl}/api/registrations`, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(payload) })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        if (data.errors) { setErrors(data.errors); return }
        if (data.error) { setServerError(data.error); return }
        throw new Error('bad response')
      }
      setDone({ ref: data.ref, name: f.name.trim().split(' ')[0] })
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch {
      setServerError("We couldn't reach the server. Check your connection and try again.")
    } finally { setBusy(false) }
  }

  return (
    <div className="relative overflow-hidden bg-background text-foreground">
      <div className="pointer-events-none absolute inset-0" style={{ background: 'radial-gradient(circle at 15% 15%, color-mix(in srgb, var(--color-primary) 16%, transparent) 0, transparent 55%)' }} />
      <div className="pointer-events-none absolute inset-0" style={{ backgroundImage: 'linear-gradient(color-mix(in srgb, var(--color-border) 55%, transparent) 1px,transparent 1px),linear-gradient(90deg,color-mix(in srgb, var(--color-border) 55%, transparent) 1px,transparent 1px)', backgroundSize: '48px 48px' }} />
      <svg className="pointer-events-none absolute -left-40 bottom-[-220px] hidden opacity-60 lg:block" width="640" height="640" viewBox="0 0 640 640" aria-hidden="true"><g fill="none" stroke="var(--color-primary)" strokeOpacity=".4"><circle cx="320" cy="320" r="120" /><circle cx="320" cy="320" r="200" strokeDasharray="4 8" /><circle cx="320" cy="320" r="280" strokeOpacity=".5" /></g></svg>

      <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_1.1fr] lg:gap-14 lg:py-16">
        <aside className="lg:pt-4">
          <Link to="/events" className="flex w-fit items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-foreground"><ArrowLeft className="size-4" aria-hidden="true" />All events</Link>
          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-secondary"><Ticket className="size-3.5" aria-hidden="true" />Registration</div>
          <h1 className="mt-4 text-4xl font-black leading-[1.05] tracking-tight text-primary sm:text-5xl">{ev.title}</h1>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-lg bg-primary px-3.5 py-2 text-base font-extrabold text-primary-foreground"><Calendar className="size-5" aria-hidden="true" />{ev.dateLabel}</span>
            {ev.time && <span className="inline-flex items-center gap-2 rounded-lg bg-foreground px-3.5 py-2 text-base font-extrabold text-background"><Clock className="size-5" aria-hidden="true" />{ev.time}</span>}
          </div>
          <p className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-foreground"><MapPin className="size-4 text-muted-foreground" aria-hidden="true" />{ev.venue}</p>

          <div className="relative mt-7 aspect-[16/9] overflow-hidden rounded-2xl border border-border shadow-soft" style={{ background: 'linear-gradient(135deg, var(--color-primary), color-mix(in srgb, var(--color-secondary) 55%, white))' }}>
            {ev.image && <img src={ev.image} alt="" className="size-full object-cover" />}
            <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-card px-3 py-1 text-xs font-bold text-foreground shadow-soft"><span className="size-2 rounded-full" style={{ background: color }} aria-hidden="true" />{ev.category}</span>
          </div>

          <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">{ev.description}</p>
          <ul className="mt-5 space-y-3">
            {ev.highlights.map((h) => (
              <li key={h.label} className="flex items-start gap-3 text-sm">
                <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground"><Check className="size-3.5" strokeWidth={3} aria-hidden="true" /></span>
                <span><b className="text-foreground">{h.label}:</b> <span className="text-muted-foreground">{h.value}</span></span>
              </li>
            ))}
          </ul>
        </aside>

        <div>
          <div className="rounded-3xl border border-border bg-card p-6 text-foreground shadow-soft sm:p-8">
            {done ? (
              <div className="py-4 text-center" role="status">
                <div className="mx-auto grid size-16 place-items-center rounded-full bg-primary text-primary-foreground"><Check className="size-8" strokeWidth={3} aria-hidden="true" /></div>
                <h2 className="mt-5 text-3xl font-extrabold text-primary">You're in, {done.name}!</h2>
                <p className="mx-auto mt-2 max-w-sm text-muted-foreground">Your spot for <b className="text-foreground">{ev.title}</b> is saved. Keep your reference number handy.</p>
                <div className="relative mx-auto mt-7 max-w-sm overflow-hidden rounded-2xl border border-border bg-muted text-left">
                  <div className="flex items-center justify-between bg-primary px-5 py-3 text-primary-foreground"><span className="text-xs font-bold uppercase tracking-[0.18em]">Event pass</span><Sparkles className="size-4" aria-hidden="true" /></div>
                  <div className="space-y-3 p-5">
                    <div><div className="text-xs uppercase tracking-wider text-muted-foreground">Reference</div><div className="font-mono text-2xl font-black tracking-widest text-foreground">{done.ref}</div></div>
                    <div className="grid grid-cols-2 gap-3 border-t border-dashed border-border pt-3 text-sm">
                      <div><div className="text-xs uppercase tracking-wider text-muted-foreground">Date</div><div className="font-bold text-foreground">{ev.dateLabel}</div></div>
                      <div><div className="text-xs uppercase tracking-wider text-muted-foreground">Venue</div><div className="font-bold text-foreground">{ev.venue}</div></div>
                    </div>
                  </div>
                </div>
                <div className="mt-7 flex flex-wrap justify-center gap-3">
                  <button type="button" onClick={() => downloadCalendar(ev)} className="inline-flex items-center gap-2 rounded-full border-2 border-primary px-5 py-2.5 text-sm font-bold text-primary transition hover:bg-primary hover:text-primary-foreground"><CalendarPlus className="size-4" aria-hidden="true" />Add to calendar</button>
                  <Link to="/events" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-bold text-primary-foreground transition hover:opacity-90">Back to events</Link>
                </div>
                <button type="button" onClick={() => { setF(empty); setDone(null) }} className="mt-5 text-sm font-medium text-muted-foreground underline-offset-4 hover:underline">Register someone else</button>
              </div>
            ) : (
              <form onSubmit={submit} noValidate>
                <h2 className="text-2xl font-extrabold text-primary">Reserve your spot</h2>
                <p className="mt-1 text-sm text-muted-foreground">It takes about a minute. We'll use these details only for this event.</p>

                <fieldset className="mt-6">
                  <legend className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-secondary">About you</legend>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="sm:col-span-2"><Field label="Full name" error={errors.name}><input className={input(errors.name)} value={f.name} onChange={(e) => set('name', e.target.value)} autoComplete="name" placeholder="Aarav Sharma" aria-invalid={!!errors.name} /></Field></div>
                    <Field label="Email" error={errors.email}><input type="email" className={input(errors.email)} value={f.email} onChange={(e) => set('email', e.target.value)} autoComplete="email" placeholder="name@itbhu.ac.in" aria-invalid={!!errors.email} /></Field>
                    <Field label="Mobile number" error={errors.phone}><input type="tel" inputMode="tel" className={input(errors.phone)} value={f.phone} onChange={(e) => set('phone', e.target.value)} autoComplete="tel" placeholder="98765 43210" aria-invalid={!!errors.phone} /></Field>
                  </div>
                </fieldset>

                <fieldset className="mt-7">
                  <legend className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-secondary">Your course</legend>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Enrollment or roll number" error={errors.enrollment}><input className={input(errors.enrollment)} value={f.enrollment} onChange={(e) => set('enrollment', e.target.value)} placeholder="21075001" aria-invalid={!!errors.enrollment} /></Field>
                    <Field label="Programme" error={errors.program}>
                      <select className={input(errors.program)} value={f.program} onChange={(e) => set('program', e.target.value)} aria-invalid={!!errors.program}><option value="">Select</option>{programs.map((p) => <option key={p}>{p}</option>)}</select>
                    </Field>
                    <Field label="Branch or department" error={errors.branch}><input className={input(errors.branch)} value={f.branch} onChange={(e) => set('branch', e.target.value)} placeholder="Computer Science and Engineering" aria-invalid={!!errors.branch} /></Field>
                    <Field label="Year" error={errors.year}>
                      <select className={input(errors.year)} value={f.year} onChange={(e) => set('year', e.target.value)} aria-invalid={!!errors.year}><option value="">Select</option>{years.map((y) => <option key={y}>{y}</option>)}</select>
                    </Field>
                  </div>
                </fieldset>

                {team && (
                  <fieldset className="mt-7">
                    <legend className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-secondary">Your team</legend>
                    <div className="grid gap-4 sm:grid-cols-[1fr_140px]">
                      <Field label="Team name" error={errors.teamName}><input className={input(errors.teamName)} value={f.teamName} onChange={(e) => set('teamName', e.target.value)} placeholder="Green Coders" aria-invalid={!!errors.teamName} /></Field>
                      <Field label="Team size"><select className={input()} value={f.teamSize} onChange={(e) => set('teamSize', e.target.value)}>{[1, 2, 3, 4].map((n) => <option key={n}>{n}</option>)}</select></Field>
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground">One person registers for the whole team. Add your teammates' names below.</p>
                  </fieldset>
                )}

                <div className="mt-7">
                  <Field label={team ? 'Teammates or questions' : 'Anything we should know?'} optional>
                    <textarea rows={3} className={input()} value={f.notes} onChange={(e) => set('notes', e.target.value)} placeholder={team ? 'Names and enrollment numbers of your teammates' : 'Dietary needs, accessibility needs, questions'} />
                  </Field>
                </div>

                <label className="mt-6 flex cursor-pointer items-start gap-3 text-sm text-muted-foreground">
                  <input type="checkbox" checked={f.consent} onChange={(e) => set('consent', e.target.checked)} className="mt-0.5 size-4 shrink-0 accent-primary" aria-invalid={!!errors.consent} />
                  <span>I agree that CSI can contact me about this event using the details above.</span>
                </label>
                {errors.consent && <span role="alert" className="mt-1.5 block text-xs font-medium text-red-600">{errors.consent}</span>}

                {serverError && <p role="alert" className="mt-5 rounded-lg bg-red-50 p-3 text-sm font-medium text-red-700">{serverError}</p>}

                <button type="submit" disabled={busy} className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-base font-bold text-primary-foreground shadow-soft transition hover:-translate-y-0.5 hover:opacity-95 disabled:cursor-wait disabled:opacity-70">
                  <Ticket className="size-5" aria-hidden="true" />{busy ? 'Registering…' : 'Confirm registration'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
