'use client'
import Link from 'next/link';
import AuthButtons from './AuthButtons';
import styles from './navbar.module.css';
import { SessionProvider } from 'next-auth/react';

export default function Nav() {
  return (
    <nav className={styles.navBar}>
      <Link href='/' className={styles.logo}>
        <h1>AUCTION v2</h1>
      </Link>
      <SessionProvider>
        <AuthButtons />
      </SessionProvider>
    </nav>
  );
}
