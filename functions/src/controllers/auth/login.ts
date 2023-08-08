import { Request, Response, NextFunction } from 'express';
import { DynamoDBClient, QueryCommand } from '@aws-sdk/client-dynamodb';
import { unmarshall } from '@aws-sdk/util-dynamodb';
import bcrypt from 'bcryptjs';
import { config } from '../../config';
import { ApiError } from '../../utils/response/ApiError';
import { createJwtToken } from '../../utils/jwt-token/createJwtToken';

const client = new DynamoDBClient({
  region: config.dynamodb.region,
});

export const login = async (req: Request, res: Response, next: NextFunction) => {
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
      const user = unmarshall(Items[0]);
      if (bcrypt.compareSync(password, user.password)) {
        const payload = {
          userId: user.userId,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
        };
        user.password = '';
        res.send({
          message: 'Login successful',
          data: {
            user,
            access_token: createJwtToken(payload),
          },
        });
        return;
      }
    }
    return next(new ApiError(400, 'Invalided email or password', null));
  } catch (error) {
    return next(new ApiError(400, error.message, error));
  }
};
