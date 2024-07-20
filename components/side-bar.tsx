'use client';

import { Ellipsis } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Icon as SiteIcon, navigationLinks, title as siteTitle } from '@/config/site';
import { createClient } from '@/lib/supabase/client';
import { cn } from '@/lib/utils';

import { Button } from './ui/button';
import { UserMenu } from './user-menu';

export function SideBar() {
  const supabase = createClient();
  const path = usePathname();

  const [displayName, setDisplayName] = useState<string>('User');

  useEffect(() => {
    (async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      if (!error)
        setDisplayName(user?.user_metadata.display_name ?? user?.email?.substring(0, user?.email?.indexOf('@')));
    })();
  }, [supabase]);

  return (
    <div className="hidden md:flex flex-col h-full max-h-screen gap-2 bg-muted/40 border-r">
      <div className="flex h-14 lg:h-[60px] items-center border-b px-4 lg:px-6">
        <div className="flex gap-2 items-center font-semibold">
          <SiteIcon size={22} />
          {siteTitle}
        </div>
      </div>

      <div className="flex-1">
        <nav className="grid items-start px-2 lg:px-4 text-sm font-medium">
          {navigationLinks.map((link, i) => (
            <Link
              key={i}
              href={link.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary',
                path === link.href ? 'text-primary bg-muted' : 'text-muted-foreground',
              )}
            >
              <link.icon className="w-4 h-4" />
              {link.title}
            </Link>
          ))}
        </nav>
      </div>

      <div className="mt-auto p-4 mb-2">
        <UserMenu
          trigger={
            <Button variant="outline" className="flex w-full justify-between">
              {displayName} <Ellipsis size={20} />
              <span className="sr-only">Toggle user menu</span>
            </Button>
          }
        />
      </div>
    </div>
  );
}
