import Image from 'next/image';
import Link from 'next/link';
import BidBox from '../BidBox/BidBox';
import DeleteButton from '../Buttons/DeleteButton';
import styles from './item.module.css';
import SessionProviderWrapper from 'src/providers/SessionProviderWrapper'

interface Props {
  item: {
    id: string;
    title: string;
    description: string;
    photoUrl: string;
    price: number;
    bidCount: number;
  };
}

export default function Item(props: Props) {
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
        <Link href={`/item/${props.item.id}`}>View</Link>

        <SessionProviderWrapper>
          <BidBox
            id={props.item.id}
            price={props.item.price}
            bidCount={props.item.bidCount}
          />
        </SessionProviderWrapper>

        <div className={styles.buttonsSection}>
          <Link href={`/editItem/${props.item.id}`}>
            <button>Edit</button>
          </Link>
          <DeleteButton id={props.item.id} />
        </div>
      </div>
    </div>
  );
}
