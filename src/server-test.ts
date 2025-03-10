import Fastify from 'fastify';
import dotenv from 'dotenv';

dotenv.config();
import productRoutes from './routes/productRoutes';
import adjusmentRoutes from './routes/adjusmentRoutes';

const fastify = Fastify({ logger: true });

fastify.get('/', async (request, reply) => {
  reply.status(200).send({ message: 'Hello developer, this is ecommerce api' });
});

fastify.register(productRoutes, { prefix: '/api/products' });
fastify.register(adjusmentRoutes, { prefix: '/api/adjusments' });

export default fastify;
