import { useTranslations } from 'next-intl';
import Link from 'next/link';

import { LanguageSwitch } from '@/components/language-switch';
import { Button } from '@/components/ui/button';
import { enableSignUp } from '@/config/auth';

import { LoginForm } from './login-form';

export default function Login() {
  const t = useTranslations();

  return (
    <>
      <div className="absolute top-8 flex justify-between items-center w-full md:px-8">
        <LanguageSwitch />

        {enableSignUp ? (
          <Button asChild variant="ghost">
            <Link href="/sign-up">{t('Sign up')}</Link>
          </Button>
        ) : null}
      </div>

      {/* Card */}
      <div className="grid gap-6 max-w-sm">
        <div className="grid gap-2 text-center">
          <h1 className="text-2xl font-bold">{t('Login')}</h1>
          <p className="text-balance text-muted-foreground">{t('Enter your email below to login to your account')}</p>
        </div>
        <div className="flex flex-col gap-y-4">
          <LoginForm />
        </div>
      </div>
    </>
  );
}
