import { JwtPayload } from '../JwtPayload';
import { Session } from 'express-session';

declare global {
  namespace Express {
    export interface Request {
      user: JwtPayload;
      session: Session;
    }
    export interface Response {
      onSuccess(httpStatusCode: number, message: string, data?: unknown): Response;
    }
  }
}
