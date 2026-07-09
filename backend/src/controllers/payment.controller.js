import Order from '../models/Order.js';
import User from '../models/User.js';
import crypto from 'crypto';
import { ApiError } from '../utils/errors.js';
import logger from '../utils/logger.js';

export const initiatePayment = async (req, res, next) => {
  try {
    const { items, paymentMethod } = req.body;

    // Calculate totals
    let totalAmount = 0;
    items.forEach(item => {
      totalAmount += item.price * item.quantity;
    });

    const platformFee = Math.floor(totalAmount * (process.env.PLATFORM_COMMISSION_PERCENTAGE / 100));
    const authorEarnings = totalAmount - platformFee;

    // Create order
    const order = await Order.create({
      orderId: `ORD-${Date.now()}`,
      buyer: req.user._id,
      items,
      totalAmount,
      platformFee,
      authorEarnings,
      paymentMethod,
      status: 'processing'
    });

    // TODO: Integrate with payment provider (CinetPay, Wave, etc.)
    
    logger.info(`Payment initiated: ${order.orderId}`);

    res.status(201).json({
      success: true,
      message: 'Payment initiated',
      order: {
        orderId: order._id,
        transactionId: order.orderId,
        amount: totalAmount,
        paymentMethod
      }
    });
  } catch (error) {
    next(error);
  }
};

export const handleWebhook = async (req, res, next) => {
  try {
    const { transactionId, status } = req.body;

    // Verify webhook signature
    const signature = req.headers['x-webhook-signature'];
    const hash = crypto
      .createHmac('sha256', process.env.PAYMENT_WEBHOOK_SECRET)
      .update(JSON.stringify(req.body))
      .digest('hex');

    if (signature !== hash) {
      throw new ApiError(401, 'Invalid webhook signature');
    }

    // Update order status
    const order = await Order.findOneAndUpdate(
      { orderId: transactionId },
      { status: status === 'approved' ? 'completed' : 'failed', paymentStatus: status },
      { new: true }
    );

    if (order && status === 'approved') {
      // Update user wallet
      const author = await User.findById(order.items[0].book);
      if (author) {
        author.wallet.balance += order.authorEarnings;
        author.wallet.totalEarnings += order.authorEarnings;
        await author.save();
      }
    }

    logger.info(`Webhook processed: ${transactionId}`);

    res.status(200).json({
      success: true,
      message: 'Webhook processed'
    });
  } catch (error) {
    next(error);
  }
};

export const getTransactionStatus = async (req, res, next) => {
  try {
    const order = await Order.findOne({ orderId: req.params.transactionId });

    if (!order) {
      throw new ApiError(404, 'Transaction not found');
    }

    res.status(200).json({
      success: true,
      transaction: {
        id: order._id,
        status: order.paymentStatus,
        amount: order.totalAmount
      }
    });
  } catch (error) {
    next(error);
  }
};
