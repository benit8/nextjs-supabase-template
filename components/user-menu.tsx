'use client';

import { useQuery } from '@tanstack/react-query';
import { Languages, LogOut, Sun, User } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Locale } from '@/config/site';
import { createClient } from '@/lib/supabase/client';
import { getUserLocale, setUserLocale } from '@/lib/user-locale';

import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Skeleton } from './ui/skeleton';

export function UserMenu() {
  const supabase = createClient();

  const t = useTranslations();
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  const [locale, setDisplayedLocale] = useState<Locale | undefined>();

  const { data: displayName, isFetching } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      if (error) throw error;
      return user?.user_metadata.display_name ?? user?.email?.substring(0, user?.email?.indexOf('@'));
    },
  });

  useEffect(() => {
    (async () => {
      setDisplayedLocale(await getUserLocale());
    })();
  }, []);

  return isFetching ? (
    <Skeleton className="w-10 h-10" />
  ) : (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <User size={20} />
          <span className="sr-only">Toggle user menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>{displayName}</DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Languages className="mr-2 h-4 w-4" />
            {t('Language')}
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuRadioGroup
                value={locale}
                onValueChange={(value) => {
                  const locale = value as Locale;
                  setUserLocale(locale);
                  setDisplayedLocale(locale);
                }}
              >
                <DropdownMenuRadioItem value="en">English</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="fr">Français</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="jp">日本語</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>

        <DropdownMenuSeparator />

        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Sun className="mr-2 h-4 w-4" />
            {t('Theme')}
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
                <DropdownMenuRadioItem value="light">{t('Light')}</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="dark">{t('Dark')}</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="system">{t('System')}</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={() => router.push('/logout')}>
          <LogOut className="mr-2 h-4 w-4" />
          {t('Log out')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
