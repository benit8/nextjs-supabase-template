import { Metadata } from 'next';
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={fontSans.className}>
      <body className="bg-background text-foreground min-h-screen">
        <ReactQueryProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            {children}
            <Toaster richColors />
          </ThemeProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
