import Pusher from 'pusher';

export const pusher = new Pusher({
  appId: process.env.app_id,
  key: '48a91d99d52f3a702af0',
  secret: process.env.secret,
  cluster: 'us2',
  useTLS: true,
});
