import Sidebar from '@/components/layout/Sidebar';
import { Outlet } from 'react-router';

function AppLayout() {
  return (
    <main className="flex">
      <Sidebar />
      <Outlet />
    </main>
  );
}

export default AppLayout;
