import User from '../models/User.js';
import Order from '../models/Order.js';
import Book from '../models/Book.js';

export const getDashboard = async (req, res, next) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalOrders = await Order.countDocuments();
    const totalBooks = await Book.countDocuments();
    const totalRevenue = await Order.aggregate([
      { $match: { paymentStatus: 'approved' } },
      { $group: { _id: null, total: { $sum: '$totalAmount' } } }
    ]);

    res.status(200).json({
      success: true,
      dashboard: {
        totalUsers,
        totalOrders,
        totalBooks,
        totalRevenue: totalRevenue[0]?.total || 0
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getUsers = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, role } = req.query;
    const skip = (page - 1) * limit;

    const filter = role ? { role } : {};
    const users = await User.find(filter).skip(skip).limit(limit);
    const total = await User.countDocuments(filter);

    res.status(200).json({
      success: true,
      users,
      pagination: { page, limit, total }
    });
  } catch (error) {
    next(error);
  }
};

export const verifyTeacher = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isVerified: true, status: 'active' },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: 'Teacher verified',
      user
    });
  } catch (error) {
    next(error);
  }
};

export const getOrders = async (req, res, next) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const filter = status ? { status } : {};
    const orders = await Order.find(filter).skip(skip).limit(limit);
    const total = await Order.countDocuments(filter);

    res.status(200).json({
      success: true,
      orders,
      pagination: { page, limit, total }
    });
  } catch (error) {
    next(error);
  }
};
