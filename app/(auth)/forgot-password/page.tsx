import { useTranslations } from 'next-intl';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import { ResetForm } from './reset-form';

export default function Forgot() {
  const t = useTranslations();

  return (
    <div className="min-h-screen container flex flex-1 flex-col gap-y-8 items-center md:justify-center py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">{t('Reset your password')}</CardTitle>
          <CardDescription>{t('Enter your email below to receive a magic link')}.</CardDescription>
        </CardHeader>
        <CardContent>
          <ResetForm />
        </CardContent>
      </Card>
    </div>
  );
}
