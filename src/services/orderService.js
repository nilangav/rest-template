/**
 * Author: Nilanga Virajith
 */
import { PrismaClient } from "@prisma/client";
import { getAllOrders } from "../dao/orderDao.js";
import { mapOrder } from "../mappers/orderMapper.js";

const prisma = new PrismaClient();

/**
 * Get all orders
 * @returns all the orders
 */
const getOrders = async () => {
  const orders = await getAllOrders();
  // Have to use Promise.all here because here we are awaiting for an array of promises
  return await Promise.all(orders.map(async (order) => await mapOrder(order)));
};

export { getOrders };
