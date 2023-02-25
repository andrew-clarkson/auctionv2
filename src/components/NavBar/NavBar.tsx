import Link from 'next/link';
import styles from './navbar.module.css';

export default function Nav() {
  return (
    <nav className={styles.navBar}>
      <Link href="/" className={styles.logo}>
        <h1>AUCTION v2</h1>
      </Link>

      <div className={styles.navButtons}>
        <Link href="/additem">
          <button className="">Add Item</button>
        </Link>
        <Link href="/login">
          <button className="">Sign Up</button>
        </Link>
        <Link href="/">
          <button>Auctions</button>
        </Link>
      </div>
    </nav>
  );
}
