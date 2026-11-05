import { useEffect, useRef, useState } from 'react'
import { Link } from '@tanstack/react-router'
import { clubVerticals } from '../data/clubVerticals'

// 4 vertical link positions: stretched horizontally, compact vertically
const nodePositions = [
  { slug: 'ai-ml', xClass: 'left-[14%] sm:left-[10%] md:left-[8%]', yClass: 'top-[16%]' },
  { slug: 'sde', xClass: 'left-[86%] sm:left-[90%] md:left-[92%]', yClass: 'top-[16%]' },
  { slug: 'creatives', xClass: 'left-[14%] sm:left-[10%] md:left-[8%]', yClass: 'top-[84%]' },
  { slug: 'esg-consulting', xClass: 'left-[86%] sm:left-[90%] md:left-[92%]', yClass: 'top-[84%]' },
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
      { threshold: 0.25 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <section className="relative mx-auto max-w-7xl px-4 py-16 sm:py-20 text-center">
      <h2 className="relative z-10 text-3xl font-extrabold text-foreground sm:text-4xl">
        Four verticals, one mission
      </h2>
      <p className="relative z-10 mx-auto mt-2 max-w-md text-muted-foreground sm:text-lg">
        Choose a path to see what each team builds.
      </p>

      {/* Horizontally stretched container: compact vertical height unchanged, wide horizontal span */}
      <div
        ref={ref}
        className={`relative z-10 mx-auto mt-8 sm:mt-10 h-[380px] sm:h-[410px] md:h-[430px] w-full max-w-5xl lg:max-w-6xl ${played ? 'play' : ''}`}
      >
        {/* Pulsating concentric circles background centered exactly at the center of the vertical section (behind all elements, 50% transparent) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center opacity-50 select-none overflow-visible"
        >
          <svg
            viewBox="-600 -600 1200 1200"
            className="h-[1200px] w-[1200px] shrink-0 animate-pulse-concentric"
            fill="none"
          >
            <circle cx="0" cy="0" r="50" stroke="#1f7a5c" strokeWidth="2.5" />
            <circle cx="0" cy="0" r="95" stroke="#0f766e" strokeWidth="1.5" strokeDasharray="6 6" />
            <circle cx="0" cy="0" r="150" stroke="#1f7a5c" strokeWidth="2" />
            <circle cx="0" cy="0" r="215" stroke="#0f766e" strokeWidth="1.5" />
            <circle cx="0" cy="0" r="290" stroke="#1f7a5c" strokeWidth="2" strokeDasharray="8 6" />
            <circle cx="0" cy="0" r="375" stroke="#0f766e" strokeWidth="1.5" />
            <circle cx="0" cy="0" r="470" stroke="#1f7a5c" strokeWidth="1.8" strokeDasharray="12 8" />
            <circle cx="0" cy="0" r="575" stroke="#0f766e" strokeWidth="1.2" />
            <circle cx="0" cy="0" r="690" stroke="#1f7a5c" strokeWidth="1" strokeDasharray="14 10" />
            <circle cx="0" cy="0" r="820" stroke="#0f766e" strokeWidth="1" />
          </svg>
        </div>

        {/* 4 wire branches stretched horizontally from center (500, 200) to the 4 corners */}
        <svg
          viewBox="0 0 1000 400"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
          fill="none"
          stroke="#1f7a5c"
          strokeWidth="3"
          strokeLinecap="round"
        >
          {/* Branch 1: Center to AI/ML (Top-Left) */}
          <path
            pathLength={1}
            className="branch b1"
            d="M 500 200 C 360 200, 220 64, 80 64"
          />
          {/* Branch 2: Center to SDE (Top-Right) */}
          <path
            pathLength={1}
            className="branch b2"
            d="M 500 200 C 640 200, 780 64, 920 64"
          />
          {/* Branch 3: Center to Creatives (Bottom-Left) */}
          <path
            pathLength={1}
            className="branch b3"
            d="M 500 200 C 360 200, 220 336, 80 336"
          />
          {/* Branch 4: Center to ESG & Consulting (Bottom-Right) */}
          <path
            pathLength={1}
            className="branch b4"
            d="M 500 200 C 640 200, 780 336, 920 336"
          />
        </svg>

        {/* Central hub point centered at (50%, 50%) */}
        <div className="dot absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-5 w-5 rounded-full bg-[#1f7a5c] border-[3px] border-[#faf7f0] shadow-sm z-10" />

        {/* 4 Clickable vertical icons stretched horizontally */}
        {clubVerticals.map((v, i) => {
          const pos = nodePositions[i]
          return (
            <Link
              key={v.slug}
              to="/verticals/$slug"
              params={{ slug: v.slug }}
              className={`node absolute ${pos.xClass} ${pos.yClass} flex h-20 w-20 sm:h-24 sm:w-24 md:h-26 md:w-26 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border-2 border-border bg-card shadow-soft transition-all duration-300 hover:scale-110 hover:shadow-xl hover:border-primary hover:bg-primary hover:text-primary-foreground text-primary z-20`}
            >
              <span className="text-xl sm:text-2xl font-extrabold">{v.glyph}</span>
              <span className="mt-0.5 text-[10px] sm:text-xs font-semibold tracking-tight">{v.name}</span>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
