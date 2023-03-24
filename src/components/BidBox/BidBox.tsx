'use client';

import { useState } from 'react';
import styles from './bidbox.module.css';

interface Props {
  id: string;
  price: number;
}

export default function BidBox(props: Props) {
  const [price, setPrice] = useState(props.price)
  const [numberOfBids, setNumberOfBids] = useState(0)

  const sendBid = async (nextBid: {price: number, id: string}) => {
    const response = await fetch('/api/items', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(nextBid),
    });
    const data = await response.json();
  }

  const makeBid = (): void => {
    const nextBidPrice = price + 1
    const nextBidCount = numberOfBids + 1
    setPrice(nextBidPrice)
    setNumberOfBids(nextBidCount)
    sendBid({id: props.id, price: nextBidPrice})
  }

  return (
    <div>
      <p>Current Bid ${price}</p>
      <p># bids: {numberOfBids}</p>
      <button onClick={makeBid}>Bid</button>
    </div>
  );
}
