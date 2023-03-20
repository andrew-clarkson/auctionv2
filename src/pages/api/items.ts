import { PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req

  switch (method) {
    case 'GET':
      // get the title and content from the request body
      // const { title, } = req.body
      // use prisma to create a new post using that data
      const items = await prisma.item.findMany()
      res.status(201).json(items)
      break
    default:
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
