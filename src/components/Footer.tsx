import { site } from '../data/site'
import SocialLinks from './SocialLinks'
export default function Footer() {
  return (
    <footer className="mt-12 border-t border-border bg-muted">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-6 text-sm sm:flex-row sm:px-6">
        <p className="text-muted-foreground">© {new Date().getFullYear()} {site.name}</p>
        <SocialLinks size="sm" />
      </div>
    </footer>
  )
}
