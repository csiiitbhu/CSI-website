import usePageMeta from '../components/usePageMeta'
import Section from '../components/Section'
import TeamCard from '../components/TeamCard'
import PlaceholderImage from '../components/PlaceholderImage'
import { site } from '../data/site'
import { stats, team, teamPage } from '../data/team'
export default function Team() {
  usePageMeta('Our Team | CSI', 'Meet the people behind the Club of Sustainability and Innovation.')
  return (
    <>
      <Section className="flex flex-col items-center text-center">
        <PlaceholderImage round label="Logo" className="size-24" />
        <h1 className="mt-4 text-6xl font-extrabold text-primary">{site.short}</h1>
        <h2 className="mt-2 text-3xl font-bold">{teamPage.heading}</h2>
        <p className="mt-2 text-lg font-medium text-secondary">{teamPage.subheading}</p>
        <p className="mt-3 max-w-xl text-muted-foreground">{teamPage.intro}</p>
        <button onClick={() => document.getElementById('team')?.scrollIntoView({ behavior: 'smooth' })}
          className="mt-6 rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground shadow-soft transition hover:-translate-y-0.5 hover:brightness-110">{teamPage.button}</button>
      </Section>
      <Section className="py-4">
        <ul className="grid grid-cols-2 gap-4 text-center md:grid-cols-4">
          {stats.map((s) => (
            <li key={s.label} className="rounded-2xl bg-muted p-5">
              <p className="text-3xl font-bold text-primary">{s.value}</p>
              <p className="text-sm text-muted-foreground">{s.label}</p>
            </li>
          ))}
        </ul>
      </Section>
      <Section id="team">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {team.map((m, i) => <TeamCard key={i} {...m} />)}
        </div>
      </Section>
    </>
  )
}
