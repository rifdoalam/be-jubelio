import db from '../config/db';
import { Product } from '../types/productType';
import productQueries from '../db/queries/productQueries';

const getAllProducts = async (page: number, limit: number) => {
  return await db.any(productQueries.getProducts, [limit, (page - 1) * limit]);
};
const countProducts = async () => {
  return await db.one(productQueries.countProduct);
};
const createProduct = async (product: Product) => {
  return db.one(productQueries.createProduct, [
    product.title,
    product.sku,
    product.price,
    product.description,
    product.image,
  ]);
};
const updateProduct = async (product: Product) => {
  return await db.one(productQueries.updateProduct, [
    product.title,
    product.price,
    product.description,
    product.image,
    product.sku,
  ]);
};

const getStockBySku = async (sku: string) => {
  return await db.one(productQueries.getStockBySku, [sku]);
};

const showProduct = async (sku: string) => {
  return db.oneOrNone(productQueries.showProduct, [sku]);
};

const deleteProduct = async (sku: string) => {
  return db.any(productQueries.deleteProduct, [sku]);
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
