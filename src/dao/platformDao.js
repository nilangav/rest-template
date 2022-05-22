/**
 * Author: Nilanga Virajith
 */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getPlatform = async (platformId) => {
  return await prisma.platform.findUnique({
    where: {
      platform_id: platformId,
    },
  });
};

export { getPlatform };
