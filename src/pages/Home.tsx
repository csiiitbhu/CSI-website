import usePageMeta from '../components/usePageMeta'
import Section from '../components/Section'
import SocialLinks from '../components/SocialLinks'
import PlaceholderImage from '../components/PlaceholderImage'
import VerticalIcon from '../components/VerticalIcon'
import { site } from '../data/site'
import { verticals } from '../data/verticals'
export default function Home() {
  usePageMeta('Home | CSI', 'Club of Sustainability and Innovation: balancing economic, social and environmental progress.')
  return (
    <>
      <Section className="grid items-center gap-10 lg:grid-cols-2">
        <div>
          <h1 className="text-6xl font-extrabold text-primary sm:text-7xl">{site.short}</h1>
          <p className="mt-2 text-2xl font-bold sm:text-3xl">{site.fullHeading}</p>
          <h2 className="mt-8 text-xl font-semibold text-secondary">{site.aboutTitle}</h2>
          <p className="mt-2 max-w-prose leading-relaxed text-muted-foreground">{site.about}</p>
          <div className="mt-6"><SocialLinks /></div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {Array.from({ length: 9 }, (_, i) => <PlaceholderImage key={i} label="Photo" className="aspect-square" />)}
        </div>
      </Section>
      <Section title={site.verticalsTitle}>
        <ul className="grid grid-cols-2 gap-8 text-center md:grid-cols-3">
          {verticals.map((v) => (
            <li key={v.name} className="flex flex-col items-center">
              <span className="flex size-20 items-center justify-center rounded-full border-2 border-foreground bg-card shadow-soft"><VerticalIcon name={v.icon} /></span>
              <h3 className="mt-3 font-semibold">{v.name}</h3>
              <p className="text-sm text-muted-foreground">{v.description}</p>
            </li>
          ))}
        </ul>
      </Section>
    </>
  )
}
