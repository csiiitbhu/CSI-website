import { Link, useParams } from '@tanstack/react-router'
import { clubVerticals, type Vertical } from '../data/clubVerticals'
import VerticalArt from '../components/VerticalArt'
import usePageMeta from '../components/usePageMeta'

const shades = ['#1f7a5c', '#0f766e', '#2f9e77', '#7fb89f', '#14302b']
const imgs = [
  'h-44 w-full sm:col-span-2',
  'h-64 w-full sm:mt-10',
  'h-56 w-full',
  'h-40 w-full sm:col-span-2 sm:-mt-6',
  'h-52 w-full sm:mt-8',
  'h-60 w-full',
]

export default function VerticalDetailPage() {
  const { slug } = useParams({ strict: false }) as { slug?: string }
  const v = clubVerticals.find((x) => x.slug === slug)

  usePageMeta(
    v ? `${v.name} | CSI` : 'Vertical | CSI',
    v ? v.description : 'Club of Sustainability and Innovation verticals'
  )

  if (!v) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <h1 className="text-3xl font-bold text-foreground">Vertical not found</h1>
        <p className="mt-3 text-muted-foreground">
          The requested club vertical could not be found.
        </p>
        <Link
          to="/"
          className="mt-6 inline-block rounded-full bg-primary px-6 py-2.5 font-semibold text-primary-foreground shadow-soft"
        >
          ← Return to Home
        </Link>
      </div>
    )
  }

  const others = clubVerticals.filter((o) => o.slug !== v.slug)

  return (
    <div>
      {/* Hero section */}
      <section className="relative overflow-hidden bg-muted">
        <VerticalArt kind={v.kind} />
        <div className="mx-auto max-w-6xl px-4 py-20 sm:py-28">
          <Link
            to="/"
            className="inline-flex items-center text-sm font-semibold text-primary hover:underline"
          >
            ← Back to home
          </Link>
          <p className="mt-6 text-sm font-semibold uppercase tracking-widest text-secondary">
            {v.tagline}
          </p>
          <h1 className="mt-2 text-4xl font-extrabold text-foreground sm:text-6xl">
            {v.name}
          </h1>
          <p className="mt-4 max-w-xl text-lg text-muted-foreground">
            {v.description}
          </p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {v.focus.map((f) => (
              <li
                key={f}
                className="rounded-full border border-border bg-card px-4 py-1.5 text-sm font-medium shadow-soft"
              >
                {f}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Staggered photo section */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-2xl font-extrabold text-foreground sm:text-3xl">
          Moments from {v.name}
        </h2>
        <p className="mt-1 text-muted-foreground">
          Placeholder photos — replace with club pictures.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {imgs.map((c, i) => (
            <div
              key={i}
              className={`${c} flex items-center justify-center rounded-3xl border border-border text-sm font-semibold text-primary-foreground shadow-soft transition hover:scale-[1.01]`}
              style={{
                background: `linear-gradient(135deg, ${shades[i % 4]}, ${shades[(i + 2) % 4]})`,
              }}
            >
              Photo {i + 1}
            </div>
          ))}
        </div>
      </section>

      {/* Explore other verticals */}
      <section className="mx-auto max-w-6xl px-4 pb-20">
        <h2 className="text-lg font-extrabold text-foreground sm:text-xl">
          Explore other verticals
        </h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {others.map((o) => (
            <Link
              key={o.slug}
              to="/verticals/$slug"
              params={{ slug: o.slug }}
              className="group rounded-2xl border border-border bg-card p-5 shadow-soft transition hover:border-primary hover:shadow-md"
            >
              <div className="flex items-center gap-2">
                <span className="text-xl font-extrabold text-primary">
                  {o.glyph}
                </span>
                <span className="font-semibold text-foreground group-hover:text-primary">
                  {o.name}
                </span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{o.tagline}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
