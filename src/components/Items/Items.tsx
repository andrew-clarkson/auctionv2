import Item from '../Item/Item';
import styles from './items.module.css';

interface Item {
  id: string;
  title: string;
  description: string;
  photoUrl: string;
  price: number;
  bidCount: number
}

async function getData() {
  const res = await fetch('http://localhost:3000/api/items');
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  // handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch items data');
  }

  return res.json();
}

export default async function Items() {
  const items: Item[] = await getData();
  items.forEach(item => {
    item.price = Number(item.price)
    item.bidCount = Number(item.bidCount)
  })

  return (
    <div className={styles.itemsGridContainer}>
      {items.map((item) => (
        <Item key={item.id} item={item} />
      ))}
    </div>
  );
}
