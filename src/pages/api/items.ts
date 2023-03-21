import { PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req

  switch (method) {
    case 'GET':
      const items = await prisma.item.findMany()
      res.status(200).json(items)
      break
    case 'POST':
      // validations?
      const createItem = await prisma.item.create({data: req.body})
      res.status(201).json(createItem)
    case 'DELETE':
      const deleteItem = await prisma.item.delete({
        where: {
          id: req.body,
        },
      })
      res.status(200).json(deleteItem)
    default:
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
