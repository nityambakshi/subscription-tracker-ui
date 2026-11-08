type SectionHeaderProps = {
    title: string
    meta?: string
}

export function SectionHeader({ title, meta }: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-body font-semibold text-fg">{title}</h2>
      {meta && <span className="text-small text-fg-muted">{meta}</span>}
    </div>
  )
}