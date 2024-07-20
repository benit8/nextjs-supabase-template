import Link from 'next/link';
import { notFound } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { enableSignUp } from '@/config/auth';

import { SignUpForm } from './sign-up-form';

export default function SignUp() {
  if (!enableSignUp) {
    return notFound();
  }

  return (
    <>
      <Button asChild variant="ghost" className="absolute top-8 right-8">
        <Link href="/login">Login</Link>
      </Button>

      <div className="grid gap-6 max-w-sm">
        <div className="grid gap-2 text-center">
          <h1 className="text-2xl font-bold">Sign up</h1>
          <p className="text-balance text-muted-foreground">Enter your information to create an account</p>
        </div>
        <div className="flex flex-col gap-y-4">
          <SignUpForm />
        </div>
        <p className="px-8 text-center text-sm text-muted-foreground">
          By clicking continue, you agree to our{' '}
          <Link className="underline underline-offset-4 hover:text-primary" href="/terms">
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link className="underline underline-offset-4 hover:text-primary" href="/privacy">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </>
  );
}
