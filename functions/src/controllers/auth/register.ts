import { Request, Response, NextFunction } from 'express';
import { DynamoDBClient, QueryCommand } from '@aws-sdk/client-dynamodb';
import { PutCommand } from '@aws-sdk/lib-dynamodb';
import bcrypt from 'bcryptjs';
import { v4 } from 'uuid';
import jwt from 'jsonwebtoken';
import { config } from '../../config';
import { ApiError } from '../../utils/response/ApiError';
import { Logger } from '../../utils/logger/Logger';

const client = new DynamoDBClient({
  region: config.dynamodb.region,
});

export const register = async (req: Request, res: Response, next: NextFunction) => {
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
      return next(new ApiError(400, 'Email already exists. Please choose another email', {}));
    }

    const hashPassword = bcrypt.hashSync(password);

    const newUser = {
      userId: v4(),
      name: email.split('@')[0],
      email,
      password: hashPassword,
      photoUrl: '',
      locale: 'en-US',
      theme: 'light',
      isAdmin: false,
      isActive: false,
    };

    await client.send(
      new PutCommand({
        TableName: config.dynamodb.tables.users,
        Item: newUser,
      }),
    );

    const token = jwt.sign({ userId: newUser.userId }, config.jwt.secret, {
      expiresIn: config.jwt.verifyEmailExpiresIn,
    });

    res.onSuccess(201, 'Create account successful!', {
      user: newUser,
      message: 'Please check email and verify email address',
      token,
    });
  } catch (error) {
    logger.error(error);
    return next(new ApiError(500, 'Could not create account', error));
  }
};
