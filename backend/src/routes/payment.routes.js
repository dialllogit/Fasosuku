import express from 'express';
import { protect } from '../middleware/auth.js';
import { initiatePayment, handleWebhook, getTransactionStatus } from '../controllers/payment.controller.js';

const router = express.Router();

router.post('/initiate', protect, initiatePayment);
router.post('/webhook', handleWebhook);
router.get('/:transactionId', protect, getTransactionStatus);

export default router;
