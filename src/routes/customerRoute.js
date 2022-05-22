/**
 * Author: Nilanga Virajith
 */

import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import { getCustomers } from "../services/customerService.js";

const customerRouter = Router();

/**
 * Get all customers
 */
customerRouter.get("/", async (req, res) => {
  res.status(StatusCodes.OK).send(await getCustomers());
});

export default customerRouter;
