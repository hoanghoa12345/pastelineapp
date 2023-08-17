import { Request, Response, NextFunction } from 'express';
import { DynamoDBClient, ScanCommand } from '@aws-sdk/client-dynamodb';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
import { config } from '../../config';
import { ApiError } from '../../utils/response/ApiError';

const client = new DynamoDBClient({
  region: config.dynamodb.region,
});

export const list = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.user;
    const { page, limit, favorite, pinned, category, deleted } = req.query;

    const attributeNames: Record<string, string> = {
      '#userId': 'userId',
      '#isDeleted': 'isDeleted',
    };

    const attributeValues: Record<string, string | boolean> = {
      ':userId': userId,
      ':isDeleted': false,
    };

    if (favorite) {
      attributeNames['#isFavorite'] = 'isFavorite';
      attributeValues[':isFavorite'] = true;
    }

    if (pinned) {
      attributeNames['#isPinned'] = 'isPinned';
      attributeValues[':isPinned'] = true;
    }

    if (category) {
      attributeNames['#category'] = 'category';
      attributeValues[':category'] = `${category}`;
    }

    if (deleted) {
      attributeValues[':isDeleted'] = true;
    }

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
        FilterExpression: `#userId = :userId and #isDeleted = :isDeleted ${
          favorite ? 'and #isFavorite = :isFavorite' : ''
        } ${pinned ? 'and #isPinned = :isPinned' : ''} ${category ? 'and #category = :category' : ''}`,
        ExpressionAttributeNames: attributeNames,
        ExpressionAttributeValues: marshall(attributeValues, { removeUndefinedValues: true }),
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
    next(new ApiError(500, 'Could not retrieve notes', error));
  }
};
