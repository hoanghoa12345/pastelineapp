import { Request, Response, NextFunction } from 'express';

import { ApiError } from '../utils/response/ApiError';

export const errorHandler = (err: ApiError, req: Request, res: Response, next: NextFunction) => {
  return res.status(err.StatusCode).json(err.JSON);
};
