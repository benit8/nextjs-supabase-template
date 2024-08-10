'use client';

import { ChevronDown, Languages } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { ReactNode } from 'react';

import { setUserLocale } from '@/lib/user-locale';
import { cn } from '@/lib/utils';

import { Button } from './ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';

export function LanguageSwitch({ className, trigger }: { className?: string; trigger?: ReactNode }) {
  const t = useTranslations();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {trigger ?? (
          <Button variant="ghost" className={cn('gap-2', className)}>
            <Languages size={20} />
            <ChevronDown size={18} />
            <span className="sr-only">{t('Change language')}</span>
          </Button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setUserLocale('en')}>English</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setUserLocale('fr')}>Français</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setUserLocale('jp')}>日本語</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
