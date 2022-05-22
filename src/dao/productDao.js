/**
 * Author: Nilanga Virajith
 */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getProduct = async (productId) => {
  return await prisma.product.findUnique({
    where: {
      product_id: productId,
    },
  });
};

export { getProduct };
