import { redirect } from 'next/navigation';

import { Pre } from '@/components/ui/pre';
import { unauthenticatedUrl } from '@/config/auth';
import { createClient } from '@/lib/supabase/server';

export default async function Index() {
  const supabase = createClient();
  const { error, data } = await supabase.auth.getUser();
  if (error || !data.user) redirect(unauthenticatedUrl);

  return (
    <>
      <Pre>{JSON.stringify(data.user, null, 2)}</Pre>
    </>
  );
}
