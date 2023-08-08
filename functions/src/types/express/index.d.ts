import { JwtPayload } from '../JwtPayload';

declare global {
  namespace Express {
    export interface Request {
      user: JwtPayload;
    }
    export interface Response {
      onSuccess(httpStatusCode: number, message: string, data?: unknown): Response;
    }
  }
}
