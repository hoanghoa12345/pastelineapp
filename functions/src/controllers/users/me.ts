import { Request, Response, NextFunction } from 'express';
import { DynamoDBClient, GetItemCommand } from '@aws-sdk/client-dynamodb';
import { unmarshall } from '@aws-sdk/util-dynamodb';
import { config } from '../../config';
import { ApiError } from '../../utils/response/ApiError';

const client = new DynamoDBClient({
  region: config.dynamodb.region,
});

export const me = async (req: Request, res: Response, next: NextFunction) => {
  const params = {
    TableName: config.dynamodb.tables.users,
    Key: {
      userId: { S: req.user.userId },
    },
  };
  try {
    const { Item } = await client.send(new GetItemCommand(params));
    if (Item) {
      const { userId, name, email, photoUrl, locale, theme, isAdmin } = unmarshall(Item);
      res.json({ userId, name, email, photoUrl, locale, theme, isAdmin });
    } else {
      return next(new ApiError(401, 'Unauthorized', { error: 'Could not find user with provided "userId"' }));
    }
  } catch (error) {
    return next(new ApiError(500, 'Could not retrieve user', error));
  }
};