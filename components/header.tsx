'use client';

import { Menu } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Icon as SiteIcon, navigationLinks, title as siteTitle } from '@/config/site';
import { cn } from '@/lib/utils';

import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { UserMenu } from './user-menu';

export function Header() {
  const path = usePathname();

  return (
    <header className="md:hidden flex h-14 lg:h-[60px] items-center gap-4 px-4 lg:px-6 bg-muted/40 border-b">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          {/* Brand */}

          <nav className="grid gap-2 text-lg font-medium">
            <Link href="/" className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 hover:text-foreground">
              <SiteIcon size={24} />
              {siteTitle}
            </Link>
            {navigationLinks.map((link, i) => (
              <Link
                key={i}
                href={link.href}
                className={cn(
                  'mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 hover:text-foreground',
                  path === link.href ? 'text-foreground bg-muted' : 'text-muted-foreground',
                )}
              >
                <link.icon className="h-5 w-5" />
                {link.title}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>

      <div className="w-full flex flex-1 justify-between items-center">
        <div />
        <UserMenu />
      </div>
    </header>
  );
}
