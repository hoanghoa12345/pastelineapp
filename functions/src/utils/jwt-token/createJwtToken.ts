import jwt from 'jsonwebtoken';
import { config } from '../../config';
import { JwtPayload } from '../../types/JwtPayload';

export const createJwtToken = (payload: JwtPayload): string => {
  return jwt.sign(payload, config.jwt.secret, {
    expiresIn: config.jwt.expiresIn,
  });
};
