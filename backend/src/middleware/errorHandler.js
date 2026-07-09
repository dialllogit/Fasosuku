import logger from '../utils/logger.js';

export const errorHandler = (err, req, res, next) => {
  // Log error
  logger.error(`${err.status || 500} - ${err.message}`);

  // Default error
  let error = { ...err };
  error.message = err.message;

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    error.status = 400;
    error.message = 'Invalid ID';
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    error.status = 400;
    const field = Object.keys(err.keyPattern)[0];
    error.message = `Field '${field}' already exists`;
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    error.status = 400;
    error.message = Object.values(err.errors)
      .map((val) => val.message)
      .join(', ');
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    error.status = 401;
    error.message = 'Invalid token';
  }

  if (err.name === 'TokenExpiredError') {
    error.status = 401;
    error.message = 'Token expired';
  }

  res.status(error.status || 500).json({
    success: false,
    message: error.message || 'Server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};
