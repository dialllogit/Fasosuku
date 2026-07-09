import { verifyToken } from '../config/jwt.js';
import User from '../models/User.js';
import { ApiError } from '../utils/errors.js';
import logger from '../utils/logger.js';

export const protect = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      throw new ApiError(401, 'Not authorized to access this route');
    }

    try {
      const decoded = verifyToken(token);
      req.user = await User.findById(decoded.id);

      if (!req.user) {
        throw new ApiError(404, 'User not found');
      }

      next();
    } catch (error) {
      logger.error('Token verification failed:', error);
      throw new ApiError(401, 'Token is not valid');
    }
  } catch (error) {
    next(error);
  }
};

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new ApiError(403, `User role '${req.user.role}' is not authorized to access this route`));
    }
    next();
  };
};

export const optionalAuth = async (req, res, next) => {
  try {
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      const token = req.headers.authorization.split(' ')[1];
      try {
        const decoded = verifyToken(token);
        req.user = await User.findById(decoded.id);
      } catch (error) {
        // Optional, continue without user
      }
    }
    next();
  } catch (error) {
    next(error);
  }
};
