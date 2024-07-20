'use server';

import { redirect } from 'next/navigation';
import { z } from 'zod';

import { createClient } from '@/lib/supabase/server';

type LoginFormState = {
  success?: boolean;
  message: string;
  fields?: Record<string, string>;
};

const loginFormSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(6).max(32),
});

export async function login(prevState: LoginFormState, formData: FormData): Promise<LoginFormState> {
  const data = Object.fromEntries(formData);
  const parsed = loginFormSchema.safeParse(data);
  if (!parsed.success) {
    return { message: 'Invalid data' };
  }

  const supabase = createClient();
  const { error } = await supabase.auth.signInWithPassword(parsed.data);

  if (error) {
    return { message: error.message, fields: parsed.data };
  }

  redirect('/');
}
