import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../../utils/response/ApiError';
import jwt from 'jsonwebtoken';
import { createAccessToken, decodeJwtToken } from '../../utils/jwt-token/createJwtToken';
import { config } from '../../config';
import { JwtPayload } from '../../types/JwtPayload';

export const refreshToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const refreshToken = req.cookies.refresh_token;
    if (refreshToken) {
      jwt.verify(refreshToken, config.jwt.secret, (err, decode) => {
        if (err) {
          return next(new ApiError(400, 'Invalid Token', err));
        } else {
          const payload: JwtPayload = {
            userId: decode.userId,
            name: decode.name,
            email: decode.email,
            isAdmin: decode.isAdmin,
          };
          const accessToken = createAccessToken(payload);
          res.onSuccess(200, 'Refresh token successful!', {
            access_token: accessToken,
            expiration: decodeJwtToken(accessToken).exp * 1000,
          });
        }
      });
    } else {
      res.status(400).json({ message: 'Refresh token not provided' });
    }
  } catch (error) {
    return next(new ApiError(500, 'Could not refresh token', error));
  }
};
