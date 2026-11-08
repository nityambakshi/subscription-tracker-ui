type CardProps = {
  className?: string
  children: React.ReactNode
}

export function Card({ className = '', children }: CardProps) {
  return (
    <div className={['rounded-xl border border-border bg-surface shadow-card', className].join(' ')}>
      {children}
    </div>
  )
}