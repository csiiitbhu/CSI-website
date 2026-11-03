import { useEffect, useRef } from 'react'

const shades = ['#1f7a5c', '#0f766e', '#2f9e77', '#7fb89f', '#14302b']

export default function WaveBackground() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const c = ref.current
    if (!c) return
    const ctx = c.getContext('2d')
    if (!ctx) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const waves = shades.map((color, i) => ({
      color,
      amp: 30 + Math.random() * 50,
      len: 250 + Math.random() * 350,
      phase: Math.random() * 6.28,
      speed: (0.2 + Math.random() * 0.5) * (i % 2 ? 1 : -1),
      y: (i + 0.5) / shades.length,
      w: 28 + Math.random() * 30,
    }))

    let w = 0
    let h = 0
    let raf = 0
    let visible = true

    const resize = () => {
      if (!c) return
      const d = Math.min(window.devicePixelRatio || 1, 2)
      w = c.clientWidth
      h = c.clientHeight
      c.width = w * d
      c.height = h * d
      ctx.setTransform(d, 0, 0, d, 0, 0)
      if (reduce) draw(0)
    }

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h)
      ctx.save()
      ctx.translate(w / 2, h / 2)
      ctx.rotate(-0.35)
      ctx.globalAlpha = 0.55
      ctx.lineCap = 'round'

      const L = Math.hypot(w, h)
      for (const k of waves) {
        ctx.strokeStyle = k.color
        ctx.lineWidth = k.w
        ctx.beginPath()
        for (let x = -L / 2; x <= L / 2; x += 16) {
          const y =
            (k.y - 0.5) * L * 0.7 +
            Math.sin((x / k.len) * 6.28 + k.phase + t * k.speed) * k.amp
          if (x === -L / 2) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        }
        ctx.stroke()
      }
      ctx.restore()
    }

    const loop = (ms: number) => {
      if (visible) draw(ms / 1000)
      raf = window.requestAnimationFrame(loop)
    }

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
    })
    io.observe(c)

    resize()
    window.addEventListener('resize', resize)
    if (!reduce) {
      raf = window.requestAnimationFrame(loop)
    }

    return () => {
      window.cancelAnimationFrame(raf)
      io.disconnect()
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 h-full w-full"
    />
  )
}
