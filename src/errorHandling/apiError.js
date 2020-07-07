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
  constructor(message = "Resource ", statusCode = "404") {
    super(`${message} not found`, statusCode);
  }
}

class AlreadyExistsError extends APIError {
  constructor(message = "Resource ", statusCode = "400") {
    super(`${message} already exists`, statusCode);
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
class InternalError extends APIError {
  constructor(message = "Internal Server Error", statusCode = "404") {
    super(message, statusCode);
  }
}
class AlreadyLoggedInError extends APIError {
  constructor(message = "Already logged in", statusCode = "404") {
    super(message, statusCode);
  }
}
class TokenExpiredError extends APIError {
  constructor(message = "Token Expired", statusCode = "404") {
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
  InternalError,
  AlreadyLoggedInError,
  TokenExpiredError,
};
