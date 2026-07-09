import User from '../models/User.js';
import { NotFoundError } from '../utils/errors.js';

export const getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    
    if (!user) {
      throw new NotFoundError('User');
    }

    res.status(200).json({
      success: true,
      user: user.getPublicProfile()
    });
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const { firstName, lastName, bio, institution, preferences } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { firstName, lastName, bio, institution, preferences },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: 'Profile updated',
      user: user.getPublicProfile()
    });
  } catch (error) {
    next(error);
  }
};

export const getLibrary = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).populate('purchasedBooks');

    res.status(200).json({
      success: true,
      library: user.purchasedBooks || []
    });
  } catch (error) {
    next(error);
  }
};

export const addReview = async (req, res, next) => {
  try {
    const { bookId, rating, comment } = req.body;

    res.status(201).json({
      success: true,
      message: 'Review added successfully'
    });
  } catch (error) {
    next(error);
  }
};
