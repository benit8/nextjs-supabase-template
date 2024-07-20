import { redirect } from 'next/navigation';
import { ReactNode } from 'react';

import { authenticatedUrl } from '@/config/auth';
import { createClient } from '@/lib/supabase/server';

export default async function AppLayout({ children }: { children: ReactNode }) {
  const supabase = createClient();
  const { error, data } = await supabase.auth.getUser();
  if (!error && data.user) return redirect(authenticatedUrl);

  return children;
}
