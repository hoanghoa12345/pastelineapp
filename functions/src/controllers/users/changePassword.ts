import { Request, Response, NextFunction } from 'express';
import { DynamoDBClient, GetItemCommand } from '@aws-sdk/client-dynamodb';
import { UpdateCommand } from '@aws-sdk/lib-dynamodb';
import { unmarshall } from '@aws-sdk/util-dynamodb';
import bcrypt from 'bcryptjs';
import { config } from '../../config';
import { ApiError } from '../../utils/response/ApiError';
import { Logger } from '../../utils/logger/Logger';
import { log } from 'console';

const client = new DynamoDBClient({
  region: config.dynamodb.region,
});

export const changePassword = async (req: Request, res: Response, next: NextFunction) => {
  const { oldPassword, newPassword } = req.body;
  const { userId } = req.user;
  const logger = new Logger();
  logger.info('changePassword');
  logger.info('oldPassword', oldPassword);
  logger.info('newPassword', newPassword);
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

    const hashPassword = bcrypt.hashSync(newPassword);

    // update password
    client.send(
      new UpdateCommand({
        TableName: config.dynamodb.tables.users,
        Key: {
          userId: userId,
        },
        UpdateExpression: 'set password = :password',
        ExpressionAttributeValues: {
          ':password': hashPassword,
        },
      }),
    );

    res.onSuccess(200, 'Update password successfully');
  } catch (error) {
    logger.error(error);
    return next(ApiError.badRequest('Cannot change password', error));
  }
};
