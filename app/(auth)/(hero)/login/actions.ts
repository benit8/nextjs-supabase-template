'use server';

import { getTranslations } from 'next-intl/server';
import { redirect } from 'next/navigation';
import { z } from 'zod';

import { authenticatedUrl } from '@/config/auth';
import { createClient } from '@/lib/supabase/server';

type LoginFormState = {
  success?: boolean;
  message: string;
  fields?: Record<string, string>;
};

const loginFormSchema = z.object({
  /// FIXME: localized error messages
  email: z.string().trim().email(),
  password: z.string().min(6).max(32),
});

export async function login(prevState: LoginFormState, formData: FormData): Promise<LoginFormState> {
  const t = await getTranslations();
  const data = Object.fromEntries(formData);
  const parsed = loginFormSchema.safeParse(data);
  if (!parsed.success) {
    return { message: t('Invalid data') };
  }

  const supabase = createClient();
  const { error } = await supabase.auth.signInWithPassword(parsed.data);

  if (error) {
    return { message: error.message, fields: parsed.data };
  }

  redirect(authenticatedUrl);
}
