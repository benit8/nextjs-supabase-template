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
import { PasswordInput } from '@/components/ui/input';

import { update } from './actions';

const updateFormSchema = z
  .object({
    /// FIXME: localized error messages
    password: z.string().trim().min(6),
    passwordConfirm: z.string().trim().min(6),
  })
  .refine(({ password, passwordConfirm }) => password === passwordConfirm, {
    message: 'Passwords must match.',
    path: ['passwordConfirm'],
  });

export function UpdateForm() {
  const t = useTranslations();

  const [state, formAction] = useFormState(update, { message: '' });

  const formRef = useRef<HTMLFormElement>(null);

  const form = useForm<z.infer<typeof updateFormSchema>>({
    resolver: zodResolver(updateFormSchema),
    defaultValues: { password: '', passwordConfirm: '', ...(state?.fields ?? {}) },
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
          name="password"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center">
                <FormLabel>{t('Password')}</FormLabel>
              </div>
              <FormControl>
                <PasswordInput id="password" placeholder="••••••••" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="passwordConfirm"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center">
                <FormLabel>{t('Confirm password')}</FormLabel>
              </div>
              <FormControl>
                <PasswordInput id="passwordConfirm" placeholder="••••••••" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <SubmitButton>{t('Save')}</SubmitButton>
      </form>
    </Form>
  );
}
