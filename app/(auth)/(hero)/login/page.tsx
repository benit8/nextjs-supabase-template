import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { enableSignUp } from '@/config/auth';

import { LoginForm } from './login-form';

export default function Login() {
  return (
    <>
      {enableSignUp ? (
        <Button asChild variant="ghost" className="absolute top-8 right-8">
          <Link href="/sign-up">Sign up</Link>
        </Button>
      ) : null}

      {/* Card */}
      <div className="grid gap-6 max-w-sm">
        <div className="grid gap-2 text-center">
          <h1 className="text-2xl font-bold">Login</h1>
          <p className="text-balance text-muted-foreground">Enter your email below to login to your account</p>
        </div>
        <div className="flex flex-col gap-y-4">
          <LoginForm />
        </div>
      </div>
    </>
  );
}
