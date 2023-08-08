import { Request, Response, NextFunction } from 'express';
import { DynamoDBClient, GetItemCommand } from '@aws-sdk/client-dynamodb';
import { unmarshall } from '@aws-sdk/util-dynamodb';
import { config } from '../../config';
import { ApiError } from '../../utils/response/ApiError';

const client = new DynamoDBClient({
  region: config.dynamodb.region,
});

export const show = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { Item } = await client.send(
      new GetItemCommand({
        TableName: config.dynamodb.tables.notes,
        Key: {
          noteId: { S: req.params.noteId },
          userId: { S: req.user.userId },
        },
      }),
    );
    const note = unmarshall(Item);
    if (note.isDeleted) {
      res.status(404).json({
        message: 'Note is deleted',
      });
    }
    res.onSuccess(200, 'Get note success', note);
  } catch (error) {
    return next(new ApiError(500, 'Could not retrieve note', error));
  }
};
