import { useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import PlaceholderImage from './PlaceholderImage'
type Props = { items: { label: string }[]; index: number; onClose: () => void; onChange: (i: number) => void }
// Accessible modal: Esc closes, arrow keys navigate, backdrop click closes.
export default function Lightbox({ items, index, onClose, onChange }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const prev = () => onChange((index - 1 + items.length) % items.length)
  const next = () => onChange((index + 1) % items.length)
  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null
    closeRef.current?.focus()
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = ''; opener?.focus() }
  }, [])
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })
  const btn = 'absolute flex size-11 items-center justify-center rounded-full bg-white/90 text-foreground shadow-soft transition hover:bg-white'
  return (
    <div role="dialog" aria-modal="true" aria-label={`${items[index].label}, ${index + 1} of ${items.length}`}
      className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/80 p-4" onClick={onClose}>
      <button ref={closeRef} onClick={onClose} aria-label="Close" className={`${btn} right-4 top-4`}><X /></button>
      <button onClick={(e) => { e.stopPropagation(); prev() }} aria-label="Previous photo" className={`${btn} left-4 top-1/2 -translate-y-1/2`}><ChevronLeft /></button>
      <button onClick={(e) => { e.stopPropagation(); next() }} aria-label="Next photo" className={`${btn} right-4 top-1/2 -translate-y-1/2`}><ChevronRight /></button>
      <div className="pop w-full max-w-3xl" onClick={(e) => e.stopPropagation()}>
        <PlaceholderImage label={items[index].label} className="aspect-[4/3] w-full text-lg" />
      </div>
    </div>
  )
}
