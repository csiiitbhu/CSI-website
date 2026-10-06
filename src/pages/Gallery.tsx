import { useState } from 'react'
import usePageMeta from '../components/usePageMeta'
import Section from '../components/Section'
import Lightbox from '../components/Lightbox'
import PlaceholderImage from '../components/PlaceholderImage'
import { gallery, galleryPage } from '../data/gallery'
export default function Gallery() {
  usePageMeta('Gallery | CSI', 'Photos from Club of Sustainability and Innovation activities.')
  const [open, setOpen] = useState<number | null>(null)
  return (
    <Section title={galleryPage.heading}>
      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {gallery.map((g, i) => (
          <li key={i}>
            <button onClick={() => setOpen(i)} aria-label={`Open ${g.label}`} className="block w-full rounded-xl transition hover:-translate-y-0.5 hover:shadow-soft">
              <PlaceholderImage label={g.label} className="aspect-square w-full" />
            </button>
          </li>
        ))}
      </ul>
      {open !== null && <Lightbox items={gallery} index={open} onChange={setOpen} onClose={() => setOpen(null)} />}
    </Section>
  )
}
