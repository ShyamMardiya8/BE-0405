class ApiErrorHandler extends Error {
  constructor(message = "something went wrong", statusCode, stack = "") {
    super(message);
    this.message = message;
    this.statusCode = statusCode;
    this.success = false;

    if (stack) {
      this.stack = stack;
    } else if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

module.exports = ApiErrorHandler