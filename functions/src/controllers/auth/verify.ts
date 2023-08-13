import { Request, Response, NextFunction } from 'express';
import { DynamoDBClient, GetItemCommand, QueryCommand } from '@aws-sdk/client-dynamodb';
import { unmarshall } from '@aws-sdk/util-dynamodb';
import bcrypt from 'bcryptjs';
import { config } from '../../config';
import { ApiError } from '../../utils/response/ApiError';
import { createJwtToken } from '../../utils/jwt-token/createJwtToken';
import { PutCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb';

const client = new DynamoDBClient({
  region: config.dynamodb.region,
});

export const verify = async (req: Request, res: Response, next: NextFunction) => {
  const { token } = req.query;

  console.log(token.toString());

  try {
    const { Item } = await client.send(
      new GetItemCommand({
        TableName: config.dynamodb.tables.users,
        Key: { userId: { S: token.toString() } },
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

      console.log(response);

      res.onSuccess(200, 'Verify email successful!', {});
    } else {
      return next(new ApiError(400, 'Could not verify email', {}));
    }
  } catch (error) {
    return next(new ApiError(400, error.message, error));
  }
};
