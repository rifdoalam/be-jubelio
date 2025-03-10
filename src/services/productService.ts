import db from '../config/db';
import { Product } from '../types/productType';
import productQueries from '../db/queries/productQueries';

const getAllProducts = async (page: number, limit: number) => {
  return await db.any<Product>(productQueries.getProducts, [limit, (page - 1) * limit]);
};
const countProducts = async () => {
  return await db.oneOrNone(productQueries.countProduct);
};
const createProduct = async (product: Product) => {
  return db.one<Product>(productQueries.createProduct, [
    product.title,
    product.sku,
    product.price,
    product.description,
    product.image,
  ]);
};
const updateProduct = async (product: Product) => {
  return await db.oneOrNone<Product>(productQueries.updateProduct, [
    product.title,
    product.price,
    product.description,
    product.image,
    product.sku,
  ]);
};

const getStockBySku = async (sku: string) => {
  const result = await db.oneOrNone<{ stock: number }>(productQueries.getStockBySku, [sku]);
  return result;
};

const showProduct = async (sku: string) => {
  return db.oneOrNone<Product>(productQueries.showProduct, [sku]);
};

const deleteProduct = async (sku: string) => {
  return db.oneOrNone<Product>(productQueries.deleteProduct, [sku]);
};

export default {
  getAllProducts,
  createProduct,
  deleteProduct,
  showProduct,
  countProducts,
  updateProduct,
  getStockBySku,
};
