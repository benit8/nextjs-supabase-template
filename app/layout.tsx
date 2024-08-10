import { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import { Inter as FontSans } from 'next/font/google';

import { ReactQueryProvider } from '@/components/providers/query';
import { ThemeProvider } from '@/components/providers/theme';
import { Toaster } from '@/components/ui/sonner';
import { description as siteDescrition, title as siteTitle } from '@/config/site';

import './globals.css';

const fontSans = FontSans({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: siteTitle,
  description: siteDescrition,
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} className={fontSans.className}>
      <body className="bg-background text-foreground min-h-screen">
        <ReactQueryProvider>
          <NextIntlClientProvider messages={messages}>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
              {children}
              <Toaster richColors />
            </ThemeProvider>
          </NextIntlClientProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
