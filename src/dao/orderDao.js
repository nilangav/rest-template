/**
 * Author: Nilanga Virajith
 */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Get all orders
 */
const getAllOrders = async () => {
  return await prisma.orders.findMany();
};

export { getAllOrders };
