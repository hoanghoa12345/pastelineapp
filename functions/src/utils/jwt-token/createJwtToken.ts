import jwt from 'jsonwebtoken';

import { JwtPayload } from '../../types/JwtPayload';

export const createJwtToken = (payload: JwtPayload): string => {
  return jwt.sign(payload, process.env.JWT_SECRET || '75186ae9d2b71f54360d', {
    expiresIn: process.env.JWT_EXPIRATION || '30d',
  });
};
