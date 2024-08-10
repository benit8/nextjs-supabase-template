import { redirect } from 'next/navigation';
import { ReactNode } from 'react';

import { Header } from '@/components/header';
import { SideBar } from '@/components/side-bar';
import { unauthenticatedUrl } from '@/config/auth';
import { createClient } from '@/lib/supabase/server';

export default async function AppLayout({ children }: { children: ReactNode }) {
  const supabase = createClient();
  const { error, data } = await supabase.auth.getUser();
  if (error || !data.user) return redirect(unauthenticatedUrl);

  return (
    <div className="grid min-h-screen w-full grid-cols-[1fr] md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <SideBar />

      <div className="grid grid-rows-[3.5rem_1fr] max-h-screen">
        <Header />

        <main className="gap-4 lg:gap-6 p-4 overflow-scroll">{children}</main>
      </div>
    </div>
  );
}
