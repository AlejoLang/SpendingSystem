import { Elysia } from 'elysia';

const app = new Elysia().get('/', () => 'Hello World').listen(3000);

console.log(`🦊 Elysia running at http://localhost:${app.server?.port}`);

