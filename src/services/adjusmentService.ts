import db from '../config/db';
import adjustmentQueries from '../db/queries/adjusmentQueries';
import { Adjustment } from '../types/adjusmentType';
const getAllData = async (page: number, limit: number) => {
  return await db.any(adjustmentQueries.getAdjustment, [limit, (page - 1) * limit]);
};
const createData = async (adjustment: Adjustment) => {
  return await db.one(adjustmentQueries.createData, [adjustment.sku, adjustment.qty]);
};
const updateData = async (adjustment: Adjustment) => {
  return await db.oneOrNone(adjustmentQueries.updateData, [adjustment.id, adjustment.qty]);
};
const showData = async (sku: string) => {
  return await db.any(adjustmentQueries.showData, [sku]);
};
const getAdjustmentsBySku = async (sku: string) => {
  return await db.any(adjustmentQueries.getAdjustmentsBySku, [sku]);
};
const getAdjustmenById = async (id: number) => {
  return await db.oneOrNone(adjustmentQueries.getAdjustmentsById, [id]);
};
const deleteData = async (id: number) => {
  return await db.oneOrNone(adjustmentQueries.deleteData, [id]);
};

export default {
  getAllData,
  createData,
  updateData,
  showData,
  getAdjustmentsBySku,
  getAdjustmenById,
  deleteData,
};
