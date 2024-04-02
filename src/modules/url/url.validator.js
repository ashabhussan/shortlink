const Joi = require('joi');
const { errors } = require('../../utils/errors');
const { isValidId, generateJoiValidator } = require('../../utils');

const urlValidator = {
  validateUrlCreation: generateJoiValidator(
    Joi.object().keys({
      user: Joi.string()
        .custom((value, helpers) =>
          !isValidId(value) ? helpers.message(errors.NOT_VALID_ID.message) : value,
        )
        .required(),
      originalUrl: Joi.string().uri().required(),
    }),
  ),

  validateUrlGet: generateJoiValidator(
    Joi.object().keys({
      user: Joi.string()
        .custom((value, helpers) =>
          !isValidId(value) ? helpers.message(errors.NOT_VALID_ID.message) : value,
        )
        .required(),
      page: Joi.number().min(1),
      perPage: Joi.number().min(1).max(50),
    }),
  ),

  validateUrlDelete: generateJoiValidator(
    Joi.object().keys({
      user: Joi.string().required(),
      urlId: Joi.string()
        .custom((value, helpers) =>
          !isValidId(value) ? helpers.message(errors.NOT_VALID_ID.message) : value,
        )
        .required(),
    }),
  ),
};

module.exports = urlValidator;
