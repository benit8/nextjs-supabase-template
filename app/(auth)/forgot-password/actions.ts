'use server';

import { z } from 'zod';

import { createClient } from '@/lib/supabase/server';

type ResetFormState = {
  success?: boolean;
  message: string;
  fields?: Record<string, string>;
};

const resetFormSchema = z.object({
  email: z.string().trim().email(),
});

export async function reset(prevState: ResetFormState, formData: FormData): Promise<ResetFormState> {
  const data = Object.fromEntries(formData);
  const parsed = resetFormSchema.safeParse(data);
  if (!parsed.success) {
    return { message: 'Invalid data' };
  }

  const supabase = createClient();
  const { error } = await supabase.auth.resetPasswordForEmail(parsed.data.email, {
    redirectTo: `/update-password`,
  });
  if (error) {
    return { message: error.message, fields: parsed.data };
  }

  return { success: true, message: 'Check your emails for a magic link.' };
}
