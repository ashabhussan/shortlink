const mongoose = require('mongoose');
const { db } = require('../config/config');
const logger = require('../utils/logger');

mongoose
  .connect(db.uri)
  .then(() => logger.info(`Connected to DB server. ( ${db.uri} )`))
  .catch((err) => logger.error(`FAILED to connect using mongoose. ${err}`));
