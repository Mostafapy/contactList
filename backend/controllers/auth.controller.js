require('colors');
const jwt = require('jsonwebtoken');
/* Models */
const UserModel = require('./../models/user.model');

const jwtConfig = require('config').get('jwt');

const logger = require('./../utils/logger.util')('Controllers:AuthController');
const { createResponse } = require('./../utils/response.util');

// @desc Login User
// @route POST /api/v1/auth/login
// @access Public
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check for username and password
    if (!username && !password) {
      logger.error(
        '@login() [error: please provide an email and password]'.red,
      );

      return res
        .status(400)
        .json(
          createResponse(
            false,
            'please provide an email and password',
            { msg: 'please provide an email and password' },
            null,
            400,
          ),
        );
    }

    // Check for user
    const user = await UserModel.findOne({ username, password });

    if (!user) {
      logger.error('@login() [error: User is not found]'.red);

      return res
        .status(401)
        .json(
          createResponse(
            false,
            'Invalid Credentials',
            { msg: 'User is not found' },
            null,
            401,
          ),
        );
    }

    const token = jwt.sign(
      { id: user._id, username: user.username, password: user.password },
      jwtConfig.secret,
      {
        expiresIn: jwtConfig.expireIn,
      },
    );

    return res
      .status(200)
      .json(createResponse(true, 'Done', null, { token, user }));
  } catch (err) {
    return res
      .status(500)
      .json(createResponse(false, err.message, err.stack, null, 500));
  }
};

module.exports = { login };