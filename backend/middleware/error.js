const ErrorHandler = require("../utls/errorhandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal server error";

  //Wrong mongoDB id error
  if (err.name === "CastError") {
    const message = "Response not found. Invalid " + err.path;
    err = new ErrorHandler(message, 400);
  }

  //mongoose duplicate key error
  if (err.code === 11000) {
    const message = "duplicate " + Object.keys(err.keyValue) + " entered";
    err = new ErrorHandler(message, 400);
  }

  //Wrong jsonWebToken
  if (err.name === "jsonWebTokenError") {
    const message = "json Web Token is invalid, try again";
    err = new ErrorHandler(message, 400);
  }

  //token expired
  if (err.name === "TokenExpiredError") {
    const message = "json Web Token is expired, try again";
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
