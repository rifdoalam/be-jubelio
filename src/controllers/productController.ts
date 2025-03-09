import { FastifyReply, FastifyRequest } from 'fastify';
import axios from 'axios';
import productService from '../services/productService';
import { Product } from '../types/productType';

const getProducts = async (req: FastifyRequest, reply: FastifyReply) => {
  const page = parseInt((req.query as { page?: string }).page || '1');
  const limit = parseInt((req.query as { limit?: string }).limit || '16');
  try {
    const products = await productService.getAllProducts(page, limit);
    const countData = await productService.countProducts();
    const totalData = parseInt(countData.count);

    reply.status(200).send({
      message: '  Products retrieved successfully',
      data: products,
      pagination: {
        page: page,
        limit: limit,
        totalData: totalData,
        totalPages: Math.ceil(totalData / limit),
      },
    });
  } catch (error) {
    console.log(error);
    reply.status(500).send(error);
  }
};
const updateProduct = async (
  req: FastifyRequest<{ Params: { skuParam: string } }>,
  reply: FastifyReply,
) => {
  const { skuParam: sku } = req.params as { skuParam: string };
  const { title, price, description, image } = req.body as Product;
  try {
    const existingProduct = await productService.showProduct(sku);
    if (!existingProduct) return reply.status(404).send({ message: 'Product not found' });
    const updateProduct = await productService.updateProduct({
      sku,
      title,
      price,
      description,
      image,
    });
    reply.status(200).send({ message: 'Product updated successfully', data: updateProduct });
  } catch (error) {
    console.log(error);
    reply.status(500).send(error);
  }
};
const createProduct = async (req: FastifyRequest, reply: FastifyReply) => {
  const { title, sku, price, description, image } = req.body as Product;
  try {
    if (!title || !sku || !price || !image)
      return reply.status(400).send({ message: 'Title, SKU, Image, and Price are required' });
    const existingProduct = await productService.showProduct(sku);
    if (existingProduct) {
      reply.status(400).send({ message: 'Product already exists' });
    }

    const data = await productService.createProduct({
      title,
      sku,
      price,
      description,
      image,
    });
    return reply.code(201).send({ message: ' Product created successfully', data: data });
  } catch (error) {
    console.log(error);
    reply.status(500).send(error);
  }
};
const showProduct = async (req: FastifyRequest, reply: FastifyReply) => {
  const { sku } = req.params as { sku: string };
  try {
    const existingProduct = await productService.showProduct(sku);
    if (!existingProduct) return reply.status(401).send({ message: `${sku} does not exist` });
    reply.status(200).send({ message: 'Data show successfully ', data: existingProduct });
  } catch (error) {
    console.log(error);
    reply.status(500).send(error);
  }
};
const deleteProduct = async (req: FastifyRequest, reply: FastifyReply) => {
  const { sku } = req.params as { sku: string };
  try {
    const existingProduct = await productService.showProduct(sku);
    if (!existingProduct) return reply.status(401).send({ message: `${sku} does not exist` });

    await productService.deleteProduct(sku);
    reply.status(200).send({ message: 'Data delete successfully ' });
  } catch (error) {
    console.log(error);
    reply.status(500).send(error);
  }
};
const importProducts = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const { data } = await axios.get('https://dummyjson.com/products?limit=100');
    for (const product of data.products) {
      const existingProduct = await productService.showProduct(product.sku);
      if (!existingProduct) {
        await productService.createProduct({
          sku: product.sku,
          title: product.title,
          description: product.description,
          price: product.price,
          image: product.images[0],
        });
      }
    }
    reply.status(200).send({ message: 'Import data successfully' });
  } catch (error) {
    console.log(error);
    reply.status(500).send(error);
  }
};

export default {
  getProducts,
  createProduct,
  showProduct,
  deleteProduct,
  importProducts,
  updateProduct,
};
