import Link from 'next/link';
import AuthButtons from './AuthButtons';
import styles from './navbar.module.css';
import SessionProviderWrapper from 'src/providers/SessionProviderWrapper'

export default function Nav() {
  return (
    <nav className={styles.navBar}>
      <Link href='/' className={styles.logo}>
        <h1>AUCTION v2</h1>
      </Link>
      <SessionProviderWrapper>
        <AuthButtons />
      </SessionProviderWrapper>
    </nav>
  );
}
