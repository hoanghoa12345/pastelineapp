import { Request, Response, NextFunction } from 'express';
import { DynamoDBClient, QueryCommand } from '@aws-sdk/client-dynamodb';
import { unmarshall } from '@aws-sdk/util-dynamodb';
import bcrypt from 'bcryptjs';
import { config } from '../../config';
import { ApiError } from '../../utils/response/ApiError';
import { createAccessToken, createRefreshToken, decodeJwtToken } from '../../utils/jwt-token/createJwtToken';
import { Logger } from '../../utils/logger/Logger';

const client = new DynamoDBClient({
  region: config.dynamodb.region,
});

export const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  const logger = new Logger();
  try {
    const { Items } = await client.send(
      new QueryCommand({
        TableName: config.dynamodb.tables.users,
        IndexName: 'email-index',
        KeyConditionExpression: '#email = :email',
        ExpressionAttributeNames: {
          '#email': 'email',
        },
        ExpressionAttributeValues: {
          ':email': { S: email },
        },
      }),
    );
    if (Items.length > 0) {
      const user = unmarshall(Items[0]);
      if (user?.isActive === false) return next(new ApiError(400, 'Account is not active!', {}));
      if (bcrypt.compareSync(password, user.password)) {
        const payload = {
          userId: user.userId,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
        };
        user.password = '';
        const refreshToken = createRefreshToken(payload);
        const accessToken = createAccessToken(payload);
        res.cookie('refresh_token', refreshToken, { httpOnly: true, sameSite: 'lax' });
        res.send({
          message: 'Login successful!',
          data: {
            user,
            access_token: accessToken,
            expiration: decodeJwtToken(accessToken).exp * 1000,
          },
        });
        return;
      }
    }
    return next(new ApiError(400, 'Invalided email or password', null));
  } catch (error) {
    logger.error(error);
    return next(new ApiError(400, error.message, error));
  }
};
