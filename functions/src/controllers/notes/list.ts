import { Request, Response, NextFunction } from 'express';
import { DynamoDBClient, GetItemCommand, ScanCommand } from '@aws-sdk/client-dynamodb';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
import { config } from '../../config';
import { ApiError } from '../../utils/response/ApiError';

const client = new DynamoDBClient({
  region: config.dynamodb.region,
});

export const list = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.user;
    const { page, limit } = req.query;
    const { Items, LastEvaluatedKey, Count } = await client.send(
      new ScanCommand({
        TableName: config.dynamodb.tables.notes,
        Limit: limit ? Number(limit) : undefined,
        ExclusiveStartKey: page
          ? {
              noteId: { S: `${page}` },
              userId: { S: userId },
            }
          : undefined,
        FilterExpression: 'userId = :userId and isDeleted = :isDeleted',
        ExpressionAttributeValues: {
          ':userId': { S: userId },
          ':isDeleted': { BOOL: false },
        },
        ProjectionExpression: 'noteId, userId, title, category, isPinned, isFavorite, createdAt, updatedAt, isDeleted',
      }),
    );
    const result = Items?.map((item) => unmarshall(item)) || [];

    res.status(200).json({
      message: 'Notes retrieved successfully',
      data: result,
      pagination: {
        page: LastEvaluatedKey ? LastEvaluatedKey.noteId.S : undefined,
        limit: limit ? Number(limit) : undefined,
        count: Count,
      },
    });
  } catch (error) {
    console.log(error);
    next(new ApiError(500, 'Could not retrieve notes', error));
  }
};
