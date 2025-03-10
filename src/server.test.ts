import fastify from './server-test';
import supertest from 'supertest';

afterAll(() => fastify.close());

test('GET `/` route', async () => {
  await fastify.ready();
  const response = await supertest(fastify.server)
    .get('/')
    .expect(200)
    .expect('Content-Type', 'application/json; charset=utf-8');

  expect(response.body).toEqual({ message: 'Hello developer, this is ecommerce api' });
});
