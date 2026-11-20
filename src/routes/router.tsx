import { createBrowserRouter } from 'react-router';
import AppLayout from '@/components/layout/AppLayout';
import Subscriptions from '@/pages/Subscriptions';
import Calendar from '@/pages/Calendar';
import Insights from '@/pages/Insights';
import Settings from '@/pages/Settings';
import Login from '@/pages/Login';
import { RedirectIfAuthed, RequireAuth } from './guard';
import Signup from '@/pages/Signup';
import Overview from '@/pages/Overview';

export const router = createBrowserRouter([
  {
    element: <RedirectIfAuthed />,
    children: [
      { path: '/login', element: <Login /> },
      { path: '/signup', element: <Signup /> },
    ],
  },
  {
    element: <RequireAuth />,
    children: [
      {
        element: <AppLayout />,
        children: [
          { path: '/', element: <Overview /> },
          { path: '/subscriptions', element: <Subscriptions /> },
          { path: '/calendar', element: <Calendar /> },
          { path: '/insights', element: <Insights /> },
          { path: '/settings', element: <Settings /> },
        ],
      },
    ],
  },
]);
