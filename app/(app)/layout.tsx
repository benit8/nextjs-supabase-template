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
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <SideBar />

      <div className="flex flex-col">
        <Header />

        <main className="flex flex-col flex-1 gap-4 lg:gap-6 p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}
