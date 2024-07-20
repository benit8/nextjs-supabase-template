import { ReactNode } from 'react';

import { Icon as SiteIcon, title as siteTitle } from '@/config/site';

export default function HeroAuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen container w-full lg:max-w-none md:grid lg:grid-cols-2 lg:px-0">
      {/* Hero */}
      <div className="hidden lg:flex flex-col justify-between p-10 bg-zinc-900 text-white dark:border-r">
        <div className="flex gap-2 items-center text-lg font-medium">
          <SiteIcon size={22} />
          {siteTitle}
        </div>
        <blockquote className="space-y-2">
          <p className="text-lg">
            “This library has saved me countless hours of work and helped me deliver stunning designs to my clients
            faster than ever before.”
          </p>
          <footer className="text-sm">Sofia Davis</footer>
        </blockquote>
      </div>

      <div className="relative flex items-center justify-center py-8">{children}</div>
    </div>
  );
}
