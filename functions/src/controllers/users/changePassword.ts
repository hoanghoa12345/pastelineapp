import { Request, Response, NextFunction } from 'express';
import { DynamoDBClient, GetItemCommand, QueryCommand } from '@aws-sdk/client-dynamodb';
import { UpdateCommand } from '@aws-sdk/lib-dynamodb';
import { unmarshall } from '@aws-sdk/util-dynamodb';
import bcrypt from 'bcryptjs';
import { config } from '../../config';
import { ApiError } from '../../utils/response/ApiError';

const client = new DynamoDBClient({
  region: config.dynamodb.region,
});

export const changePassword = async (req: Request, res: Response, next: NextFunction) => {
  const { oldPassword, newPassword } = req.body;
  const { userId } = req.user;
  try {
    // check old password is correct
    const getItemCommand = new GetItemCommand({
      TableName: config.dynamodb.tables.users,
      Key: {
        userId: { S: userId },
      },
    });
    const result = await client.send(getItemCommand);
    const user = unmarshall(result.Item);
    if (bcrypt.compareSync(oldPassword, user.password) === false) {
      return next(ApiError.badRequest('Old password is incorrect', {}));
    }

    // update password
    client.send(
      new UpdateCommand({
        TableName: config.dynamodb.tables.users,
        Key: {
          userId: { S: userId },
        },
        UpdateExpression: 'set password = :password',
        ExpressionAttributeValues: {
          ':password': { S: newPassword },
        },
      }),
    );
  } catch (error) {
    return next(ApiError.badRequest('Cannot change password', error));
  }
};
