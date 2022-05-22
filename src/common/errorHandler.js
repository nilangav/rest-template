/**
 * Author: Nilanga Virajith
 */

import logger from "./logger.js";

const errorHandler = () => {
  return (error, req, res, next) => {
    const status = error.status || 500;
    const message = status ? error.message : "Internal error occurred";

    logger.error(error);
    res.status(status).send(message);
  };
};

export default errorHandler;
