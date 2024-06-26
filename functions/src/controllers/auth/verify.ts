import { Request, Response, NextFunction } from 'express';
import { DynamoDBClient, GetItemCommand } from '@aws-sdk/client-dynamodb';
import { unmarshall } from '@aws-sdk/util-dynamodb';
import jwt from 'jsonwebtoken';
import { config } from '../../config';
import { ApiError } from '../../utils/response/ApiError';
import { PutCommand } from '@aws-sdk/lib-dynamodb';
import { Logger } from '../../utils/logger/Logger';

const client = new DynamoDBClient({
  region: config.dynamodb.region,
});

export const verify = async (req: Request, res: Response, next: NextFunction) => {
  const { token } = req.query;
  const logger = new Logger();
  if (!token) {
    return next(new ApiError(400, 'No token provided', {}));
  }
  if (typeof token !== 'string') {
    return next(new ApiError(400, 'Invalid token', {}));
  }

  try {
    const decoded = jwt.verify(token, config.jwt.secret);

    if (!decoded) {
      return next(new ApiError(400, 'Invalid token', {}));
    }

    const { Item } = await client.send(
      new GetItemCommand({
        TableName: config.dynamodb.tables.users,
        Key: { userId: { S: decoded.userId } },
      }),
    );

    if (Item) {
      const user = unmarshall(Item);
      const response = await client.send(
        new PutCommand({
          TableName: config.dynamodb.tables.users,
          Item: {
            ...user,
            isActive: true,
          },
        }),
      );
      res.onSuccess(200, 'Verify email successful!', { response });
    } else {
      return next(ApiError.badRequest('Could not verify email', {}));
    }
  } catch (error) {
    logger.error(error);
    return next(new ApiError(400, error.message, error));
  }
};
