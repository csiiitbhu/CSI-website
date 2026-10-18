// Events page content. Add an event by adding one object to `events`; the orbit and the list below update on their own.
// Events dated today or later are shown as Upcoming automatically. Newest events sit closest to the centre of the orbit, so the order in this file doesn't matter (sorted by `date`).
export const eventsPage = {
  heading: 'Event Orbit',
  subtext: 'Every event is a planet. The closer to the core, the more recent it is. Hover to preview, click to read the full story.',
  upcomingHeading: 'Upcoming events',
  pastHeading: 'Past events',
}

export type EventCategory = 'Competition' | 'Workshop' | 'Awareness' | 'Orientation' | 'Talk'

export type CsiEvent = {
  id: string            // unique, used for the scroll anchor
  title: string
  category: EventCategory
  date: string          // YYYY-MM-DD, used for sorting and to decide Upcoming vs Past
  time?: string         // optional, e.g. '10:00 AM'
  dateLabel: string     // shown to visitors
  venue: string
  description: string
  highlights: { label: string; value: string }[]
  image?: string        // optional photo URL; a coloured placeholder is shown if empty
  audience?: string     // shown under 'Know more'
  agenda?: string[]     // shown under 'Know more'
  registerUrl?: string  // optional registration URL
}

// Dot colour per category, built from the site theme colours in styles.css (also used for the filter chips).
export const categoryColor: Record<EventCategory, string> = {
  Competition: 'var(--color-primary)',
  Workshop: 'var(--color-secondary)',
  Awareness: 'color-mix(in srgb, var(--color-primary) 55%, white)',
  Orientation: 'var(--color-foreground)',
  Talk: 'color-mix(in srgb, var(--color-secondary) 50%, white)',
}

export const events: CsiEvent[] = [
  // SAMPLE upcoming event so the Upcoming section and registration can be tested. Edit or delete it.
  {
    id: 'sample-upcoming-event', title: 'Sample Upcoming Event', category: 'Workshop', date: '2026-11-14', time: '10:00 AM', dateLabel: '14 November 2026', venue: 'IIT (BHU) Varanasi',
    description: 'Placeholder for your next event. Replace the title, date, venue and description, or delete this entry.',
    audience: 'Open to all students',
    agenda: ['Welcome', 'Main session', 'Questions and answers'],
    highlights: [{ label: 'Registration', value: 'Open now' }],
  },
  {
    id: 'green-run-2026', title: 'Green Run 2026', category: 'Awareness', date: '2026-10-04', dateLabel: '4 October 2026', venue: 'IIT (BHU) Campus, Varanasi',
    description: 'A campus run with a message: #BreatheBetterVaranasi. Students ran, walked and volunteered to spread awareness about air pollution in the city.',
    image: '/events/marathon.svg',
    audience: 'Open to all IIT (BHU) students, staff and faculty',
    agenda: ['Warm-up and flag-off', '3 km and 5 km runs', 'Awareness talk and prizes'],
    highlights: [
      { label: 'Highlight', value: 'Awareness booths along the route' },
      { label: 'Impact', value: 'Raised awareness about air pollution' },
    ],
  },
  {
    id: 'freshers-orientation-2026', title: "Freshers' Orientation 2026", category: 'Orientation', date: '2026-09-05', dateLabel: '5 September 2026', venue: 'IIT (BHU) Varanasi',
    description: "The club's Freshers' Orientation introduced first-year students to sustainability on campus through games, tools and quizzes.",
    image: '/events/orientation.svg',
    audience: 'First-year students',
    agenda: ['Welcome to CSI', 'Green Cup game', 'Green score quiz and tool demo'],
    highlights: [
      { label: 'Activities', value: 'Green Cup, green score calculator, quizzes' },
      { label: 'Goal', value: 'Early student engagement in sustainability action' },
    ],
  },
  {
    id: 'green-newsletter', title: 'Green Newsletter', category: 'Awareness', date: '2026-08-15', dateLabel: '15 August 2026', venue: 'IIT (BHU) Varanasi',
    description: 'The CSI council interacted with freshers and helped them plant the seed-paper copies of the Green Newsletter, turning a printed newsletter into a living plantation drive.',
    image: '/events/plantation.svg',
    audience: 'Freshers and CSI volunteers',
    agenda: ['Distribution of seed-paper newsletters', 'How to plant and care for your copy', 'Group plantation'],
    highlights: [
      { label: 'Highlight', value: 'Green Newsletter made from special seed paper' },
      { label: 'Reach', value: '1400+ freshers received copies' },
      { label: 'Impact', value: 'Plantation drive on Independence Day 2026' },
    ],
  },
  {
    id: 'esg-workshop', title: 'ESG Workshop', category: 'Workshop', date: '2026-04-18', dateLabel: '18 April 2026', venue: 'Seminar Hall, IIT (BHU)',
    description: "An enlightening workshop on 'People, Planet, and Profits' by an industry guest speaker, aimed at raising awareness of how business, sustainability and societal well-being connect.",
    image: '/events/talk.svg',
    audience: 'All students, no prior knowledge needed',
    agenda: ['Introduction to ESG', 'Case study discussion', 'Questions and answers'],
    highlights: [
      { label: 'Participants', value: '80+' },
      { label: 'Focus', value: 'Business, sustainability, and societal well-being' },
    ],
  },
  {
    id: 'ai-sustainability-challenge', title: 'AI for Sustainability Challenge', category: 'Competition', date: '2026-03-07', dateLabel: '7 March 2026', venue: 'Online',
    description: 'A student competition that challenged participants to address real-world sustainability issues using machine learning, held over a weekend.',
    image: '/events/neural.svg',
    audience: 'Students from any branch, teams of 1 to 4',
    agenda: ['Problem statement released', 'Build and submit over the weekend', 'Final evaluation and results'],
    highlights: [
      { label: 'Prize', value: 'Cash prizes for the top teams' },
      { label: 'Focus', value: 'Machine learning for sustainability' },
      { label: 'Impact', value: 'Data-driven climate solutions' },
    ],
  },
  {
    id: 'winter-projects-2', title: 'Winter Projects 2.0', category: 'Competition', date: '2026-01-10', dateLabel: '10 January 2026', venue: 'IIT (BHU) Varanasi',
    description: 'Winter Projects 2.0 gave students hands-on exposure to sustainability problem-solving in real organizational contexts, working through structured frameworks to reach clear deliverables.',
    image: '/events/workshop.svg',
    audience: 'Students from any branch, teams of 2 to 4',
    agenda: ['Framework briefing', 'Project execution with mentor check-ins', 'Final presentation'],
    highlights: [
      { label: 'Domains', value: 'Supply chain, ESG, climate analysis, sustainable finance' },
      { label: 'Approach', value: 'Framework-led project execution' },
      { label: 'Output', value: 'Defined deliverables with real-world relevance' },
    ],
  },
]

// Upcoming = dated today or later.
export const isUpcoming = (ev: CsiEvent, now = new Date()) => new Date(ev.date + 'T23:59:59') >= now

export const daysUntil = (ev: CsiEvent, now = new Date()) => {
  const d = new Date(ev.date + 'T00:00:00')
  const diff = d.getTime() - new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime()
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)))
}

export const getEvent = (id: string | undefined) => events.find((e) => e.id === id)

// Base URL of the registration backend (the server/ folder). Leave empty in development: Vite proxies /api to http://localhost:4000.
// In production set VITE_API_URL (for example https://api.yoursite.com) when the backend lives on a different domain.
export const apiUrl: string = (import.meta.env.VITE_API_URL as string | undefined)?.replace(/\/$/, '') ?? ''
