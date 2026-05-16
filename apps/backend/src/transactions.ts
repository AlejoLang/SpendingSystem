import { Elysia, t } from 'elysia';
import { prisma } from './lib/prisma';
import { error } from 'console';

export const transactionsRoutes = new Elysia({ prefix: '/transactions' })
  .get('/', async () => {
    return prisma.transaction.findMany({
      include: {
        category: true,
      },
    });
  })
  .post(
    '/',
    async ({ body }) => {
      return prisma.transaction.create({ data: body });
    },
    {
      body: t.Object({
        title: t.String(),
        amount: t.Number(),
        type: t.Union([t.Literal('INCOME'), t.Literal('EXPENSE')]),
        category_id: t.Optional(t.Number()),
        note: t.Optional(t.String()),
        date: t.Optional(t.String()),
      }),
    },
  )
  .delete(
    '/:id',
    async ({ params }) => {
      const transaction = await prisma.transaction.findUnique({
        where: { id: Number(params.id) },
      });

      if (!transaction) return error(404, 'Transaction not found');

      return prisma.transaction.delete({
        where: { id: Number(params.id) },
      });
    },
    {
      params: t.Object({
        id: t.Numeric(),
      }),
    },
  );

