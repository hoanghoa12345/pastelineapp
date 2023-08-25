import { Request, Response, NextFunction } from 'express';
import { DynamoDBClient, QueryCommand } from '@aws-sdk/client-dynamodb';
import { unmarshall } from '@aws-sdk/util-dynamodb';
import jwt from 'jsonwebtoken';
import { config } from '../../config';
import { ApiError } from '../../utils/response/ApiError';
import { Logger } from '../../utils/logger/Logger';

const client = new DynamoDBClient({
  region: config.dynamodb.region,
});

export const requestActive = async (req: Request, res: Response, next: NextFunction) => {
  const logger = new Logger();
  try {
    const { email } = req.body;

    if (!email) {
      return next(ApiError.badRequest('Email is required'));
    }

    const params = {
      TableName: config.dynamodb.tables.users,
      IndexName: 'email-index',
      KeyConditionExpression: 'email = :email',
      ExpressionAttributeValues: {
        ':email': { S: email },
      },
    };

    const { Items } = await client.send(new QueryCommand(params));

    if (Items.length === 0) {
      return next(ApiError.notFound('User not found'));
    }

    const { isActive, userId } = unmarshall(Items[0]) as { isActive: boolean; userId: string };

    if (isActive) {
      return next(ApiError.badRequest('User already active'));
    }

    const token = jwt.sign({ userId }, config.jwt.secret, { expiresIn: config.jwt.verifyEmailExpiresIn });

    res.onSuccess(200, 'Send verify email successfully', { email, token });
  } catch (e) {
    logger.error(e);
    return next(ApiError.badRequest('Something went wrong'));
  }
};
