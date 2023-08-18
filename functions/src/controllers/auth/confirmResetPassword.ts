import { Request, Response, NextFunction } from 'express';
import { DynamoDBClient, GetItemCommand } from '@aws-sdk/client-dynamodb';
import { UpdateCommand } from '@aws-sdk/lib-dynamodb';
import jwt from 'jsonwebtoken';
import { config } from '../../config';
import { ApiError } from '../../utils/response/ApiError';

const client = new DynamoDBClient({
  region: config.dynamodb.region,
});

export const confirmResetPassword = async (req: Request, res: Response, next: NextFunction) => {
  const { token, password } = req.body;
  const { userId } = jwt.verify(token, config.jwt.secret);

  if (!userId) {
    return next(ApiError.badRequest('Token is invalid or expired'));
  }

  const params = {
    TableName: config.dynamodb.tables.users,
    Key: {
      userId: { S: userId },
    },
  };
  try {
    const { Item } = await client.send(new GetItemCommand(params));

    if (!Item) {
      return next(ApiError.notFound('User not found'));
    }

    const paramsUpdate = {
      TableName: config.dynamodb.tables.users,
      Key: {
        userId: userId,
      },
      UpdateExpression: 'set password = :password',
      ExpressionAttributeValues: {
        ':password': password,
      },
    };
    await client.send(new UpdateCommand(paramsUpdate));
    return res.status(200).json({
      message: 'Password updated successfully',
    });
  } catch (error) {
    return next(ApiError.badRequest('Cannot reset your password', error));
  }
};
