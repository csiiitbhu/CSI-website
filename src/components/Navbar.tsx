import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { Menu, X } from 'lucide-react'
import { site } from '../data/site'
import PlaceholderImage from './PlaceholderImage'
import bulb from "../assets/bulb.svg";
import spinner from "../assets/spinner.svg";
export default function Navbar() {
  const [open, setOpen] = useState(false)
  const link = 'rounded-lg px-3 py-2 text-sm font-medium transition hover:bg-muted'
  const active = 'rounded-lg px-3 py-2 text-sm font-medium bg-primary text-primary-foreground'
  const links = site.nav.map((n) => (
    <Link key={n.to} to={n.to} onClick={() => setOpen(false)} activeOptions={{ exact: true }}
      className={link} activeProps={{ className: active, 'aria-current': 'page' }}>{n.label}</Link>
  ))
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6" aria-label="Main">
        <Link to="/" className="flex items-center gap-3 font-semibold text-primary">
          <div className="relative size-9 shrink-0">
            <img
              src={bulb}
              alt=""
              className="absolute inset-0 size-full object-contain"
            />
            <img
              src={spinner}
              alt=""
              className="absolute left-[27%] top-[12%] size-4 max-w-none object-contain"
            />
          </div>
          <span className="text-sm sm:text-base">{site.name}</span>
        </Link>
        <div className="hidden gap-1 md:flex">{links}</div>
        <button className="rounded-lg p-2 hover:bg-muted md:hidden" aria-label="Toggle menu" aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </nav>
      {open && <div id="mobile-menu" className="pop flex flex-col gap-1 border-t border-border px-4 pb-4 pt-2 md:hidden">{links}</div>}
    </header>
  )
}
