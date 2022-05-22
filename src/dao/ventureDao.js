/**
 * Author: Nilanga Virajith
 */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Retrieves venture by Id
 * @param {Number} ventureId Venture Id
 * @returns Venture
 */
const getVenture = async (ventureId) => {
  return await prisma.venture.findUnique({
    where: {
      venture_id: ventureId,
    },
  });
};

export { getVenture };
