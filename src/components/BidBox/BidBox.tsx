'use client';

import { useState, useEffect } from 'react';
import styles from './bidbox.module.css';
import {pusherConnection} from 'utils/pusher'

interface Props {
  id: string;
  price: number;
  bidCount: number;
}

const pusher = pusherConnection

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
    const nextBidPrice = price + 1;
    const nextBidCount = numberOfBids + 1;
    sendBid({ id: props.id, price: nextBidPrice, bidCount: nextBidCount });
  };

  useEffect(() => {
    const channel = pusher.subscribe(props.id);

    // whenever an event with the name my-event is triggered on the subscribed Pusher channel
    // the callback function defined in .bind() (a state update) will be called with the event data as its argument.
    channel.bind('my-event', (data: { price: number; bidCount: number }) => {
      setPrice(Number(data.price));
      setNumberOfBids(Number(data.bidCount));
    });

    // cleanup
    return () => {
      channel.unbind();
    };
  }, [pusher, props.id]);

  return (
    <div>
      <p>Current Bid ${price}</p>
      <p># bids: {numberOfBids}</p>
      <button onClick={makeBid}>Bid</button>
    </div>
  );
}
