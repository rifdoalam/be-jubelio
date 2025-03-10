import fastify from '../src/server-test';
import supertest from 'supertest';
import productService from '../src/services/productService';

afterAll(() => fastify.close());
test('GET `/api/adjusments` route', async () => {
  await fastify.ready();
  const response = await supertest(fastify.server)
    .get('/api/adjusments?page=1&limit=10')
    .expect(200)
    .expect('Content-Type', 'application/json; charset=utf-8');
  expect(response.body.message.trim()).toBe('Data successfully retrieved');
  expect(response.body.data).toBeInstanceOf(Array);
  expect(response.body.pagination.page).toBe(1);
});

test('should create a new adjustment successfully', async () => {
  const newAdjusment = {
    sku: 'sku123',
    qty: 20,
  };
  const response = await supertest(fastify.server).post('/api/adjusments').send(newAdjusment);
  expect(response.status).toBe(200);
  expect(response.body.message.trim()).toBe('Data created successfully');
  expect(response.body.data).toHaveProperty('sku', 'sku123');
  expect(response.body.data).toHaveProperty('qty', 20);
});
