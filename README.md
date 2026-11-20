# Subscription Tracker UI

A React and TypeScript dashboard UI for tracking subscription costs, categories,
renewal dates, and reminders. The app currently uses local mock data.

## Features

- Dashboard summary cards and subscription table
- Filter subscriptions by category
- Brand icons and category breakdown chart
- Sidebar navigation for Home, Subscriptions, Calendar, Insights, and Settings

The other navigation pages are currently UI placeholders. Search, adding
subscriptions, and reminder toggles are not connected to persistent data.

## Requirements

- Node.js
- npm

## Getting started

Install dependencies and start the Vite development server:

```bash
npm install
npm run dev
```

Vite prints a local URL in the terminal after the server starts.

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Run TypeScript checks and create a production build |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

## Project structure

```text
src/
  pages/          One file per route (Overview, Subscriptions, Calendar, …)
  features/       Domain code that pages use
    <name>/
      api.ts          HTTP calls
      hooks.ts        React Query hooks
      types.ts        Domain types
      schema.ts       Zod form schemas (optional)
      constants.ts    Static domain data (optional)
      components/     Domain UI
      utils/          Pure domain helpers
  components/
    ui/             Generic primitives (Button, Dialog, DataTable, …)
    layout/         App shell (AppLayout, Sidebar, Panel)
    charts/         Generic charts
  api/            Shared HTTP client and React Query setup
  lib/            Domain-free helpers (format, greeting)
  routes/         Router and auth guards
  styles/         Theme tokens and base styles
```

Conventions:

- Import with the `@/` alias, never relative paths.
- Components are `PascalCase.tsx`; every other module is `kebab-case.ts`.
- Keep a type next to the code that owns it. Promote it to a shared place only
  when two features need it.
- When a placeholder page gains real logic, add `features/<name>/` for it.

The main dashboard is at `/`. Other configured routes are `/subscriptions`,
`/calendar`, `/insights`, and `/settings`.

## Tech stack

- React 19 and TypeScript
- Vite
- React Router
- Tailwind CSS 4
- React Icons and Lucide icons
- SVG-based category chart
