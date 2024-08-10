'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Icon as SiteIcon, navigationLinks, title as siteTitle } from '@/config/site';
import { cn } from '@/lib/utils';

export function SideBar() {
  const t = useTranslations();
  const path = usePathname();

  return (
    <div className="hidden md:flex flex-col h-full max-h-screen bg-muted/40 border-r">
      <div className="flex h-14 items-center border-b px-4">
        <div className="flex gap-3 items-center font-semibold">
          <SiteIcon size={22} />
          {siteTitle}
        </div>
      </div>

      <nav className="grid gap-y-1 items-start p-2 text-sm border-b font-medium">
        {navigationLinks(t).map((link, i) => (
          <Link
            key={i}
            href={link.href}
            className={cn(
              'flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary',
              path === link.href ? 'bg-secondary' : 'text-muted-foreground',
            )}
          >
            <link.icon className="w-4 h-4" />
            {link.title}
          </Link>
        ))}
      </nav>
    </div>
  );
}
