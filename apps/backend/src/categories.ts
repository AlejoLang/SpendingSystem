import { Elysia, t } from 'elysia';
import { prisma } from './lib/prisma';
import { error } from 'console';

export const categoriesRoutes = new Elysia({ prefix: '/categories' })
  .get('/', async () => {
    return prisma.category.findMany();
  })
  .post(
    '/',
    async ({ body }) => {
      return prisma.category.create({ data: body });
    },
    {
      body: t.Object({
        name: t.String(),
        description: t.Optional(t.String()),
      }),
    },
  )
  .delete(
    '/:id',
    async ({ params }) => {
      const category = await prisma.category.findUnique({
        where: { id: Number(params.id) },
      });

      if (!category) return error(404, 'Transaction not found');

      return prisma.category.delete({
        where: { id: Number(params.id) },
      });
    },
    {
      params: t.Object({
        id: t.Numeric(),
      }),
    },
  );

