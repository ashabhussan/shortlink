const Joi = require('joi');

module.exports = {
  urlCreationValidator: Joi.object().options({ abortEarly: false, stripUnknown: true }).keys({
    user: Joi.string().required(),
    originalUrl: Joi.string().uri().required(),
  }),
};
