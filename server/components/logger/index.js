import winston from 'winston';
import winstonError from 'winston-error';

const env = process.env.NODE_ENV;
const loggerTransports = [];

if (env === 'development') {
  loggerTransports.push(new (winston.transports.Console)({
    level: 'debug',
    colorize: true,
    json: false,
    timestamp: true,
    prettyPrint: true,
  }));
} else {
  loggerTransports.push(new winston.transports.File({
    level: 'info',
    name: 'all',
    filename: `${__dirname}/../../logs/all.log`,
    handleExceptions: true,
    maxsize: 5242880,
    maxFiles: 10,
    json: false,
    colorize: false,
  }));
}

const logger = new winston.Logger({
  transports: loggerTransports,
  exitOnError: false,
});

winstonError(logger);

const stream = {
  write(message) {
    logger.info(message);
  },
};

export { stream };
export default logger;
