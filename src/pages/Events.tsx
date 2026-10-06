import usePageMeta from '../components/usePageMeta'
import Section from '../components/Section'
import TimelineItem from '../components/TimelineItem'
import { events, eventsPage } from '../data/events'
export default function Events() {
  usePageMeta('Events | CSI', "The milestones that shaped our club's journey from inception to innovation.")
  return (
    <Section>
      <h1 className="text-4xl font-bold text-primary">{eventsPage.heading}</h1>
      <p className="mt-2 max-w-2xl text-muted-foreground">{eventsPage.subtext}</p>
      <ol className="relative mt-12 space-y-12 before:absolute before:left-6 before:top-0 before:h-full before:w-0.5 before:bg-border md:before:left-1/2 md:before:-translate-x-1/2">
        {events.map((e, i) => <TimelineItem key={i} {...e} flip={i % 2 === 1} />)}
      </ol>
    </Section>
  )
}
