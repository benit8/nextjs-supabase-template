import { useTranslations } from 'next-intl';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import { UpdateForm } from './update-form';

export default function UpdatePassword() {
  const t = useTranslations();

  return (
    <div className="min-h-screen container flex flex-1 flex-col gap-y-8 items-center md:justify-center py-8">
      <Card className="min-w-80">
        <CardHeader>
          <CardTitle className="text-xl">{t('Reset your password')}</CardTitle>
          <CardDescription>{t('Choose a new password below')}.</CardDescription>
        </CardHeader>
        <CardContent>
          <UpdateForm />
        </CardContent>
      </Card>
    </div>
  );
}
