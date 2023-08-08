import { Request, Response, NextFunction } from 'express';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { UpdateCommand } from '@aws-sdk/lib-dynamodb';
import { config } from '../../config';
import { ApiError } from '../../utils/response/ApiError';

const client = new DynamoDBClient({
  region: config.dynamodb.region,
});

export const edit = async (req: Request, res: Response, next: NextFunction) => {
  const noteId = req.params.noteId;
  const { title, content } = req.body;

  try {
    await client.send(
      new UpdateCommand({
        TableName: config.dynamodb.tables.notes,
        Key: {
          noteId: noteId,
          userId: req.user.userId,
        },
        UpdateExpression: 'set title = :title, content = :content, updatedAt = :updatedAt',
        ExpressionAttributeValues: {
          ':title': title,
          ':content': content,
          ':updatedAt': new Date().toISOString(),
        },
      }),
    );
    res.onSuccess(200, 'Updated note success!');
  } catch (error) {
    return next(new ApiError(500, 'Could not update note', error));
  }
};
