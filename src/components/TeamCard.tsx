import Card from './Card'
import PlaceholderImage from './PlaceholderImage'
export default function TeamCard({ name, role }: { name: string; role: string }) {
  return (
    <Card className="flex flex-col items-center text-center">
      <PlaceholderImage round label="Photo" className="size-28" />
      <h3 className="mt-4 font-semibold">{name}</h3>
      <p className="text-sm text-muted-foreground">{role}</p>
    </Card>
  )
}
