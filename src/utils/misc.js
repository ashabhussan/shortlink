const mongoose = require('mongoose');

module.exports = {
  querySkip: (page, perPage) => perPage * (page - 1),

  isValidId: (id) => mongoose.isValidObjectId(id),
};
