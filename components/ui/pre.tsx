import { ReactNode, forwardRef } from 'react';

import { cn } from '@/lib/utils';

type PreProps = {
  children: ReactNode;
  className?: string;
};

export const Pre = forwardRef<HTMLPreElement, PreProps>(({ children, className, ...props }, ref) => {
  return (
    <pre ref={ref} className={cn('text-xs bg-muted p-2 rounded border', className)} {...props}>
      {children}
    </pre>
  );
});
Pre.displayName = 'Pre';
