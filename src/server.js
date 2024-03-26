require('dotenv').config();
require('./db/connect');
const express = require('express');
const {
  app: { port },
} = require('./config/config');
const { apiRouter, redirectRouter } = require('./routes');
const { logger } = require('./utils');

const app = express();

app.use(express.json());
app.use('/api', apiRouter);
app.use('/', redirectRouter);

app.listen(port, () => {
  logger.info(`Server listening on port ${port}`);
});
