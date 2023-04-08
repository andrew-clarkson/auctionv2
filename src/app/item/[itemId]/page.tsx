'use client';
import Image from 'next/image';
import Link from 'next/link';
import BidBox from '@root/components/BidBox/BidBox';
import styles from './item.module.css';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import SessionProviderWrapper from 'src/providers/SessionProviderWrapper'

interface Item {
  id: string;
  title: string;
  description: string;
  photoUrl: string;
  price: number;
  bidCount: number;
}

export default function Item({ params }: { params: { itemId: string } }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState<Item>();

  useEffect(() => {
    async function fetchItems() {
      const res = await fetch(`/api/items/${params.itemId}`);
      const item = await res.json();
      item.price = Number(item.price)
      setItem(item);
      setLoading(false);
    }
    fetchItems();
  }, [params.itemId]);

  const deleteItem = async () => {
    const response = await fetch('/api/items', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params.itemId),
    });
    const data = await response.json();
    // need error handling
    alert('deleted');
    router.push('/')

  };

  if (loading) return;

  return (
    <div className={styles.itemContainer}>
      <Image
        className={styles.image}
        src={item.photoUrl}
        width={300}
        height={200}
        alt='auction pic'
      />
      <div className={styles.detailsSection}>
        <p className={styles.title}>{item.title}</p>
        <p className={styles.description}>{item.description}</p>

        <SessionProviderWrapper>
          <BidBox id={item.id} price={item.price} bidCount={item.bidCount} />
        </SessionProviderWrapper>

        <div className={styles.buttonsSection}>
          <Link href={`/editItem/${item.id}`}>
            <button>Edit</button>
          </Link>
          <button onClick={deleteItem}>Delete</button>
        </div>
      </div>
    </div>
  );
}
