require('dotenv').config();
const express = require('express');
const {
  app: { port },
} = require('./config/config');
const logger = require('./utils/logger');

const app = express();

app.listen(port, () => {
  logger.info(`Server listening on port ${port}`);
});
