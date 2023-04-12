import Pusher from 'pusher-js';

Pusher.logToConsole = true;

export const pusherConnection = new Pusher('48a91d99d52f3a702af0', {
  cluster: 'us2',
});
