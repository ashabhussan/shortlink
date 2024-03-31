const mongoose = require('mongoose');
const { db } = require('../config');
const { logger } = require('../utils');

module.exports = (dbURL = db.uri) => {
  mongoose
    .connect(dbURL)
    .then(() => logger.info(`Connected to DB. ( ${dbURL} )`))
    .catch((err) => logger.error(`FAILED to connect using mongoose. ${err}`));
};
