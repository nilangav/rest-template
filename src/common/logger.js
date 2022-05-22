/**
 * Author: Nilanga Virajith
 */

import winston from "winston";

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        winston.format.json()
      ),
    }),
  ],
});

const enumerateErrorFormat = (error) => {
  if (error instanceof Error) {
    return { message: error.message, stack: error.stack, ...error };
  }
  return error;
};

export default {
  error: (error) => logger.error(enumerateErrorFormat(error)),
  info: (message, metadata) => logger.info(message, metadata),
  warn: (params) => logger.warn(params),
};
