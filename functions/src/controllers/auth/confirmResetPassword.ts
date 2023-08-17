import { Request, Response, NextFunction } from 'express';
import { DynamoDBClient, GetItemCommand, QueryCommand } from '@aws-sdk/client-dynamodb';
import { PutCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb';
import { unmarshall } from '@aws-sdk/util-dynamodb';
import jwt from 'jsonwebtoken';
import { v4 } from 'uuid';
import { config } from '../../config';
import { ApiError } from '../../utils/response/ApiError';
import { sendWelcomeEmail, sendResetPasswordEmail, sendVerifyEmail } from '../../utils/emails/sendEmail';
import { app } from 'app';

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
        userId: { S: userId },
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