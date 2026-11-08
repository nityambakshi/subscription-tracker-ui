import { Panel } from './Panel'
import type { NavItem } from '../../types/types'
import { useState } from 'react'


const sideNavOptions: NavItem[] = [
  { id: 'overview', label: 'Overview', href: '/overview' },
  { id: 'subscriptions', label: 'Subscriptions', href: '/subscriptions' },
  { id: 'calendar', label: 'Calendar', href: '/calendar' },
  { id: 'insights', label: 'Insights', href: '/insights' },
  { id: 'settings', label: 'Settings', href: '/settings' },
]

const navItemClass =
  'rounded-md px-2.5 py-2 text-body text-fg-muted transition-colors duration-fast hover:bg-surface-2 hover:text-fg hover:cursor-pointer'
const activeNavItemClass = 'bg-accent-soft text-ring font-semibold'

function Sidebar() {
  const [activeNavId, setActiveNavId] = useState('overview')

  return (
    <Panel side="left" size="sidebar">
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
    </Panel>
  )
}

export default Sidebar