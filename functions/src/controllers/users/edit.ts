import { Request, Response, NextFunction } from 'express';
import { AttributeValue, DynamoDBClient, UpdateItemCommand } from '@aws-sdk/client-dynamodb';
import { unmarshall } from '@aws-sdk/util-dynamodb';
import { config } from '../../config';
import { ApiError } from '../../utils/response/ApiError';

const client = new DynamoDBClient({
  region: config.dynamodb.region,
});

export const edit = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.user;
    const { email, name, photoUrl, locale, theme, isActive } = req.body;
    const attributeNames: Record<string, string> = {};
    const attributeValues: Record<string, AttributeValue> = {};

    if (email) {
      attributeNames['#email'] = 'email';
      attributeValues[':email'] = { S: email };
    }

    if (name) {
      attributeNames['#name'] = 'name';
      attributeValues[':name'] = { S: name };
    }

    if (photoUrl) {
      attributeNames['#photoUrl'] = 'photoUrl';
      attributeValues[':photoUrl'] = { S: photoUrl };
    }

    if (locale) {
      attributeNames['#locale'] = 'locale';
      attributeValues[':locale'] = { S: locale };
    }

    if (theme) {
      attributeNames['#theme'] = 'theme';
      attributeValues[':theme'] = { S: theme };
    }

    if (isActive) {
      attributeNames['#isActive'] = 'isActive';
      attributeValues[':isActive'] = { BOOL: isActive };
    }

    if (Object.keys(attributeNames).length === 0) {
      return next(new ApiError(400, 'Nothing to update', {}));
    }

    const updateExpression = Object.keys(attributeNames)
      .map(
        (key, index) => `${key} = :${key.substring(1)}${index === Object.keys(attributeNames).length - 1 ? '' : ', '}`,
      )
      .join('');

    const params = {
      TableName: config.dynamodb.tables.users,
      Key: {
        userId: {
          S: userId,
        },
      },
      UpdateExpression: `set ${updateExpression}`,
      ExpressionAttributeNames: attributeNames,
      ExpressionAttributeValues: attributeValues,
      ReturnValues: 'ALL_NEW',
    };
    const { Attributes } = await client.send(new UpdateItemCommand(params));
    delete Attributes.password;
    res.onSuccess(200, 'Updated user', unmarshall(Attributes));
    return;
  } catch (error) {
    return next(new ApiError(500, 'Could not edit user', error));
  }
};
