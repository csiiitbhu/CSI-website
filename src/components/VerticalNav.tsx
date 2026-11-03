import { useEffect, useRef, useState } from 'react'
import { Link } from '@tanstack/react-router'
import { clubVerticals } from '../data/clubVerticals'

const pos = [
  { x: 60, y: 60 },
  { x: 340, y: 60 },
  { x: 60, y: 340 },
  { x: 340, y: 340 },
]

export default function VerticalNav() {
  const ref = useRef<HTMLDivElement>(null)
  const [played, setPlayed] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setPlayed(true)
          io.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <section className="mx-auto max-w-6xl px-4 py-20 text-center">
      <h2 className="text-3xl font-extrabold text-foreground sm:text-4xl">
        Four verticals, one mission
      </h2>
      <p className="mx-auto mt-2 max-w-md text-muted-foreground sm:text-lg">
        Choose a path to see what each team builds.
      </p>

      <div
        ref={ref}
        className={`relative mx-auto mt-10 aspect-square w-full max-w-md sm:max-w-lg ${played ? 'play' : ''}`}
      >
        <svg
          viewBox="0 0 400 400"
          className="absolute inset-0 h-full w-full"
          fill="none"
          stroke="#1f7a5c"
          strokeWidth="3"
          strokeLinecap="round"
        >
          {pos.map((p, i) => {
            const sx = p.x < 200 ? -1 : 1
            const sy = p.y < 200 ? -1 : 1
            return (
              <path
                key={i}
                pathLength={1}
                className={`branch b${i + 1}`}
                d={`M200 200 C ${200 + sx * 10} ${200 + sy * 110}, ${p.x - sx * 110} ${p.y + sy * 10}, ${p.x} ${p.y}`}
              />
            )
          })}
          <circle className="dot" cx="200" cy="200" r="9" fill="#1f7a5c" />
        </svg>

        {clubVerticals.map((v, i) => (
          <Link
            key={v.slug}
            to="/verticals/$slug"
            params={{ slug: v.slug }}
            style={{ left: `${pos[i].x / 4}%`, top: `${pos[i].y / 4}%` }}
            className="node absolute flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-border bg-card text-lg font-extrabold text-primary shadow-soft transition hover:scale-105 hover:bg-primary hover:text-primary-foreground sm:h-24 sm:w-24"
          >
            <span>{v.glyph}</span>
            <span className="text-[10px] font-semibold sm:text-xs">{v.name}</span>
          </Link>
        ))}
      </div>
    </section>
  )
}
