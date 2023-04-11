'use client';
import { SessionProvider } from 'next-auth/react';

/**
 * Wrapper for components that use Auth.js hooks
 * Avoids making the parent component a client component
 * @param
 * @returns
 */
export default function SessionProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SessionProvider>{children}</SessionProvider>;
}
