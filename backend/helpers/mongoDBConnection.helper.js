const mongoose = require('mongoose');
const mongoDBConfig = require('config').get('mongoDB');
/**
 * Helper Function to establish a connection to mongo DB
 * @returns {Promise || Error}
 */
const mongooseConnection = () => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(mongoDBConfig.uri, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
      })
      .then(resolve)
      .catch((err) => reject(err));
  });
};

module.exports = mongooseConnection;
