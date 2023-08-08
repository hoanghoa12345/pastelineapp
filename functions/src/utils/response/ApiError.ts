export class ApiError extends Error {
  private statusCode: number;
  private errorRaw: unknown;

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
      errors: this.errorRaw,
      statusCode: this.statusCode,
      message: this.message,
      stack: this.stack,
    };
  }
}
