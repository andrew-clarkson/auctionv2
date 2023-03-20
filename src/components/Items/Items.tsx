"use client"
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Item from '../Item/Item';
import styles from './items.module.css';
// import {items} from './sampleItems'
import { PrismaClient, Prisma } from '@prisma/client'

export default function Items() {
  const [items, setItems] = useState([])

  useEffect(() => {
    async function fetchItems() {
      const res = await fetch('/api/items');
      const data = await res.json();
      setItems(data);
    }
    fetchItems();
  }, []);

  return (
    <div className={styles.itemsGridContainer}>
      {items.map(item => <Item key={item.id} item={item}/>)}
    </div>
  );
}
