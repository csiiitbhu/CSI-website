import usePageMeta from '../components/usePageMeta'
import Section from '../components/Section'
import SocialLinks from '../components/SocialLinks'
import WaveBackground from '../components/WaveBackground'
import VerticalNav from '../components/VerticalNav'
import { site } from '../data/site'

export default function HomeNew() {
  usePageMeta(
    'Home | CSI',
    'Club of Sustainability and Innovation: balancing economic, social and environmental progress.'
  )

  return (
    <>
      {/* Hero Section with animated sine wave background */}
      <section className="relative isolate flex min-h-[85vh] items-center overflow-hidden">
        <WaveBackground />
        <div className="mx-auto max-w-6xl px-4 py-20">
          <div className="max-w-2xl rounded-3xl border border-border/60 bg-background/75 p-6 shadow-soft backdrop-blur-md sm:p-10">
            <p className="text-sm font-semibold uppercase tracking-widest text-secondary">
              Build green. Think bold.
            </p>
            <h1 className="mt-3 text-4xl font-extrabold leading-tight text-foreground sm:text-6xl">
              {site.fullHeading}
            </h1>
            <p className="mt-4 text-lg text-muted-foreground sm:text-xl">
              A student community where technology, creativity and responsible thinking meet to shape a more sustainable future.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <a
                href="#verticals"
                className="inline-block rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground shadow-soft transition hover:opacity-90"
              >
                Explore verticals
              </a>
              <div className="flex items-center">
                <SocialLinks />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Scroll-triggered Vertical Navigation */}
      <div id="verticals">
        <VerticalNav />
      </div>

      {/* About Us Section */}
      <Section className="py-16">
        <div className="mx-auto max-w-3xl rounded-3xl border border-border bg-card p-8 text-center shadow-soft sm:p-12">
          <h2 className="text-3xl font-extrabold text-foreground sm:text-4xl">
            {site.aboutTitle}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            {site.about}
          </p>
        </div>
      </Section>
    </>
  )
}
