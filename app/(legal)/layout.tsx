import { ReactNode } from 'react';

export default function LegalLayout({ children }: { children: ReactNode }) {
  return <div className="container max-w-4xl p-4">{children}</div>;
}
