import { Globe, Leaf, Lightbulb, Recycle, Sprout, Users } from 'lucide-react'
const icons = { leaf: Leaf, bulb: Lightbulb, users: Users, recycle: Recycle, globe: Globe, sprout: Sprout }
export default function VerticalIcon({ name }: { name: string }) {
  const Icon = icons[name as keyof typeof icons] ?? Leaf
  return <Icon className="size-8" aria-hidden />
}
