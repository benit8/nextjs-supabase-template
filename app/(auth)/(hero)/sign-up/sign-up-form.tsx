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
import { Input, PasswordInput } from '@/components/ui/input';

import { signUp } from './actions';

const signUpFormSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(6).max(32),
});

export function SignUpForm() {
  const t = useTranslations();

  const [state, formAction] = useFormState(signUp, { message: '' });

  const formRef = useRef<HTMLFormElement>(null);

  const form = useForm<z.infer<typeof signUpFormSchema>>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: { email: '', password: '', ...(state?.fields ?? {}) },
  });

  useEffect(() => {
    if (state.message !== '') {
      if (state.success) toast.success(t('Sign up successful'));
      else toast.error(t('Sign up error'), { description: state.message });
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

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('Password')}</FormLabel>
              <FormControl>
                <PasswordInput id="password" placeholder="••••••••" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <SubmitButton>{t('Sign up')}</SubmitButton>
      </form>
    </Form>
  );
}
