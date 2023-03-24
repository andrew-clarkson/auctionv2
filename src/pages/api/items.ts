import { PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

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
      const editItem = await prisma.item.update({
        where: { id: req.body.id },
        data: { ...req.body },
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
