import { FastifyInstance } from 'fastify';
import adjusmentController from '../controllers/adjusmentController';
export default async function (fastify: FastifyInstance) {
  fastify.get('/', adjusmentController.getData);
  fastify.post('/', adjusmentController.createData);
  fastify.put('/:id', adjusmentController.updateData);
  fastify.get('/:sku', adjusmentController.getDataBySku);
  fastify.get('/show/:id', adjusmentController.getDataById);
  fastify.delete('/:id', adjusmentController.deleteData);
}
