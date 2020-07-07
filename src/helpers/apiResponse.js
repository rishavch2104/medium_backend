class APIResponse {
  constructor(message, data, statusCode, status) {
    this.statusCode = statusCode;
    this.status = status;
    this.message = message;
    this.data = data;
  }

  send(res) {
    return res.status(this.statusCode).json(this.sanitize());
  }
  sanitize() {
    if (this.data) {
      return {
        status: this.status,
        message: this.message,
        data: this.data,
      };
    } else {
      return {
        status: this.status,
        message: this.message,
      };
    }
  }
}

class SuccessResponse extends APIResponse {
  constructor(message, data = null, statusCode = 200, status = "Success") {
    super(message, data, statusCode, status);
  }
}

module.exports = { SuccessResponse };
