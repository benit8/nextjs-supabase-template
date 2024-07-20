'use server';

import { z } from 'zod';

import { createClient } from '@/lib/supabase/server';

type UpdateFormState = {
  success?: boolean;
  message: string;
  fields?: Record<string, string>;
};

const updateFormSchema = z
  .object({
    password: z.string().trim().min(6),
    passwordConfirm: z.string().trim().min(6),
  })
  .refine(({ password, passwordConfirm }) => password === passwordConfirm, {
    message: 'Passwords must match.',
    path: ['passwordConfirm'],
  });

export async function update(prevState: UpdateFormState, formData: FormData): Promise<UpdateFormState> {
  const data = Object.fromEntries(formData);
  const parsed = updateFormSchema.safeParse(data);
  if (!parsed.success) {
    return { message: 'Invalid data' };
  }

  const supabase = createClient();
  const { error } = await supabase.auth.updateUser({ password: parsed.data.password });
  if (error) {
    return { message: error.message, fields: parsed.data };
  }

  return { success: true, message: 'Your password was updated. You may login using it.' };
}
