const Joi = require('joi');
const { NOT_VALID_ID } = require('../../utils/errors');
const { isValidId } = require('../../utils');

module.exports = {
  urlCreationValidator: Joi.object()
    .options({ abortEarly: false, stripUnknown: true })
    .keys({
      user: Joi.string()
        .custom((value, helpers) =>
          !isValidId(value) ? helpers.message(NOT_VALID_ID.message) : value,
        )
        .required(),
      originalUrl: Joi.string().uri().required(),
    }),

  urlGetValidator: Joi.object()
    .options({ abortEarly: false, stripUnknown: true })
    .keys({
      user: Joi.string()
        .custom((value, helpers) =>
          !isValidId(value) ? helpers.message(NOT_VALID_ID.message) : value,
        )
        .required(),
      page: Joi.number().min(1),
      perPage: Joi.number().min(1).max(50),
    }),

  urlDeleteValidator: Joi.object()
    .options({ abortEarly: false, stripUnknown: true })
    .keys({
      user: Joi.string().required(),
      urlId: Joi.string()
        .custom((value, helpers) =>
          !isValidId(value) ? helpers.message(NOT_VALID_ID.message) : value,
        )
        .required(),
    }),
};
