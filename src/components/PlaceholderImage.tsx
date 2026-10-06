// Plain box shown wherever a photo will go later.
export default function PlaceholderImage({ label = 'Photo', round = false, className = '' }: { label?: string; round?: boolean; className?: string }) {
  return (
    <div role="img" aria-label={label || 'Logo'}
      className={`flex items-center justify-center bg-muted text-sm text-muted-foreground ${round ? 'rounded-full' : 'rounded-xl'} ${className}`}>
      {label}
    </div>
  )
}
