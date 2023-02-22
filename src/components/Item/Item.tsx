import Image from "next/image";
import Link from "next/link";
import styles from "./item.module.css";

interface Item {
  item: { title: string; auctioneer: string; img: string; price: number };
}

export default function Item(props: Item) {
  return (
    <div className={styles.itemContainer}>
      <Image src={props.item.img} width={300} height={200} alt="auction pic" />
      <div>
        <p className={styles.title}>{props.item.title}</p>
        <p className={styles.auctioneer}>{props.item.auctioneer}</p>
        <p>${props.item.price}</p>
      </div>
    </div>
  );
}
