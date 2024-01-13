import { Request, Response, NextFunction } from 'express';

export const logout = (req: Request, res: Response, next: NextFunction) => {
  res.cookie('refresh_token', '', { httpOnly: true });
};
