'use client';

import { useState } from 'react';
import styles from './bidbox.module.css';
import Pusher from 'pusher-js';

interface Props {
  id: string;
  price: number;
  bidCount: number;
}

Pusher.logToConsole = true;
const pusher = new Pusher('48a91d99d52f3a702af0', { cluster: 'us2' });
const channel = pusher.subscribe('my-channel2');

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
    setNumberOfBids(nextBidCount)
    sendBid({id: props.id, price: nextBidPrice, bidCount: nextBidCount})

    channel.bind('my-event', function (data: { message: string }) {
      console.log(JSON.stringify(data.message));
      setPrice(Number(data.message))
    });
  }

  return (
    <div>
      <p>Current Bid ${price}</p>
      <p># bids: {numberOfBids}</p>
      <button onClick={makeBid}>Bid</button>
    </div>
  );
}
