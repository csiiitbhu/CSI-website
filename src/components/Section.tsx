import type { ReactNode } from 'react'
// Page section with consistent width and spacing.
export default function Section({ id, title, children, className = '' }: { id?: string; title?: string; children: ReactNode; className?: string }) {
  return (
    <section id={id} className={`mx-auto w-full max-w-6xl scroll-mt-24 px-4 py-12 sm:px-6 ${className}`}>
      {title && <h2 className="mb-8 text-3xl font-bold text-primary">{title}</h2>}
      {children}
    </section>
  )
}
