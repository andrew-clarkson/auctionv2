'use client';

import { useState } from 'react';
import styles from './bidbox.module.css';

interface Props {
  id: string;
  price: number;
  bidCount: number;
}

export default function BidBox(props: Props) {
  const [price, setPrice] = useState(props.price)
  const [numberOfBids, setNumberOfBids] = useState(props.bidCount)

  const sendBid = async (nextBid: {price: number, id: string, bidCount: number}) => {
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
    sendBid({id: props.id, price: nextBidPrice, bidCount: nextBidCount})
  }

  return (
    <div>
      <p>Current Bid ${price}</p>
      <p># bids: {numberOfBids}</p>
      <button onClick={makeBid}>Bid</button>
    </div>
  );
}
