import { Request, Response, NextFunction } from 'express';
import { DynamoDBClient, GetItemCommand, ScanCommand } from '@aws-sdk/client-dynamodb';
import { unmarshall } from '@aws-sdk/util-dynamodb';
import { config } from '../../config';
import { ApiError } from '../../utils/response/ApiError';

const client = new DynamoDBClient({
  region: config.dynamodb.region,
});

export const list = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { Items } = await client.send(
      new ScanCommand({
        TableName: config.dynamodb.tables.notes,
        FilterExpression: 'userId = :userId and isDeleted = :isDeleted',
        ExpressionAttributeValues: {
          ':userId': { S: req.user.userId },
          ':isDeleted': { BOOL: false },
        },
      }),
    );
    const notes = (Items || []).map((item) => {
      const note = unmarshall(item);
      note.content = '';
      return note;
    });
    res.onSuccess(200, 'Get all notes', notes);
  } catch (error) {
    return next(new ApiError(500, 'Could not retrieve notes', error));
  }
};
