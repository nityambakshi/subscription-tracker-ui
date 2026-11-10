import Sidebar from '@/components/layout/Sidebar';
import { Outlet } from 'react-router';

function App() {
  return (
    <main className="flex">
      <Sidebar />
      <Outlet />
    </main>
  );
}

export default App;
