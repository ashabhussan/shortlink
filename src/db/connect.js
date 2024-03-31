const mongoose = require('mongoose');
const { db, isTestEnvironment } = require('../config/config');
const { logger } = require('../utils');

let dbURL = db.uri;
if (isTestEnvironment) {
  dbURL = `${db.uri}-test`;
}

mongoose
  .connect(dbURL)
  .then(() => logger.info(`Connected to DB. ( ${dbURL} )`))
  .catch((err) => logger.error(`FAILED to connect using mongoose. ${err}`));
