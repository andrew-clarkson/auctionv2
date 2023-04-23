import Item from '../Item/Item';
import styles from './items.module.css';
import { prisma } from 'utils/prisma';

// interface Item {
//   id: string;
//   title: string;
//   description: string;
//   photoUrl: string;
//   price: number;
//   bidCount: number;
// }

async function getData() {
  // call db directly in server components
  const items = await prisma.item.findMany();
  return items;
}

export default async function Items() {
  const items = await getData();
  items.forEach((item) => {
    // item.price = Number(item.price);
    item.bidCount = Number(item.bidCount);
  });

  return (
    <div className={styles.itemsGridContainer}>
      {items.map((item) => (
        <Item key={item.id} item={item} />
      ))}
    </div>
  );
}
