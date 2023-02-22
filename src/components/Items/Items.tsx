import Image from 'next/image';
import Link from 'next/link';
import Item from '../Item/Item';
import styles from './items.module.css';
import {items} from './sampleItems'

export default function Items() {

  return (
    <div className={styles.itemsGridContainer}>
      {items.map(item => <Item key={item.id} item={item}/>)}
    </div>
  );
}
