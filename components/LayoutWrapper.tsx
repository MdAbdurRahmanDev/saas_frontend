"use client";

import { usePathname } from 'next/navigation';
import AppLayout from './AppLayout';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // If the user is on the login page, don't show the sidebar and header
  if (pathname === '/login') {
    return <>{children}</>;
  }

  return <AppLayout>{children}</AppLayout>;
}
