'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useEffect, useRef } from 'react';
import { useFormState } from 'react-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { SubmitButton } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { reset } from './actions';

const resetFormSchema = z.object({
  email: z.string().trim().email(),
});

export function ResetForm() {
  const t = useTranslations();

  const [state, formAction] = useFormState(reset, { message: '' });

  const formRef = useRef<HTMLFormElement>(null);

  const form = useForm<z.infer<typeof resetFormSchema>>({
    resolver: zodResolver(resetFormSchema),
    defaultValues: { email: '', ...(state?.fields ?? {}) },
  });

  useEffect(() => {
    if (state.message !== '') {
      if (state.success) toast.success(t('Success'), { description: state.message });
      else toast.error(t('Error'), { description: state.message });
    }
  }, [state, t]);

  return (
    <Form {...form}>
      <form ref={formRef} action={formAction} className="flex flex-col gap-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('Email address')}</FormLabel>
              <FormControl>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <SubmitButton>{t('Reset password')}</SubmitButton>
      </form>
    </Form>
  );
}
