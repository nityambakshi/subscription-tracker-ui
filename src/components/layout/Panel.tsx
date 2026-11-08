import type { ReactNode } from 'react'

const sizes = {
  sidebar: 'w-58 gap-7 px-4 py-6',
  panel: 'w-85 gap-6 px-6 py-8',
} as const

type PanelProps = {
  side: 'left' | 'right'
  size: keyof typeof sizes
  children: ReactNode
  className?: string
}

export function Panel({ side, size, children, className = ''}: PanelProps) {
  const edge = side === 'left' ? 'border-r' : 'border-l'
  return (
    <aside
      className={[
        'flex h-dvh shrink-0 flex-col border-border bg-surface',
        edge, sizes[size], className,
      ].join(' ')}
    >
      {children}
    </aside>
  )
}