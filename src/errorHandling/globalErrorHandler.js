const sendErrorDev = (err, res) => {
  console.log("in error dev");
  return res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "An error occurred";
  console.log("in error handler");
  console.log(process.env.NODE_ENV);
  if (process.env.NODE_ENV === "development") sendErrorDev(err, res);
};
