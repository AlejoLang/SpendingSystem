import { Elysia, t } from 'elysia';
import { cors } from '@elysiajs/cors';
import { prisma } from './lib/prisma';
import { error } from 'console';

const app = new Elysia()
  .use(cors())
  .get('/transactions', async () => {
    return prisma.transaction.findMany({
      include: {
        category: true,
      },
    });
  })
  .post(
    '/transactions',
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
    '/transactions/:id',
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
  )
  .listen(3000);

console.log(`🦊 Elysia running at http://localhost:${app.server?.port}`);

