import { Request, Response, NextFunction } from 'express';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { v4 } from 'uuid';
import { PutCommand } from '@aws-sdk/lib-dynamodb';
import { config } from '../../config';
import { ApiError } from '../../utils/response/ApiError';

const client = new DynamoDBClient({
  region: config.dynamodb.region,
});

export const store = async (req: Request, res: Response, next: NextFunction) => {
  const { title, content } = req.body;
  const newNote = {
    noteId: v4(),
    title,
    content,
    userId: req.user.userId,
    category: '',
    isFavorite: false,
    isPinned: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isDeleted: false,
  };
  try {
    await client.send(
      new PutCommand({
        TableName: config.dynamodb.tables.notes,
        Item: newNote,
      }),
    );
    res.onSuccess(201, 'Create notes success!', newNote);
  } catch (error) {
    return next(new ApiError(500, 'Could not create note', error));
  }
};
