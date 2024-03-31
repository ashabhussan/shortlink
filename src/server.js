require('dotenv').config();
require('./db').connectDB();
const { logger } = require('./utils');
const app = require('./app');
const {
  app: { port },
} = require('./config');

app.listen(port, () => {
  logger.info(`Server listening on port ${port}`);
});

module.exports = app;
