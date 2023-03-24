import Image from 'next/image';
import Link from 'next/link';
import { isPropertySignature } from 'typescript';
import BidBox from '../BidBox/BidBox';
import styles from './item.module.css';

interface Props {
  item: {
    id: string;
    title: string;
    description: string;
    photoUrl: string;
    price: number;
  };
}

export default function Item(props: Props) {
  const deleteItem = async () => {
    const response = await fetch('/api/items', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(props.item.id),
    });
    const data = await response.json();
    // need error handling
    alert('deleted');
  };

  return (
    <div className={styles.itemContainer}>
      <Image
        className={styles.image}
        src={props.item.photoUrl}
        width={300}
        height={200}
        alt='auction pic'
      />
      <div className={styles.detailsSection}>
        <p className={styles.title}>{props.item.title}</p>
        <p className={styles.description}>{props.item.description}</p>

        <BidBox id={props.item.id} price={props.item.price} />

        <div className={styles.buttonsSection}>
          <Link href={`/editItem/${props.item.id}`} ><button>Edit</button></Link>
          <button onClick={deleteItem}>Delete</button>
        </div>
      </div>
    </div>
  );
}
