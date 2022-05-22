/**
 * Author: Nilanga Virajith
 */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Retrieves customer by Id
 * @param {Number} customerId Customer Id
 * @returns Customer
 */
const getCustomer = async (customerId) => {
  return await prisma.customer.findUnique({
    where: {
      customer_id: customerId,
    },
  });
};

export { getCustomer };
