import Image from 'next/image';
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
        src={props.item.photoUrl}
        width={300}
        height={200}
        alt='auction pic'
      />
      <div>
        <p className={styles.title}>{props.item.title}</p>
        <p className={styles.title}>{props.item.description}</p>
        {/* <p className={styles.auctioneer}>{props.item.auctioneer}</p> */}
        <p>${props.item.price}</p>
        <button>Bid</button>
        <button>Edit</button>
        <button onClick={deleteItem}>Delete</button>
      </div>
    </div>
  );
}
