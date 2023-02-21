import Image from 'next/image';
import Link from 'next/link';
import Item from '../Item/Item';
import styles from './items.module.css';

export default function Items() {
  return (
    <div className={styles.itemsGridContainer}>
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
    </div>
  );
}
