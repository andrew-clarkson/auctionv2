import { UserButton } from '@clerk/nextjs/app-beta';
import { SignedIn, SignedOut } from "@clerk/nextjs/app-beta/client";
import Link from 'next/link';
import styles from './navbar.module.css';

export default function Nav() {

  return (
    <nav className={styles.navBar}>
      <Link href="/" className={styles.logo}>
        <h1>AUCTION v2</h1>
      </Link>

      <div className={styles.navButtons}>
        <SignedIn>
          <Link href="/additem">
          <button className="">Add Item</button>
        </Link>
        </SignedIn>

        <SignedOut>
          <Link href="/sign-up">
          <button className="">Register</button>
          </Link>
          <Link href="/sign-in">
            <button className="">Log In</button>
          </Link>
        </SignedOut>

        <Link href="/">
          <button>Auctions</button>
        </Link>
        <UserButton />
      </div>
    </nav>
  );
}
