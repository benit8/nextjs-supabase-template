'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { useFormState } from 'react-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { SubmitButton } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input, PasswordInput } from '@/components/ui/input';

import { login } from './actions';

const loginFormSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(6).max(32),
});

export function LoginForm() {
  const [state, formAction] = useFormState(login, { message: '' });

  const formRef = useRef<HTMLFormElement>(null);

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: { email: '', password: '', ...(state?.fields ?? {}) },
  });

  useEffect(() => {
    if (state.message !== '') {
      if (state.success) toast.success('Login successful');
      else toast.error('Login error', { description: state.message });
    }
  }, [state]);

  return (
    <Form {...form}>
      <form
        ref={formRef}
        action={formAction}
        onSubmit={form.handleSubmit(() => formAction(new FormData(formRef.current!)))}
        className="flex flex-col gap-y-4"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email address</FormLabel>
              <FormControl>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  tabIndex={1}
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
              <div className="flex items-center">
                <FormLabel>Password</FormLabel>
                <Link href="/forgot-password" className="ml-auto inline-block text-sm underline" tabIndex={5}>
                  Forgot your password?
                </Link>
              </div>
              <FormControl>
                <PasswordInput id="password" placeholder="••••••••" tabIndex={2} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <SubmitButton tabIndex={3}>Login</SubmitButton>
      </form>
    </Form>
  );
}
