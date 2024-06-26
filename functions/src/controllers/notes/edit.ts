import { Request, Response, NextFunction } from 'express';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { UpdateCommand } from '@aws-sdk/lib-dynamodb';
import { config } from '../../config';
import { ApiError } from '../../utils/response/ApiError';
import validator from 'validator';

const client = new DynamoDBClient({
  region: config.dynamodb.region,
});

export const edit = async (req: Request, res: Response, next: NextFunction) => {
  const noteId = req.params.noteId;
  const { title, content, isFavorite, isPinned, category, isDeleted } = req.body;

  const attributeValues: Record<string, unknown> = {};

  if (title !== undefined && title !== null && !validator.isEmpty(title)) {
    attributeValues[':title'] = title;
  }

  if (content !== undefined && content !== null && !validator.isEmpty(content)) {
    attributeValues[':content'] = content;
  }

  if (isFavorite !== undefined && isFavorite !== null && validator.isBoolean(isFavorite)) {
    attributeValues[':isFavorite'] = validator.toBoolean(isFavorite);
  }

  if (isPinned !== undefined && isPinned !== null && validator.isBoolean(isPinned)) {
    attributeValues[':isPinned'] = validator.toBoolean(isPinned);
  }

  if (category !== undefined && category !== null && validator.isAlphanumeric(category)) {
    attributeValues[':category'] = category;
  }

  if (isDeleted !== undefined && isDeleted !== null && validator.isBoolean(isDeleted)) {
    attributeValues[':isDeleted'] = validator.toBoolean(isDeleted);
  }

  if (Object.keys(attributeValues).length === 0) {
    return next(new ApiError(400, 'Invalid attribute value', { error: 'Invalid attribute value' }));
  }
  attributeValues[':updatedAt'] = new Date().toISOString();

  const updateExpression = `set ${Object.keys(attributeValues)
    .map((key) => `${key.replace(/:/g, '')} = ${key}`)
    .join(', ')}`;

  try {
    const { $metadata } = await client.send(
      new UpdateCommand({
        TableName: config.dynamodb.tables.notes,
        Key: {
          noteId: noteId,
          userId: req.user.userId,
        },
        UpdateExpression: updateExpression,
        ExpressionAttributeValues: attributeValues,
      }),
    );
    res.onSuccess(200, 'Updated note success!', $metadata.httpStatusCode);
  } catch (error) {
    return next(new ApiError(500, 'Could not update note', error));
  }
};
