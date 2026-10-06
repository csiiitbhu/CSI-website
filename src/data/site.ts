// Site-wide text. Replace "#" links with real ones.
export const site = {
  name: 'Club of Sustainability & Innovation',
  short: 'CSI',
  fullHeading: 'Club of Sustainability and Innovation',
  aboutTitle: 'About Us',
  about: 'The CSI Club of Sustainability aims to promote balance in economic, social, and environmental aspects. The club encourages students to understand that true development is not limited to economic growth, but also includes social responsibility and environmental protection.',
  verticalsTitle: 'Our Club Verticals',
  socials: [
    { id: 'whatsapp', label: 'WhatsApp', href: '#' },
    { id: 'instagram', label: 'Instagram', href: '#' },
    { id: 'linkedin', label: 'LinkedIn', href: '#' },
  ] as const,
  nav: [
    { to: '/', label: 'Home' },
    { to: '/our-team', label: 'Our Team' },
    { to: '/events', label: 'Events' },
    { to: '/gallery', label: 'Gallery' },
  ] as const,
}
