import jwt from 'jsonwebtoken';
import { config } from '../../config';
import { JwtPayload } from '../../types/JwtPayload';

export enum TokenType {
  ACCESS_TOKEN = 'access_token',
  REFRESH_TOKEN = 'refresh_token',
}

const createJwtToken = (payload: JwtPayload, type: TokenType): string => {
  const audience = '';
  const issuer = '';
  const expiresIn = type === TokenType.ACCESS_TOKEN ? config.jwt.expiresIn : config.jwt.refreshTokenExpiresIn;

  return jwt.sign({ type, ...payload }, config.jwt.secret, {
    expiresIn: expiresIn,
    audience: audience,
    issuer: issuer,
    subject: payload.userId,
  });
};

export const decodeJwtToken = (token: string) => {
  return jwt.verify(token, config.jwt.secret);
};

export const createAccessToken = (payload: JwtPayload): string => createJwtToken(payload, TokenType.ACCESS_TOKEN);
export const createRefreshToken = (payload: JwtPayload): string => createJwtToken(payload, TokenType.REFRESH_TOKEN);
