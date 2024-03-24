require('dotenv').config();
require('./db/connect');
const express = require('express');
const {
  app: { port },
} = require('./config/config');
const logger = require('./utils/logger');
const router = require('./routes');

const app = express();

app.use(express.json());
app.use('/api', router);

app.listen(port, () => {
  logger.info(`Server listening on port ${port}`);
});
