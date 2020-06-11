const { createResponse } = require('./../utils/response.util');
/**
 *
 * Why?
 *
 * Help Me To Validate Joi Schema With (body, query, params)
 *
 */
const validateRequest = (schema, validateWhat) => {
  return (req, res, next) => {
    const validatedBody = schema.validate(req[validateWhat]);

    if (validatedBody.error) {
      return res.status(422).json(
        createResponse(
          false,
          'Validation Error',
          {
            validationError: validatedBody.error.details[0].message.replace(
              // eslint-disable-next-line no-useless-escape
              /\"/g,
              '',
            ),
          },
          null,
          422,
        ),
      );
    }

    next();
  };
};

module.exports = { validateRequest };
