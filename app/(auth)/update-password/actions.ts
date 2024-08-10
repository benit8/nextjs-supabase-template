'use server';

import { getTranslations } from 'next-intl/server';
import { z } from 'zod';

import { createClient } from '@/lib/supabase/server';

type UpdateFormState = {
  success?: boolean;
  message: string;
  fields?: Record<string, string>;
};

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

export async function update(prevState: UpdateFormState, formData: FormData): Promise<UpdateFormState> {
  const t = await getTranslations();
  const data = Object.fromEntries(formData);
  const parsed = updateFormSchema.safeParse(data);
  if (!parsed.success) {
    return { message: t('Invalid data') };
  }

  const supabase = createClient();
  const { error } = await supabase.auth.updateUser({ password: parsed.data.password });
  if (error) {
    return { message: error.message, fields: parsed.data };
  }

  return { success: true, message: t('Your password was updated, you may login using it') };
}
