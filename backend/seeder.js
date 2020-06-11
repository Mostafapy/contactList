require('colors');
const mongoose = require('mongoose');
const { promisify } = require('util');
const fs = require('fs');

const mongoDBConnectionHelper = require('./helpers/mongoDBConnection.helper');

const logger = require('./utils/logger.util')('Seeder');

// Load models
const UserModel = require('./models/user.model');

// Connect MongoDB
mongoDBConnectionHelper().catch((err) => {
  logger.error(
    '@mongoose.connect() failed connect to mongoDB [error: %s]'.red.underline
      .bold,
    err.message,
  );
  mongoose.connection
    .close()
    .then(() => {
      process.exit(1);
    })
    .catch(() => {
      process.exit(1);
    });
});

// Import into DB
const importData = async () => {
  try {
    const readFile = promisify(fs.readFile);

    const data = await readFile(`${__dirname}/_data/users.json`);

    // parse to JSON
    const usersData = JSON.parse(data);

    await UserModel.create(usersData);

    logger.log('Data imported Successfully'.green.inverse);

    process.exit();
  } catch (err) {
    logger.error('importData() [error: %s]'.red.inverse, err.message);
  }
};

// Import Action
if (process.argv[2] === '-i') {
  importData();
}
