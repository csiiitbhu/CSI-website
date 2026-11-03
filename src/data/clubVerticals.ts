export type Kind = 'ai' | 'sde' | 'creative' | 'esg'

export interface Vertical {
  slug: string
  name: string
  glyph: string
  kind: Kind
  tagline: string
  description: string
  focus: string[]
}

export const clubVerticals: Vertical[] = [
  {
    slug: 'ai-ml',
    name: 'AI/ML',
    glyph: 'AI',
    kind: 'ai',
    tagline: 'Intelligence for a greener world',
    description:
      'We explore machine learning and data science to model climate, optimise resources and build smarter systems.',
    focus: ['Applied ML projects', 'Climate & energy data', 'Reading groups'],
  },
  {
    slug: 'sde',
    name: 'SDE',
    glyph: '</>',
    kind: 'sde',
    tagline: 'Software that scales with purpose',
    description:
      'We design and ship web, mobile and open-source tools that put sustainability ideas into people\'s hands.',
    focus: ['Full-stack builds', 'Open source', 'Hackathons'],
  },
  {
    slug: 'creatives',
    name: 'Creatives',
    glyph: '✦',
    kind: 'creative',
    tagline: 'Stories that move people',
    description:
      'Design, media and storytelling that turn complex ideas into campaigns, visuals and experiences.',
    focus: ['Brand & design', 'Photo & video', 'Campaigns'],
  },
  {
    slug: 'esg-consulting',
    name: 'ESG & Consulting',
    glyph: '♻',
    kind: 'esg',
    tagline: 'Strategy for responsible change',
    description:
      'We research ESG frameworks and advise on practical, measurable sustainability strategies.',
    focus: ['ESG case studies', 'Impact reports', 'Consulting sprints'],
  },
]
