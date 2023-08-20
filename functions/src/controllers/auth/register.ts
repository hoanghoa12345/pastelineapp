import { Request, Response, NextFunction } from 'express';
import { DynamoDBClient, QueryCommand } from '@aws-sdk/client-dynamodb';
import { PutCommand } from '@aws-sdk/lib-dynamodb';
import bcrypt from 'bcryptjs';
import { v4 } from 'uuid';
import jwt from 'jsonwebtoken';
import { config } from '../../config';
import { ApiError } from '../../utils/response/ApiError';
import { sendVerifyEmail } from '../../utils/emails/sendEmail';

const client = new DynamoDBClient({
  region: config.dynamodb.region,
});

export const register = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

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

    const appUrl = config.app.url;

    const token = jwt.sign({ userId: newUser.userId }, config.jwt.secret, {
      expiresIn: config.jwt.verifyEmailExpiresIn,
    });

    sendVerifyToken(email, appUrl, token);

    res.onSuccess(201, 'Create account successful!', {
      user: newUser,
      message: 'Please check email and verify email address',
    });
  } catch (error) {
    return next(new ApiError(500, 'Could not create account', error));
  }
};

const sendVerifyToken = (email: string, appUrl: string, token: string) => {
  const verifyURL = `${appUrl}/verify?token=${token}`;
  sendVerifyEmail(email, verifyURL);
};
