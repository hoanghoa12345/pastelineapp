import { Request, Response, NextFunction } from 'express';
import { DynamoDBClient, GetItemCommand } from '@aws-sdk/client-dynamodb';
import { unmarshall } from '@aws-sdk/util-dynamodb';
import { config } from '../../config';
import { ApiError } from '../../utils/response/ApiError';

const client = new DynamoDBClient({
  region: config.dynamodb.region,
});

export const edit = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.user;
        const { email, name, photoUrl, locale, theme } = req.body;
        const params = {
            TableName: config.dynamodb.tables.users,
            Key: {
                userId: {
                    S: userId
                }
            },
            UpdateExpression: 'set email = :email, name = :name, photoUrl = :photoUrl, locale = :locale, theme = :theme',
            ExpressionAttributeValues: {
                ':email': {
                    S: email
                },
                ':name': {
                    S: name
                },
                ':photoUrl': {
                    S: photoUrl
                },
                ':locale': {
                    S: locale
                },
                ':theme': {
                    S: theme
                }
            },
            ReturnValues: 'ALL_NEW'
        };
        const data = await client.send(new GetItemCommand(params));
        if (!data.Item) {
            throw new ApiError(404, 'User not found', {});
        }
        res.status(200).json({
            success: true,
            data: unmarshall(data.Item)
        });
        return;
    } catch (error) {
        return next(new ApiError(500, 'Could not edit user', error));
    }
}
    
