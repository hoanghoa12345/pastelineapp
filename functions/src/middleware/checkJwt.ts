import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ApiError } from '../utils/response/ApiError';
import { config } from '../config';

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    const token = authorization.slice(7, authorization.length);
    jwt.verify(token, config.jwt.secret, (err, decode) => {
      if (err) {
        return next(new ApiError(401, 'Invalid Token', err));
      } else {
        req.user = decode;
        next();
      }
    });
  } else {
    return next(new ApiError(401, 'No Token', {}));
  }
};
