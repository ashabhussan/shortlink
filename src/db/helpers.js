const mongoose = require('mongoose');

module.exports = {
  dropDB: async () => mongoose.connection.dropDatabase(),
  closeDB: async () => mongoose.connection.close(),
};
