'use client';

import { usePathname } from 'next/navigation';
import { AppLayout } from './app-layout';

interface ConditionalLayoutProps {
  children: React.ReactNode;
}

export function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname();
  const isAuthPage = pathname?.startsWith('/auth');

  // Don't apply AppLayout for auth pages
  if (isAuthPage) {
    return <>{children}</>;
  }

  // Apply AppLayout for all other pages
  return <AppLayout>{children}</AppLayout>;
} 