const winston = require('winston');
const { isDevEnvironment, isProdEnvironment } = require('../config');

const enumerateErrorFormat = winston.format((log) => {
  if (log instanceof Error) {
    Object.assign(log, { message: log.stack });
  }
  return log;
});

const logger = winston.createLogger({
  level: isDevEnvironment ? 'debug' : 'info',
  format: winston.format.combine(
    enumerateErrorFormat(),
    !isProdEnvironment ? winston.format.colorize({ all: true }) : winston.format.uncolorize(),
    winston.format.printf(({ level, message }) => `${level}: ${message}`),
  ),
  transports: [new winston.transports.Console()],
});

module.exports = { logger };
