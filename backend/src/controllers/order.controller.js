import Order from '../models/Order.js';
import { NotFoundError } from '../utils/errors.js';

export const createOrder = async (req, res, next) => {
  try {
    const { items, paymentMethod } = req.body;

    const order = await Order.create({
      orderId: `ORD-${Date.now()}`,
      buyer: req.user._id,
      items,
      paymentMethod,
      totalAmount: items.reduce((sum, item) => sum + item.price, 0)
    });

    res.status(201).json({
      success: true,
      order
    });
  } catch (error) {
    next(error);
  }
};

export const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ buyer: req.user._id })
      .populate('items.book')
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      orders
    });
  } catch (error) {
    next(error);
  }
};

export const getOrderDetails = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).populate('items.book');

    if (!order) {
      throw new NotFoundError('Order');
    }

    if (order.buyer.toString() !== req.user._id.toString()) {
      throw new Error('Not authorized');
    }

    res.status(200).json({
      success: true,
      order
    });
  } catch (error) {
    next(error);
  }
};
