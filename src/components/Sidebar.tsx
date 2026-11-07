import { useState } from 'react'

const sideNavOptions = [
  { id: 'overview', label: 'Overview' },
  { id: 'subscriptions', label: 'Subscriptions' },
  { id: 'calendar', label: 'Calendar' },
  { id: 'insights', label: 'Insights' },
  { id: 'settings', label: 'Settings' },
]

const navItemClass =
  'rounded-md px-2.5 py-2 text-body text-fg-muted transition-colors duration-fast hover:bg-surface-2 hover:text-fg hover:cursor-pointer'
const activeNavItemClass = 'bg-accent-soft text-ring font-semibold'

const Sidebar = () => {
  const [activeNavId, setActiveNavId] = useState('overview')

  return (
    <section className="flex h-screen w-1/4 flex-col justify-center gap-7 border border-border bg-surface px-4 py-6">
      <h1 className="text-heading font-semibold tracking-tight text-fg">
        Recur
      </h1>

      <div className="flex-1 flex-col gap-1">
        {sideNavOptions.map((option) => (
          <div
            key={option.id}
            className={`${navItemClass} ${activeNavId === option.id ? activeNavItemClass : ''}`}
            onClick={() => setActiveNavId(option.id)}
          >
            {option.label}
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-1 rounded-lg bg-surface-2 p-3">
        <p className="text-label font-semibold">Monthly Budget</p>
        <p className="text-small text-fg-muted">$92 of $180. 51% used</p>
      </div>
    </section>
  )
}

export default Sidebar