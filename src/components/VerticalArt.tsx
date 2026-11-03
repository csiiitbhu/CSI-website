import type { Kind } from '../data/clubVerticals'

export default function VerticalArt({ kind }: { kind: Kind }) {
  const pts = Array.from({ length: 14 }, (_, i) => ({
    x: 40 + ((i * 97) % 320),
    y: 30 + ((i * 59) % 240),
  }))

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 400 300"
      className="pointer-events-none absolute inset-0 -z-10 h-full w-full opacity-40"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      stroke="#1f7a5c"
      strokeWidth="1.5"
    >
      {kind === 'ai' &&
        [0, 1, 2, 3].flatMap((l) =>
          [0, 1, 2, 3].flatMap((a) =>
            [0, 1, 2, 3].map((b) => (
              <line
                key={`${l}-${a}-${b}`}
                x1={60 + l * 90}
                y1={50 + a * 65}
                x2={150 + l * 90}
                y2={50 + b * 65}
                opacity=".45"
              />
            ))
          )
        )}

      {kind === 'sde' &&
        pts.flatMap((p, i) => [
          <circle key={`pt-${i}`} cx={p.x} cy={p.y} r="6" fill="#0f766e" />,
          <line
            key={`line-${i}`}
            x1={p.x}
            y1={p.y}
            x2={pts[(i + 3) % 14].x}
            y2={pts[(i + 3) % 14].y}
          />,
        ])}

      {kind === 'creative' &&
        ['#1f7a5c', '#2f9e77', '#7fb89f', '#0f766e'].map((c, i) => (
          <circle
            key={i}
            cx={110 + i * 60}
            cy={120 + (i % 2) * 70}
            r={70 - i * 8}
            fill={c}
            fillOpacity=".25"
            stroke="none"
          />
        ))}

      {kind === 'esg' &&
        [30, 60, 90, 120, 150].map((r) => (
          <circle key={r} cx="300" cy="150" r={r} />
        ))}
    </svg>
  )
}
