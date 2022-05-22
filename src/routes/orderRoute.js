/**
 * Author: Nilanga Virajith
 */

import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import { getOrders } from "../services/orderService.js";

const orderRouter = Router();

/**
 * Get all orders
 */
orderRouter.get("/", async (req, res) => {
  res.status(StatusCodes.OK).send(await getOrders());
});

export default orderRouter;
