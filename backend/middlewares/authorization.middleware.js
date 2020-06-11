const jwt = require('jsonwebtoken');
const { createResponse } = require('../utils/response.util');

const jwtConfig = require('config').get('jwt');
const logger = require('../utils/logger.util')('Middlewares:Authorization');

/**
 * Why?
 * verify if this user have acces to the required module
 * and get the payload of the token (later authorized module implementation)
 */
const authorizationMiddleware = () => {
  return (req, res, next) => {
    const token = req.headers.authorization;

    if (token) {
      jwt.verify(token, jwtConfig.secret, (err, decodedToken) => {
        if (err) {
          logger.error('authMiddleware', { err });
          createResponse(false, 'Unauthorized', err, null, 401);
        } else {
          req.user = decodedToken;
          next();
        }
      });
    } else {
      createResponse(
        false,
        'Unauthorized User',
        { msg: 'Invalid Credentials No Payload' },
        null,
        403,
      );
    }
  };
};

module.exports = authorizationMiddleware;
