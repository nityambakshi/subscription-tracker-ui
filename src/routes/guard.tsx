import { Navigate, Outlet, useLocation } from 'react-router';
import { useMe } from '@/hooks/auth-hooks';

// For pages that need a login (the app layout)
export function RequireAuth() {
  const me = useMe();
  const location = useLocation();

  if (me.isPending) return null;
  if (me.isError)
    return (
      <p className="p-8 text-body text-danger">Could not check your session.</p>
    );
  if (!me.data) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }
  return <Outlet />;
}

// For the login page: logged-in users shouldn't see it
export function RedirectIfAuthed() {
  const me = useMe();

  if (me.isPending) return null;
  if (me.data) return <Navigate to="/" replace />;
  return <Outlet />;
}
