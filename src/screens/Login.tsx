import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { useLogin } from '@/hooks/api-hooks';
import { isAxiosError } from 'axios';
import { useState, type SubmitEvent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';

type FieldErrors = {
  email?: string;
  password?: string;
  form?: string;
};

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    isPending: isLoginPending,
    mutate,
    isError: isLoginError,
    error: loginError,
    reset: resetLogin,
  } = useLogin();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const redirectedToLoginFrom =
    (location.state as { from: string } | null)?.from ?? '/';

  const clearErrorsOnEdit = (...keys: (keyof FieldErrors)[]) => {
    setFieldErrors((prev) => {
      const next = { ...prev };
      let changed = false;
      for (const key of keys) {
        if (next[key]) {
          delete next[key];
          changed = true;
        }
      }
      return changed ? next : prev;
    });
    if (isLoginError) resetLogin();
  };

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    resetLogin();

    const trimmedEmail = email.trim();
    const nextErrors: FieldErrors = {};

    if (!trimmedEmail && !password) {
      nextErrors.form = 'Please fill in all fields';
    } else if (!trimmedEmail) {
      nextErrors.email = 'Please enter a valid email';
    } else if (!password) {
      nextErrors.password = 'Please enter a password';
    }

    if (nextErrors.email || nextErrors.password || nextErrors.form) {
      setFieldErrors(nextErrors);
      return;
    }

    setFieldErrors({});

    mutate(
      { email: trimmedEmail, password },
      {
        onSuccess: () => navigate(redirectedToLoginFrom, { replace: true }),
      }
    );
  };

  const loginErrorMessage = isLoginError
    ? isAxiosError(loginError) && loginError.response?.status === 401
      ? 'Invalid email or password'
      : 'Something went wrong. Try again.'
    : undefined;

  const formMessage = fieldErrors.form ?? loginErrorMessage;

  return (
    <main className="flex min-h-dvh items-center justify-center bg-canvas">
      <Card className="w-full max-w-md p-8">
        <section className="flex flex-col gap-6">
          <h3 className="font-semibold text-title">Recur</h3>

          <aside className="flex flex-col gap-1.5">
            <h1 className="text-display font-semibold">Welcome back</h1>
            <p className="text-body text-fg-muted">
              Sign in to keep track of your subscriptions
            </p>
          </aside>

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <Input
              label="Email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                clearErrorsOnEdit('email', 'form');
              }}
              placeholder="your@example.com"
              error={fieldErrors.email}
            />
            <Input
              label="Password"
              type="password"
              autoComplete="current-password"
              value={password}
              labelAction={
                <Link to="/forgot-password" className="text-label text-accent">
                  Forgot password?
                </Link>
              }
              onChange={(e) => {
                setPassword(e.target.value);
                clearErrorsOnEdit('password', 'form');
              }}
              placeholder="********"
              error={fieldErrors.password}
            />

            {formMessage && (
              <p className="text-small text-danger">{formMessage}</p>
            )}

            <Button type="submit" fullWidth disabled={isLoginPending}>
              {isLoginPending ? 'Signing in...' : 'Sign in'}
            </Button>

            <aside className="flex items-center justify-center gap-1 text-body text-fg-muted">
              <div>Don't have an account?</div>
              <Link to="/signup" className="text-label text-accent">
                Sign up
              </Link>
            </aside>
          </form>
        </section>
      </Card>
    </main>
  );
}

export default Login;
