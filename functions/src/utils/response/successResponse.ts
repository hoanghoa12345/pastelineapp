import { response, Response } from 'express';

response.onSuccess = function (httpStatusCode: number, message: string, data: unknown = null): Response {
  return this.status(httpStatusCode).json({ message, data });
};
