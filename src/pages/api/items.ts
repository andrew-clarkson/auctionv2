import { PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import Pusher from "pusher";

const prisma = new PrismaClient()

const pusher = new Pusher({
  appId: process.env.app_id,
  key: "48a91d99d52f3a702af0",
  secret: process.env.secret,
  cluster: "us2",
  useTLS: true
});

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req

  // TODO: add validations
  // TODO: add useful error/success messages/toasts

  switch (method) {
    case 'GET':
      const items = await prisma.item.findMany();
      console.log(items)
      res.status(200).json(items);
      break;
    case 'POST':
      // validations?
      console.log(req.body)
      const createItem = await prisma.item.create({ data: req.body });
      res.status(201).json(createItem);
      break;
    case 'PUT':
      // validations?
      console.log(req.body)
      const editItem = await prisma.item.update({
        where: { id: req.body.id },
        data: { ...req.body },
      });

      // pusher is working
      // need something here to make it usable on all items
      // also to check that it is a bid, not an edit
      pusher.trigger(editItem.id, "my-event", {
        price: editItem.price,
        bidCount: editItem.bidCount
      });

      res.status(201).json(editItem);
      break;
    case 'DELETE':
      const deleteItem = await prisma.item.delete({
        where: {
          id: req.body,
        },
      });
      res.status(200).json(deleteItem);
      break;
    default:
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
