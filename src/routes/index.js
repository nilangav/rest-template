/**
 * Author: Nilanga Virajith
 */

import { Router } from "express";
import customerRouter from "./customerRoute.js";
import orderRouter from "./orderRoute.js";

const router = Router();

/**
 * Redirect to customer router
 */
router.use("/customers", customerRouter);

/**
 * Redirect to order router
 */
router.use("/orders", orderRouter);

export default router;
