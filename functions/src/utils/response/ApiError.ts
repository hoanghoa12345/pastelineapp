export class ApiError extends Error {
  private statusCode: number;
  private errorRaw: Error;

  constructor(statusCode, message, errorRaw) {
    super(message);
    this.statusCode = statusCode;
    this.errorRaw = errorRaw;
  }
  get StatusCode() {
    return this.statusCode;
  }
  get JSON() {
    return {
      errors: this.errorRaw ? this.errorRaw.message : null,
      statusCode: this.statusCode,
      message: this.message,
      // stack: this.stack,
    };
  }

  static badRequest(message, errorRaw = null) {
    return new ApiError(400, message, errorRaw);
  }

  static internal(message, errorRaw = null) {
    return new ApiError(500, message, errorRaw);
  }

  static notFound(message, errorRaw = null) {
    return new ApiError(404, message, errorRaw);
  }
}
