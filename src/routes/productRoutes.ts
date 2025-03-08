import { FastifyInstance } from 'fastify';
import productController from '../controllers/productController';

export default async function (fastify: FastifyInstance) {
  fastify.get('/', productController.getProducts);
  fastify.put('/:skuParam', productController.updateProduct);
  fastify.get('/import', productController.importProducts);
  fastify.post('/', productController.createProduct);
  fastify.get('/:sku', productController.showProduct);
  fastify.delete('/:sku', productController.deleteProduct);
}
