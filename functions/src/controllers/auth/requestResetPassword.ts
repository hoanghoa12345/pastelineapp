import { Request, Response, NextFunction } from 'express';
import { DynamoDBClient, QueryCommand } from '@aws-sdk/client-dynamodb';
import { unmarshall } from '@aws-sdk/util-dynamodb';
import jwt from 'jsonwebtoken';
import { v4 } from 'uuid';
import { config } from '../../config';
import { ApiError } from '../../utils/response/ApiError';
import { sendResetPasswordEmail } from '../../utils/emails/sendEmail';

const client = new DynamoDBClient({
  region: config.dynamodb.region,
});

export const requestResetPassword = async (req: Request, res: Response, next: NextFunction) => {
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
    const resetPasswordToken = jwt.sign({ userId }, config.jwt.secret, {
      expiresIn: '1h',
    })
    const appUrl = config.app.url;
    sendResetPasswordEmail(email, `${appUrl}/reset-password?token=${resetPasswordToken}`)
    res.onSuccess(200, "Send reset password email successfully", {
      email: email
    })
  } catch (error) {
    console.log(error);
    return next(new ApiError(500, 'Internal server error', error));
  }
};