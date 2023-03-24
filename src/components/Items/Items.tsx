'use client';
import { useEffect, useState } from 'react';
import Item from '../Item/Item';
import styles from './items.module.css';

interface Item {
  id: string;
  title: string;
  description: string;
  photoUrl: string;
  price: number;
}

export default function Items() {
  // remove state/effect in future if you can make this a server component and only
  // have the bid/price info as client component
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    async function fetchItems() {
      const res = await fetch('/api/items');
      const items: Item[] = await res.json();
      // price is being fetched as a string, convert to number
      items.forEach(item => {
        item.price = Number(item.price)
      })
      setItems(items);
    }
    fetchItems();
  }, []);


  return (
    <div className={styles.itemsGridContainer}>
      {items.map((item) => (
        <Item key={item.id} item={item} />
      ))}
    </div>
  );
}
