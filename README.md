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
  components/   Reusable layout, chart, and UI components
  constants/    Mock dashboard and subscription data
  routes/       React Router configuration
  screens/      Application pages
  types/        TypeScript types
  util/         Formatting and data helpers
```

The main dashboard is at `/`. Other configured routes are `/subscriptions`,
`/calendar`, `/insights`, and `/settings`.

## Tech stack

- React 19 and TypeScript
- Vite
- React Router
- Tailwind CSS 4
- React Icons and Lucide icons
- SVG-based category chart
