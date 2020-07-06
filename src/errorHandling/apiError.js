class APIError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

class NotFoundError extends APIError {
  constructor(message = "Resource Not Found", statusCode = "404") {
    super(message, statusCode);
  }
}

class AlreadyExistsError extends APIError {
  constructor(message = "Resource Already Exists", statusCode = "400") {
    super(message, statusCode);
  }
}
class IncorrectPasswordError extends APIError {
  constructor(message = "Incorrect Password", statusCode = "404") {
    super(message, statusCode);
  }
}

class InvalidTokenError extends APIError {
  constructor(message = "Invalid Token", statusCode = "401") {
    super(message, statusCode);
  }
}

class ValidationError extends APIError {
  constructor(message, statusCode = "404") {
    super(message, statusCode);
  }
}

module.exports = {
  APIError,
  NotFoundError,
  AlreadyExistsError,
  IncorrectPasswordError,
  InvalidTokenError,
  ValidationError,
};
