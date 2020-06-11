const createResponse = (isSuccess, msg, err, data, errorCode = null) => {
  return {
    success: isSuccess,
    msg,
    err,
    data,
    errorCode,
  };
};

module.exports = { createResponse };
