require('colors');
const util = require('util');

const appConfig = require('config').get('app');
const { createLogger, format, transports } = require('winston');

const { combine, timestamp, printf } = format;

const customFormat = printf(
  ({ message, moduleName }) =>
    `[${moduleName}] [${appConfig.nodeEnv}]: ${message}`.magenta,
);

const winstonLogger = createLogger({
  format: combine(timestamp({ format: 'YYYY-MM-DD hh:mm:ss A' }), customFormat),
});

if (appConfig.nodeEnv !== 'production') {
  winstonLogger.add(new transports.Console());
}

if (appConfig.nodeEnv === 'production') {
  winstonLogger.add(
    new transports.File({ filename: 'error.log', level: 'error' }),
  );
  winstonLogger.add(
    new transports.File({ filename: 'out.log', level: 'info' }),
  );
}

module.exports = (moduleName) => {
  const childLogger = winstonLogger.child({ moduleName });
  const logger = {};

  // LOG
  logger.log = (message) => {
    childLogger.info(message);
  };

  // ERROR
  logger.error = (message, object = null) => {
    if (object) {
      childLogger.error(
        util.formatWithOptions({ colors: true }, `${message}`, object),
      );
    } else {
      childLogger.error(message);
    }
  };

  return logger;
};
