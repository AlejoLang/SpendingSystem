import { Elysia } from 'elysia';
import { cors } from '@elysiajs/cors';
import { transactionsRoutes } from './transactions';
import { categoriesRoutes } from './categories';

const app = new Elysia()
  .use(cors())
  .use(transactionsRoutes)
  .use(categoriesRoutes)
  .listen(3000);

console.log(`🦊 Elysia running at http://localhost:${app.server?.port}`);

