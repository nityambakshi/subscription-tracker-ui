import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { useSignup } from '@/hooks/auth-hooks';
import { isAxiosError } from 'axios';
import { useState, type SubmitEvent } from 'react';
import { Link, useNavigate } from 'react-router';

type FieldErrors = {
  name?: string;
  email?: string;
  password?: string;
  form?: string;
};

function Signup() {
  const navigate = useNavigate();
  const {
    mutate,
    isPending: isSignupPending,
    isError: isSignupError,
    error: signupError,
    reset: resetSignup,
  } = useSignup();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

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
    if (isSignupError) resetSignup();
  };

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    resetSignup();

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    const nextErrors: FieldErrors = {};

    if (!trimmedName && !trimmedEmail && !password) {
      nextErrors.form = 'Please fill in all fields';
    } else if (!trimmedName) {
      nextErrors.name = 'Please enter a full name';
    } else if (!trimmedEmail) {
      nextErrors.email = 'Please enter an email';
    } else if (!password) {
      nextErrors.password = 'Please enter a password';
    }

    if (
      nextErrors.name ||
      nextErrors.email ||
      nextErrors.password ||
      nextErrors.form
    ) {
      setFieldErrors(nextErrors);
      return;
    }

    setFieldErrors({});

    mutate(
      { name: trimmedName, email: trimmedEmail, password: password },
      { onSuccess: () => navigate('/', { replace: true }) }
    );
  };

  let errorMessages: string | undefined;
  if (isSignupError) {
    errorMessages = 'Something went wrong. Try again.';
    if (isAxiosError<{ detail?: string }>(signupError)) {
      errorMessages = signupError.response?.data?.detail ?? errorMessages;
    }
  }

  const signupErrorMessage = fieldErrors.form ?? errorMessages;

  return (
    <main className="flex min-h-dvh items-center justify-center bg-canvas">
      <Card className="w-full max-w-md p-8">
        <section className="flex flex-col gap-6">
          <div className="text-title font-semibold text-fg">Recur</div>

          <div className="flex flex-col gap-1.5">
            <h1 className="text-display font-semibold text-fg">
              Create your account
            </h1>
            <p className="text-body text-fg-muted">
              Start tracking your subscriptions in one place
            </p>
          </div>

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <Input
              label="Full Name"
              type="text"
              autoComplete="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                clearErrorsOnEdit('name', 'form');
              }}
              placeholder="John Doe"
              error={fieldErrors.name}
            />
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
              autoComplete="new-password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                clearErrorsOnEdit('password', 'form');
              }}
              placeholder="********"
              error={fieldErrors.password}
            />

            {signupErrorMessage && (
              <p className="text-small text-danger">{signupErrorMessage}</p>
            )}

            <Button type="submit" fullWidth disabled={isSignupPending}>
              {isSignupPending ? 'Creating account...' : 'Create account'}
            </Button>
          </form>

          <aside className="flex flex-col justify-center items-center gap-6 text-small text-fg-muted">
            <p>By signing up you agree to our Terms and Privacy Policy.</p>
            <p>
              Already have an account?{' '}
              <Link className="text-label text-accent" to="/login">
                Login
              </Link>
            </p>
          </aside>
        </section>
      </Card>
    </main>
  );
}

export default Signup;
