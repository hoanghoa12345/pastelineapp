import { Request, Response, NextFunction } from 'express';
import { DynamoDBClient, QueryCommand } from '@aws-sdk/client-dynamodb';
import { PutCommand } from '@aws-sdk/lib-dynamodb';
import { unmarshall } from '@aws-sdk/util-dynamodb';
import bcrypt from 'bcryptjs';
import { config } from '../../config';
import { ApiError } from '../../utils/response/ApiError';
import { createAccessToken, createRefreshToken, decodeJwtToken } from '../../utils/jwt-token/createJwtToken';
import { Logger } from '../../utils/logger/Logger';
import { OAuthUserInfo } from '../../types/oauth/userInfo';

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
        res.cookie('refresh_token', refreshToken, { httpOnly: true, sameSite: 'none', secure: true });
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
export async function ssoLogin(userInfo: OAuthUserInfo) {
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
          ':email': { S: userInfo.email },
        },
      }),
    );

    if (Items.length > 0) {
      const user = unmarshall(Items[0]);

      const payload = {
        userId: user.userId,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      };
      const refreshToken = createRefreshToken(payload);
      const accessToken = createAccessToken(payload);
      return {
        user,
        accessToken,
        expiration: decodeJwtToken(accessToken).exp * 1000,
        refreshToken,
      };
    } else {
      const newUser = {
        userId: userInfo.sub,
        name: userInfo.email.split('@')[0],
        email: userInfo.email,
        password: '',
        photoUrl: '',
        locale: 'en-US',
        theme: 'light',
        isAdmin: false,
        isActive: true,
      };

      await client.send(
        new PutCommand({
          TableName: config.dynamodb.tables.users,
          Item: newUser,
        }),
      );

      const payload = {
        userId: newUser.userId,
        name: newUser.name,
        email: newUser.email,
        isAdmin: newUser.isAdmin,
      };

      const refreshToken = createRefreshToken(payload);
      const accessToken = createAccessToken(payload);
      return {
        user: newUser,
        accessToken,
        expiration: decodeJwtToken(accessToken).exp * 1000,
        refreshToken,
      };
    }
  } catch (error) {
    throw new Error(error);
  }
}
