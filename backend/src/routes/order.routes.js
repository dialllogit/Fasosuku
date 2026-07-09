import express from 'express';
import { protect } from '../middleware/auth.js';
import { createOrder, getOrders, getOrderDetails } from '../controllers/order.controller.js';

const router = express.Router();

router.post('/', protect, createOrder);
router.get('/', protect, getOrders);
router.get('/:id', protect, getOrderDetails);

export default router;
