const Joi = require('joi');
const { passwordRegex } = require('../../utils');

module.exports = {
  userCreationValidator: Joi.object()
    .options({ abortEarly: false, stripUnknown: true })
    .keys({
      name: Joi.string().required(),
      email: Joi.string().email().max(50).required(),
      password: Joi.string().min(8).max(50).regex(passwordRegex).required(),
    }),

  userLoginValidator: Joi.object()
    .options({ abortEarly: false, stripUnknown: true })
    .keys({
      email: Joi.string().email().max(50).required(),
      password: Joi.string().required(),
    }),
};
