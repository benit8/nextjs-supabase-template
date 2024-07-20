'use server';

import { redirect } from 'next/navigation';
import { z } from 'zod';

import { createClient } from '@/lib/supabase/server';

type SignUpFormState = {
  success?: boolean;
  message: string;
  fields?: Record<string, string>;
};

const signUpFormSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(6).max(32),
});

export async function signUp(prevState: SignUpFormState, formData: FormData): Promise<SignUpFormState> {
  const data = Object.fromEntries(formData);
  const parsed = signUpFormSchema.safeParse(data);
  if (!parsed.success) {
    return { message: 'Invalid data' };
  }

  const supabase = createClient();

  const {
    data: { session },
    error,
  } = await supabase.auth.signUp(parsed.data);
  if (error) {
    return { message: error.message, fields: parsed.data };
  }

  if (session) redirect('/');

  return { success: true, message: 'Check your emails for an account activation link!' };
}
