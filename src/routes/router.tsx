// src/routes/router.tsx
import { createBrowserRouter } from 'react-router';
import App from '@/App';
import Subscriptions from '@/screens/Subscriptions';
import Calendar from '@/screens/Calendar';
import Insights from '@/screens/Insights';
import Settings from '@/screens/Settings';
import Home from '@/screens/Home';

export const router = createBrowserRouter([
  {
    element: <App />, // the layout: Sidebar + <Outlet />
    children: [
      { path: '/', element: <Home /> },
      { path: '/subscriptions', element: <Subscriptions /> },
      { path: '/calendar', element: <Calendar /> },
      { path: '/insights', element: <Insights /> },
      { path: '/settings', element: <Settings /> },
    ],
  },
]);
