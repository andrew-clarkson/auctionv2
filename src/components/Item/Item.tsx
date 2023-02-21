import Image from 'next/image';
import Link from 'next/link';
import styles from './item.module.css';

export default function Item() {
  return (
    <div className={styles.itemContainer}>
      <Image
        src="https://picsum.photos/200/300"
        width={300}
        height={200}
        alt="auction pic"
      />
      <div>
        <p className={styles.title}>Item Title</p>
        <p className={styles.labels}>tags/labels</p>
        <p className={styles.auctioneer}>Auctioneer/Location</p>
      </div>
    </div>
  );
}
