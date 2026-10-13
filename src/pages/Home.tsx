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
      {/* Full-screen wrapper with banner background */}

      <div className="relative flex min-h-screen items-center bg-[url('/src/assets/waterColor.png')] bg-cover bg-center bg-no-repeat">
        <div className="absolute inset-0 bg-background/80 -z-10"></div>

        <Section className="relative z-10 flex w-full flex-col items-center justify-center py-24 text-center">

          <h1 className="text-7xl font-extrabold text-primary sm:text-8xl lg:text-9xl">
            {site.short}
          </h1>

          <p className="mt-4 text-3xl font-bold sm:text-4xl lg:text-5xl">
            {site.fullHeading}
          </p>

          <h2 className="mt-10 text-2xl font-semibold text-secondary sm:text-3xl lg:text-4xl">
            {site.aboutTitle}
          </h2>

          <p className="mt-4 max-w-prose text-lg leading-relaxed text-muted-foreground sm:text-xl lg:text-2xl">
            {site.about}
          </p>

          <div className="mt-8 flex justify-center">
            <SocialLinks />
          </div>

        </Section>
      </div>
      ```

      <Section title={site.verticalsTitle}>
        {/* ... (Verticals section remains the same) ... */}
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