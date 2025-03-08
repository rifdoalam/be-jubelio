import Fastify from 'fastify';
import dotenv from 'dotenv';

dotenv.config();
import productRoutes from './routes/productRoutes';
import adjusmentRoutes from './routes/adjusmentRoutes';
import db from './config/db';
const fastify = Fastify({ logger: true });
fastify.get('/', async (request, reply) => {
  reply.status(200).send({ message: 'Hello developer, this is ecommerce api' });
});

fastify.register(productRoutes, { prefix: '/api/products' });
fastify.register(adjusmentRoutes, { prefix: '/api/adjusments' });

const start = async () => {
  try {
    await db.connect();
    await fastify.listen({ port: Number(process.env.PORT) || 3000 });
    console.log(`Server running on http://localhost:${process.env.PORT || 3000}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
