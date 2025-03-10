import db from '../config/db';
import adjustmentQueries from '../db/queries/adjusmentQueries';
import { Adjustment } from '../types/adjusmentType';
const getAllData = async (page: number, limit: number) => {
  return await db.any<Adjustment>(adjustmentQueries.getAdjustment, [limit, (page - 1) * limit]);
};
const createData = async (adjustment: Adjustment) => {
  return await db.one<Adjustment>(adjustmentQueries.createData, [adjustment.sku, adjustment.qty]);
};
const updateData = async (adjustment: Adjustment) => {
  return await db.oneOrNone<Adjustment>(adjustmentQueries.updateData, [
    adjustment.id,
    adjustment.qty,
  ]);
};
const showData = async (sku: string) => {
  return await db.any<Adjustment>(adjustmentQueries.showData, [sku]);
};
const getAdjustmentsBySku = async (sku: string) => {
  return await db.any<Adjustment>(adjustmentQueries.getAdjustmentsBySku, [sku]);
};
const getAdjustmenById = async (id: number) => {
  return await db.oneOrNone<Adjustment>(adjustmentQueries.getAdjustmentsById, [id]);
};
const deleteData = async (id: number) => {
  return await db.oneOrNone<Adjustment>(adjustmentQueries.deleteData, [id]);
};

const countData = async () => {
  return await db.oneOrNone(adjustmentQueries.coundData);
};

export default {
  getAllData,
  createData,
  updateData,
  showData,
  getAdjustmentsBySku,
  getAdjustmenById,
  deleteData,
  countData,
};
