import { useState, type FormEvent } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { isAxiosError } from 'axios';
import { useLogin } from '@/hooks/api-hooks';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const login = useLogin();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const from = (location.state as { from?: string } | null)?.from ?? '/';

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    login.mutate(
      { email, password },
      { onSuccess: () => navigate(from, { replace: true }) }
    );
  }

  const errorMessage = login.isError
    ? isAxiosError(login.error) && login.error.response?.status === 401
      ? 'Email or password is incorrect'
      : 'Something went wrong. Try again.'
    : undefined;

  return (
    <div className="grid min-h-dvh place-items-center bg-canvas p-6">
      <div className="w-full max-w-100 rounded-xl border border-border bg-surface p-8 shadow-elevated">
        <h1 className="text-display font-semibold tracking-display text-fg">
          Welcome back
        </h1>
        <p className="mt-2 mb-6 text-body text-fg-muted">
          Sign in to keep track of your subscriptions
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            label="Email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            label="Password"
            type="password"
            autoComplete="current-password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errorMessage}
          />
          <Button type="submit" fullWidth disabled={login.isPending}>
            {login.isPending ? 'Signing in…' : 'Sign in'}
          </Button>
        </form>
      </div>
    </div>
  );
}
