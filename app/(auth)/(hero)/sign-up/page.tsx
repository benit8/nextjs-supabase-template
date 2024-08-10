import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { LanguageSwitch } from '@/components/language-switch';
import { Button } from '@/components/ui/button';
import { enableSignUp } from '@/config/auth';

import { SignUpForm } from './sign-up-form';

export default function SignUp() {
  const t = useTranslations();

  if (!enableSignUp) {
    return notFound();
  }

  return (
    <>
      <div className="absolute top-8 flex justify-between items-center w-full md:px-8">
        <LanguageSwitch />

        <Button asChild variant="ghost">
          <Link href="/login">{t('Login')}</Link>
        </Button>
      </div>

      <div className="grid gap-6 max-w-sm">
        <div className="grid gap-2 text-center">
          <h1 className="text-2xl font-bold">{t('Sign up')}</h1>
          <p className="text-balance text-muted-foreground">{t('Enter your information to create an account')}</p>
        </div>
        <div className="flex flex-col gap-y-4">
          <SignUpForm />
        </div>
        <p className="px-8 text-center text-sm text-muted-foreground">
          {t.rich('By clicking continue, you agree to our <tos>Terms of Service</tos> and <pp>Privacy Policy</pp>', {
            tos: (chunks) => (
              <Link className="underline underline-offset-4 hover:text-primary" href="/terms">
                {chunks}
              </Link>
            ),
            pp: (chunks) => (
              <Link className="underline underline-offset-4 hover:text-primary" href="/privacy">
                {chunks}
              </Link>
            ),
          })}
          .
        </p>
      </div>
    </>
  );
}
