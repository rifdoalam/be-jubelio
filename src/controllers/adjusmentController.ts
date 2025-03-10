import { FastifyRequest, FastifyReply } from 'fastify';
import adjusmentService from '../services/adjusmentService';
import { Adjustment } from '../types/adjusmentType';
import productService from '../services/productService';
const getData = async (req: FastifyRequest, reply: FastifyReply) => {
  const page = parseInt((req.query as { page: string }).page) || 1;
  const limit = parseInt((req.query as { limit: string }).limit) || 10;
  try {
    const data = await adjusmentService.getAllData(page, limit);
    const countData = await adjusmentService.countData();
    reply.status(200).send({
      message: 'Data successfully retrieved ',
      data: data,
      pagination: {
        page: page,
        limit: limit,
        totalData: Number(countData.count),
        totalPages: Math.ceil(Number(countData.count) / limit),
      },
    });
  } catch (error) {
    console.log(error);
    reply.status(500).send({ error });
  }
};
const createData = async (
  req: FastifyRequest<{ Body: { sku: string; qty: number } }>,
  reply: FastifyReply,
) => {
  const { sku, qty } = req.body as Adjustment;
  try {
    const existProduct = await productService.showProduct(sku);
    if (!existProduct) return reply.status(404).send({ message: `${sku} not found ` });
    const currentStock = await productService.getStockBySku(sku);
    const newStock = Number(currentStock?.stock) + Number(qty);
    if (newStock <= 0) return reply.status(404).send({ message: `${sku} Insufficient stock  ` });
    const data = await adjusmentService.createData({ qty: qty, sku: sku, amount: 0 });
    reply.status(200).send({ message: 'Product created successfully', data: data });
  } catch (error) {
    console.log(error);
    reply.status(500).send({ error });
  }
};
const updateData = async (
  req: FastifyRequest<{ Params: { id: number }; Body: { qty: number } }>,
  reply: FastifyReply,
) => {
  const { id } = req.params;
  const { qty } = req.body;
  try {
    const existAdjusment = await adjusmentService.getAdjustmenById(id);
    if (!existAdjusment) return reply.status(404).send({ message: 'Adjusment not found' });

    const currentStock = await productService.getStockBySku(existAdjusment.sku);

    const newStock = Number(currentStock?.stock) - Number(existAdjusment.qty) + Number(qty);
    if (newStock <= 0)
      return reply.status(404).send({ message: `${existAdjusment.sku} Insufficient stock  ` });
    const updatedData = await adjusmentService.updateData({
      id: existAdjusment.id,
      sku: existAdjusment.sku,
      qty: qty,
      amount: 0,
    });
    reply.status(200).send({ message: 'Updated data successfully', data: updatedData });
  } catch (error) {
    console.log(error);
    reply.status(500).send({ error });
  }
};
const getDataBySku = async (
  req: FastifyRequest<{ Params: { sku: string } }>,
  reply: FastifyReply,
) => {
  const { sku } = req.params;
  try {
    const existingData = await adjusmentService.showData(sku);
    if (!existingData) return reply.status(404).send({ message: 'Data not found' });
    reply.status(200).send({ message: 'Data successfully retrieved ', data: existingData });
  } catch (error) {
    console.log(error);
    reply.status(500).send({ error });
  }
};
const getDataById = async (
  req: FastifyRequest<{ Params: { id: number } }>,
  reply: FastifyReply,
) => {
  const { id } = req.params;
  try {
    const existingData = await adjusmentService.getAdjustmenById(id);
    if (!existingData) return reply.status(404).send({ message: 'Data not found' });
    reply.status(200).send({ message: 'Data successfully retrieved ', data: existingData });
  } catch (error) {
    console.log(error);
    reply.status(500).send({ error });
  }
};

const deleteData = async (req: FastifyRequest<{ Params: { id: number } }>, reply: FastifyReply) => {
  const { id } = req.params;
  try {
    const existingData = await adjusmentService.getAdjustmenById(id);
    if (!existingData) return reply.status(404).send({ message: 'Data not found' });

    const data = await adjusmentService.deleteData(id);
    reply.status(200).send({ message: 'Data deleted successfully ', data: data });
  } catch (error) {
    console.log(error);
    reply.status(500).send({ error });
  }
};

export default {
  getData,
  createData,
  updateData,
  getDataBySku,
  getDataById,
  deleteData,
};
