'use client';
import Link from 'next/link';
import styles from './navbar.module.css';
import { useSession, signIn, signOut } from 'next-auth/react';

export default function AuthButtons() {
  const { data: session, status } = useSession();
  const userEmail = session?.user?.email;

  if (status === 'loading') {
    return <p>Hang on there...</p>;
    // use suspense? here
  }

  if (status === 'authenticated') {
    return (
      <div className={styles.navButtons}>
        <p>Signed in as {userEmail}</p>
        <Link href='/additem'>
          <button className=''>Add Item</button>
        </Link>
        <button onClick={() => signOut()}>Sign out</button>
      </div>
    );
  }

  return (
    <div className={styles.navButtons}>
      <p>Not signed in.</p>
      <button onClick={() => signIn('github')}>Sign in</button>
    </div>
  );
}
