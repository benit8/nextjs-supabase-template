'use server';

import { getTranslations } from 'next-intl/server';
import { redirect } from 'next/navigation';
import { z } from 'zod';

import { authenticatedUrl } from '@/config/auth';
import { createClient } from '@/lib/supabase/server';

type SignUpFormState = {
  success?: boolean;
  message: string;
  fields?: Record<string, string>;
};

const signUpFormSchema = z.object({
  /// FIXME: localized error messages
  email: z.string().trim().email(),
  password: z.string().min(6).max(32),
});

export async function signUp(prevState: SignUpFormState, formData: FormData): Promise<SignUpFormState> {
  const t = await getTranslations();
  const data = Object.fromEntries(formData);
  const parsed = signUpFormSchema.safeParse(data);
  if (!parsed.success) {
    return { message: t('Invalid data') };
  }

  const supabase = createClient();

  const {
    data: { session },
    error,
  } = await supabase.auth.signUp(parsed.data);
  if (error) {
    return { message: error.message, fields: parsed.data };
  }

  if (session) redirect(authenticatedUrl);

  return { success: true, message: t('Check your emails for an account activation link') };
}
