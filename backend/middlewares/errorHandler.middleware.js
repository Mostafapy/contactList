const { createResponse } = require('../utils/response.util');
const logger = require('../utils/logger.util')('Server Error');
/**
 * Middleware to handle errors of Asynchronous
 * @param err
 * @param req
 * @param res
 * @param next
 */
// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  let customError = { ...err };

  let message = err.message;

  customError.message = err.message;

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    customError = {};

    message = `Contact not found with id of ${err.value}`;

    customError = createResponse(false, message, err, null, 404);
  }

  // Mongoose Duplicate Key Error
  if (err.code === 11000) {
    customError = {};

    message = 'Duplicate field value entered';

    customError = createResponse(false, message, err, null, 400);
  }

  // Mongoose Validation error
  if (err.name === 'ValidationError') {
    customError = {};

    message = Object.values(err.errors).map((val) => val.message);

    customError = createResponse(false, message, err, null, 400);
  }

  logger.error(message, err.message);

  res.status(customError.errorCode || 500).json({
    success: false,
    err: customError.err || err,
    msg: customError.message || 'Server Error',
    data: null,
    errorCode: customError.errorCode || 500,
  });
};

module.exports = errorHandler;
