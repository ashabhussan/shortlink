const Joi = require('joi');
const { passwordRegex, generateJoiValidator } = require('../../utils');

const authValidator = {
  validateUserCreation: generateJoiValidator(
    Joi.object()
      .options({ abortEarly: false, stripUnknown: true })
      .keys({
        name: Joi.string().required(),
        email: Joi.string().email().max(50).required(),
        password: Joi.string().min(8).max(50).regex(passwordRegex).required(),
      }),
  ),

  validateUserLogin: generateJoiValidator(
    Joi.object()
      .options({ abortEarly: false, stripUnknown: true })
      .keys({
        email: Joi.string().email().max(50).required(),
        password: Joi.string().required(),
      }),
  ),
};

module.exports = authValidator;
