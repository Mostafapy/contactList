require('colors');
const dotenv = require('dotenv');

dotenv.config({ path: './config/development.js' });
const express = require('express');
const morgan = require('morgan');
const config = require('config');

const logger = require('./utils/logger.util')('Server');

// configration
const appConfig = config.get('app');

// DB
const connectDB = require('./config/db');

// Routes
const routes = require('./routes/index');

// Error Handling Middleware
const errorHandler = require('./middlewares/errorHandler.middleware');

// connect to MongoDB
connectDB();

const app = express();

app.use(express.json());

if (appConfig.nodeEnv === 'development') {
  app.use(
    morgan((tokens, req, res) =>
      [
        `<${appConfig.nodeEnv}>`,
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'),
        '-',
        tokens['response-time'](req, res),
        'ms',
      ].join(' '),
    ),
  );
}

// Mount the routes
app.use(routes);

// Error Handler
app.use(errorHandler);

// Port
const port = appConfig.port || '3000';

// Listen
const server = app.listen(port, () =>
  logger.log(`App Listen Successfully To Port ${port}`.yellow.bold),
);

// Unhandled Promise Rejection Handler
process.on('unhandledRejection', (ex) => {
  logger.error(`${ex.message}`.red, ex);
  app.use((_req, res) => {
    res.status(500).json({
      success: false,
      msg: '500 Internet Error',
      data: null,
    });
  });

  // eslint-disable-next-line implicit-arrow-linebreak
  server.close(() => process.exit(1));
});
