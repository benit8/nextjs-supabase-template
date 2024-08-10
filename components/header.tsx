'use client';

import { Inbox, Menu } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Icon as SiteIcon, navigationLinks, title as siteTitle } from '@/config/site';
import { cn } from '@/lib/utils';

import { NotificationMenu } from './notifications-menu';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { UserMenu } from './user-menu';

export function Header() {
  const t = useTranslations();
  const path = usePathname();

  console.log(path.split('/'));

  return (
    <header className="flex w-full h-14 items-center gap-4 px-2 md:px-4 bg-muted/40 border-b text-sm">
      {/* Mobile menu */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col p-4">
          <nav className="grid gap-y-2 text-lg font-medium">
            <Link href="/" className="flex items-center gap-3 rounded-xl px-3 py-2 hover:text-foreground">
              <SiteIcon size={24} />
              {siteTitle}
            </Link>
            {navigationLinks(t).map((link, i) => (
              <Link
                key={i}
                href={link.href}
                className={cn(
                  'flex items-center gap-3 rounded-xl px-3 py-2 hover:text-foreground',
                  path === link.href ? 'text-foreground bg-accent' : 'text-muted-foreground',
                )}
              >
                <link.icon className="h-5 w-5" />
                {link.title}
              </Link>
            ))}
          </nav>

          <div className="my-2"></div>
        </SheetContent>
      </Sheet>

      {/* Breadcrum */}
      <div>{navigationLinks(t).find((link) => link.href === path)?.title}</div>

      {/* Right-most icons */}
      <div className="ml-auto flex gap-2">
        <NotificationMenu />
        <UserMenu />
      </div>
    </header>
  );
}
