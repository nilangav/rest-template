/**
 * Author: Nilanga Virajith
 */

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Get all customers
 * @returns all the customers
 */
const getCustomers = async () => {
  return await prisma.customer.findMany();
};

export { getCustomers };
