const mongoose = require('mongoose');
const Joi = require('mongoose');

module.exports = {
  querySkip: (page, perPage) => perPage * (page - 1),

  isValidId: (id) => mongoose.isValidObjectId(id),

  formatJoiErrorMessages: (error) => {
    const errorMessage = error.details.map((detail) => {
      return {
        field: detail.context.key,
        message: detail.message.replace(/['"]/g, ''),
      };
    });
    return errorMessage;
  },

  generateJoiValidator: (schema) => (input) => {
    const { error, value } = schema.validate(input);
    if (error) {
      throw error;
    }
    return value;
  },
};
