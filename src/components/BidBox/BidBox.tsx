'use client';

import { useState, useEffect } from 'react';
import styles from './bidbox.module.css';
import { usePusher } from 'context/PusherContext';

interface Props {
  id: string;
  price: number;
  bidCount: number;
}

export default function BidBox(props: Props) {
  const [price, setPrice] = useState(props.price)
  const [numberOfBids, setNumberOfBids] = useState(props.bidCount)
  const pusher = usePusher();

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
    setNumberOfBids(nextBidCount);
    sendBid({ id: props.id, price: nextBidPrice, bidCount: nextBidCount });
  };

  useEffect(() => {
    const channel = pusher.subscribe(props.id);

    // whenever an event with the name my-event is triggered on the subscribed Pusher channel
    // the callback function defined in .bind() (a state update) will be called with the event data as its argument.
    channel.bind('my-event', (data: { message: string }) => {
      setPrice(Number(data.message));
    });

    // cleanup
    return () => {
      channel.unbind();
    };
  }, [pusher]);

  return (
    <div>
      <p>Current Bid ${price}</p>
      <p># bids: {numberOfBids}</p>
      <button onClick={makeBid}>Bid</button>
    </div>
  );
}
