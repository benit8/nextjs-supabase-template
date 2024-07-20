import { redirect } from 'next/navigation';

import { unauthenticatedUrl } from '@/config/auth';
import { createClient } from '@/lib/supabase/server';

export default async function Index() {
  const supabase = createClient();
  const { error, data } = await supabase.auth.getUser();
  if (error || !data.user) redirect(unauthenticatedUrl);

  return <div>Home</div>;
}
