import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'utils/prisma';

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case 'GET':
      const { itemId } = req.query;
      if (!itemId) {
        res.status(400).json({ message: 'missing itemId' });
        break;
      } else if (Array.isArray(itemId)) {
        res
          .status(400)
          .json({ message: 'do not provide more than one itemId' });
        break;
      } else {
        const item = await prisma.item.findFirst({ where: { id: itemId } });
        res.status(200).json(item);
        break;
      }
    default:
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
