import { Instagram, Linkedin, MessageCircle } from 'lucide-react'
import { site } from '../data/site'
// Round social buttons. Colors: WhatsApp green, Instagram pink, LinkedIn blue.
const style = {
  whatsapp: { Icon: MessageCircle, bg: 'bg-[#25D366]' },
  instagram: { Icon: Instagram, bg: 'bg-[#E1306C]' },
  linkedin: { Icon: Linkedin, bg: 'bg-[#0A66C2]' },
}
export default function SocialLinks({ size = 'md' }: { size?: 'sm' | 'md' }) {
  const box = size === 'sm' ? 'size-9' : 'size-12'
  return (
    <ul className="flex gap-3">
      {site.socials.map((s) => {
        const { Icon, bg } = style[s.id]
        return (
          <li key={s.id}>
            <a href={s.href} aria-label={s.label} target="_blank" rel="noreferrer"
              className={`${box} ${bg} flex items-center justify-center rounded-full text-white shadow-soft transition hover:-translate-y-0.5 hover:brightness-110`}>
              <Icon className="size-1/2" />
            </a>
          </li>
        )
      })}
    </ul>
  )
}
