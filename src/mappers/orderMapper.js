/**
 * Author: Nilanga Virajith
 */
import { getCustomer } from "../dao/customerDao.js";
import { getPlatform } from "../dao/platformDao.js";
import { getProduct } from "../dao/productDao.js";
import { getVenture } from "../dao/ventureDao.js";

/**
 * Maps Order DAO into DTO
 * @param {Order} order Order DAO
 * @returns Order DTO
 */
const mapOrder = async (order) => {
  const venture = await getVenture(order.venture_id);
  const customer = await getCustomer(order.customer_id);
  const platform = await getPlatform(order.platform_id);
  const product = await getProduct(order.product_id);

  return {
    orderId: order.order_id,
    venture: venture.name,
    status: order.status,
    paymentDate: formatDate(order.payment_date),
    paymentStatus: order.payment_status,
    dueDate: formatDate(order.due_date),
    customer: customer.name,
    platform: platform.name,
    product: product.name,
    qty: order.qty,
    delivery: order.delivery,
    notes: order.notes,
    address: customer.address,
    mobile: customer.mobile,
    price: product.price,
  };
};

/**
 * Formats a timestamp into mm/dd/yyyy format
 * @param {TimeStamp} date Timestamp
 * @returns Formatted date in mm/dd/yyyy format
 */
const formatDate = (date) => {
  return date?.toLocaleDateString("en-US");
};

export { mapOrder };
