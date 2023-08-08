import { Request, Response, NextFunction } from 'express';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { UpdateCommand } from '@aws-sdk/lib-dynamodb';
import { config } from '../../config';
import { ApiError } from '../../utils/response/ApiError';

const client = new DynamoDBClient({
  region: config.dynamodb.region,
});

export const destroy = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await client.send(
      new UpdateCommand({
        TableName: config.dynamodb.tables.notes,
        Key: {
          noteId: req.params.noteId,
          userId: req.user.userId,
        },
        UpdateExpression: 'set isDeleted = :isDeleted, updatedAt = :updatedAt',
        ExpressionAttributeValues: {
          ':isDeleted': true,
          ':updatedAt': new Date().toISOString(),
        },
      }),
    );
    res.onSuccess(200, 'Deleted note success!');
  } catch (error) {
    return next(new ApiError(500, 'Could not delete note', error));
  }
};
