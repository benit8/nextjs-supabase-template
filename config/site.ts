import { Home, Package } from 'lucide-react';

export const locales = ['en', 'fr', 'jp'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

export const title = 'Template';
export const Icon = Package;
export const description = 'Lorem ipsum';

export const navigationLinks = (t: (key: string) => string) => [
  {
    title: t('Home'),
    href: '/',
    icon: Home,
  },
];
