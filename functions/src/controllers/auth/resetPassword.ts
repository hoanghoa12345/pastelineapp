import { Request, Response, NextFunction } from 'express';
import { DynamoDBClient, GetItemCommand, QueryCommand } from '@aws-sdk/client-dynamodb';
import { PutCommand } from '@aws-sdk/lib-dynamodb';
import { unmarshall } from '@aws-sdk/util-dynamodb';
import bcrypt from 'bcryptjs';
import { v4 } from 'uuid';
import jwt from 'jsonwebtoken';
import { config } from '../../config';
import { ApiError } from '../../utils/response/ApiError';
import { sendWelcomeEmail, sendResetPasswordEmail } from '../../utils/emails/sendEmail';

const client = new DynamoDBClient({
  region: config.dynamodb.region,
});

export const resetPassword = async (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body;

  try {
    const { Items } = await client.send(
      new QueryCommand({
        TableName: config.dynamodb.tables.users,
        IndexName: 'email-index',
        KeyConditionExpression: 'email = :email',
        ExpressionAttributeValues: {
          ':email': { S: email },
        },
      }),
    );

    if (Items.length === 0) {
      return next(new ApiError(404, 'User not found', {}));
    }

    const userId = unmarshall(Items[0]).userId;
    sendResetPasswordEmail(email, userId);
    res.status(200).json({ userId });
  } catch (error) {
    console.log(error);

    return next(new ApiError(500, 'Internal server error', error));
  }
};
