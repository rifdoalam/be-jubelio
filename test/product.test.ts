import fastify from '../src/server-test';
import supertest from 'supertest';

afterAll(() => fastify.close());
test('GET `/api/products` route', async () => {
  await fastify.ready();
  const response = await supertest(fastify.server)
    .get('/api/products?page=1&limit=10')
    .expect(200)
    .expect('Content-Type', 'application/json; charset=utf-8');
  expect(response.body.message.trim()).toBe('Products retrieved successfully');
  expect(response.body.data).toBeInstanceOf(Array);
  expect(response.body.pagination.page).toBe(1);
});

test('should create a new product with POST /api/products', async () => {
  const newProduct = {
    title: 'New Product',
    sku: 'sku123', // change sku every testing
    price: 299.99,
    description: 'A newly created product',
    image: 'https://example.com/image.jpg',
  };

  const response = await supertest(fastify.server).post('/api/products').send(newProduct);

  expect(response.status).toBe(201); // Product should be created, status 201
  expect(response.body.message.trim()).toBe('Product created successfully');
  expect(response.body.data).toHaveProperty('sku', 'sku123'); // Verify the SKU returned is correct
  expect(response.body.data).toHaveProperty('title', 'New Product');
  expect(response.body.data).toHaveProperty('price', '299.99');
  expect(response.body.data).toHaveProperty('description', 'A newly created product');
  expect(response.body.data).toHaveProperty('image', 'https://example.com/image.jpg');
});

test('should return a product by ID (sku)', async () => {
  const sku = 'sku123';
  const response = await supertest(fastify.server)
    .get(`/api/products/${sku}`)
    .expect('Content-Type', 'application/json; charset=utf-8');
  expect(response.body.message.trim()).toBe('Data show successfully');
  expect(response.body.data).toHaveProperty('sku', sku);
  expect(response.body.data).toHaveProperty('title');
  expect(response.body.data).toHaveProperty('price');
  expect(response.body.data).toHaveProperty('description');
  expect(response.body.data).toHaveProperty('image');
});
test('should update a product with PUT /api/products/:sku', async () => {
  const sku = 'sku123';
  const updatedProduct = {
    title: 'Updated Product',
    price: 499.99,
    description: 'An updated product',
    image: 'https://example.com/updated-image.jpg',
  };

  const response = await supertest(fastify.server).put(`/api/products/${sku}`).send(updatedProduct);
  expect(response.status).toBe(200);
  expect(response.body.message.trim()).toBe('Product updated successfully');
  expect(response.body.data).toHaveProperty('sku', sku);
  expect(response.body.data).toHaveProperty('title', 'Updated Product');
  expect(response.body.data).toHaveProperty('price', '499.99');
  expect(response.body.data).toHaveProperty('description', 'An updated product');
  expect(response.body.data).toHaveProperty('image', 'https://example.com/updated-image.jpg');
});

// test('should delete a product with DELETE /api/products/:sku', async () => {
//   const sku = 'sku123';
//   const response = await supertest(fastify.server).delete(`/api/products/${sku}`);
//   expect(response.status).toBe(200);
//   expect(response.body.message.trim()).toBe('Data delete successfully');
// });

// test('should import a product with GET /api/products/import ', async () => {
//   const response = await supertest(fastify.server).get('/api/products/import');
//   expect(response.status).toBe(200);
//   expect(response.body.message.trim()).toBe('Import data successfully');
// });
