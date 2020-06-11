const Joi = require('@hapi/joi');
const {
  validateRequest,
} = require('../middlewares/validateRequest.middleware');

const loginValidation = () => {
  const loginValidationSchema = Joi.object()
    .required()
    .keys({
      username: Joi.string().required(),
      password: Joi.string().min(6).required(),
    });

  return validateRequest(loginValidationSchema, 'body');
};

module.exports = { loginValidation };
