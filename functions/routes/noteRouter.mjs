import express from 'express';
import client from '../libs/dynamoDB.mjs';

import {
    DynamoDBDocumentClient,
    GetCommand,
    PutCommand,
    QueryCommand,
    ScanCommand,
    DeleteCommand,
    UpdateCommand,
} from "@aws-sdk/lib-dynamodb";

import { v4 as uuidv4 } from 'uuid';
import { isAuth, isUUID } from '../utils/helper.mjs';

const noteRouter = express.Router()


const dynamoDbClient = DynamoDBDocumentClient.from(client);

const NOTES_TABLE = 'notes';

noteRouter.get('/', isAuth, async (req, res) => {
    try {
        const { Items } = await dynamoDbClient.send(new ScanCommand({
            TableName: NOTES_TABLE,
            FilterExpression: "userId = :userId and isDeleted = :isDeleted",
            ExpressionAttributeValues: {
                ":userId": req.user.userId,
                ":isDeleted": false
            }
        }))
        res.status(200).json({
            message: 'Get all notes',
            data: Items
        })
    } catch (error) {
        res.status(500).json({ message: "Could not retrieve notes", error: error.message });
    }
})

noteRouter.get('/search', isAuth, async (req, res) => {
    const query = req.query.q
    if (!query) {
        res.status(400).json({ error: '"query" must be a string' });
        return
    }

    const params = {
        TableName: NOTES_TABLE,
        IndexName: "userId-title-index",
        KeyConditionExpression: "userId = :userId and begins_with(title, :title)",
        ExpressionAttributeValues: {
            ":userId": req.user.userId,
            ":title": query
        }
    };

    try {
        const { Items } = await dynamoDbClient.send(new QueryCommand(params))
        res.status(200).json({
            message: `Get all notes by search ${query}`,
            data: Items
        })
    } catch (error) {
        res.status(500).json({ message: "Could not search notes", error: error.message });
    }
})

noteRouter.get('/:noteId', isAuth, async (req, res) => {
    if (!isUUID(req.params.noteId)) {
        res.status(404).json({ message: 'noteID must be UUID' })
        return;
    }
    try {
        const { Item } = await dynamoDbClient.send(new GetCommand({
            TableName: NOTES_TABLE,
            Key: {
                noteId: req.params.noteId,
                userId: req.user.userId
            }
        }))
        if (Item.isDeleted) {
            res.status(404).json({
                message: 'Note is deleted'
            })
        }
        res.status(200).json({
            message: "Get note success",
            data: Item
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Note is not found'
        })
    }
})

noteRouter.post('/', isAuth, async (req, res) => {
    const { title, content } = req.body

    if (typeof title !== 'string') {
        res.status(400).json({ error: '"title" must be a string' });
        return;
    }
    if (!content) {
        res.status(400).json({ error: '"content" must be not null' });
        return;
    }
    const newNote = {
        noteId: uuidv4(),
        title,
        content,
        userId: req.user.userId,
        category: '',
        isFavorite: false,
        isPinned: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isDeleted: false
    }

    try {
        await dynamoDbClient.send(new PutCommand({
            TableName: NOTES_TABLE,
            Item: newNote
        }))
        res.status(201).json({
            message: 'Create notes success!',
            data: newNote
        })
    } catch (error) {
        res.status(500).json({ message: "Could not create note", error: error.message });
    }
})

noteRouter.patch('/:noteId/:action', isAuth, async (req, res) => {
    const noteId = req.params.noteId
    const action = req.params.action

    if (!noteId) {
        res.status(400).json({ error: '"noteId" must be a UUID' });
        return;
    }
    var params = {
        TableName: NOTES_TABLE,
        Key: {
            noteId: noteId,
            userId: req.user.userId
        }
    }

    switch (action) {
        case 'pinned':
            params = {
                ...params,
                UpdateExpression: 'set isPinned = :isPinned, updatedAt = :updatedAt',
                ExpressionAttributeValues: {
                    ":isPinned": true,
                    ":updatedAt": new Date().toISOString(),
                }
            }
            break;
        case 'un-pinned':
            params = {
                ...params,
                UpdateExpression: 'set isPinned = :isPinned, updatedAt = :updatedAt',
                ExpressionAttributeValues: {
                    ":isPinned": false,
                    ":updatedAt": new Date().toISOString(),
                }
            }
            break;
        case 'favorite':
            params = {
                ...params,
                UpdateExpression: 'set isFavorite = :isFavorite, updatedAt = :updatedAt',
                ExpressionAttributeValues: {
                    ":isFavorite": true,
                    ":updatedAt": new Date().toISOString(),
                }
            }
            break;
        case 'unfavorite':
            params = {
                ...params,
                UpdateExpression: 'set isFavorite = :isFavorite, updatedAt = :updatedAt',
                ExpressionAttributeValues: {
                    ":isFavorite": false,
                    ":updatedAt": new Date().toISOString(),
                }
            }
            break;
        case 'category':
            if (!req.body.category) {
                res.status(400).json('category must be a string');
                return;
            }
            params = {
                ...params,
                UpdateExpression: 'set category = :category, updatedAt = :updatedAt',
                ExpressionAttributeValues: {
                    ":category": req.body.category,
                    ":updatedAt": new Date().toISOString(),
                }
            }
            break;
        case 'undo-delete':
            params = {
                ...params,
                UpdateExpression: 'set isDeleted = :isDeleted, updatedAt = :updatedAt',
                ExpressionAttributeValues: {
                    ":isDeleted": false,
                    ":updatedAt": new Date().toISOString(),
                }
            }
            break;
        default:
            res.status(400).json({
                message: 'Action not found',
            })
            return;
    }

    try {
        await dynamoDbClient.send(new UpdateCommand(params))
        res.status(200).json({
            message: `${action} notes success!`,
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: `Could not ${action} note` });
    }
})

noteRouter.patch('/:noteId', isAuth, async (req, res) => {
    const noteId = req.params.noteId
    const { title, content } = req.body

    if (!noteId) {
        res.status(400).json({ error: '"noteId" must be a UUID' });
        return;
    }
    if (typeof title !== 'string') {
        res.status(400).json({ error: '"title" must be a string' });
        return;
    }
    if (!content) {
        res.status(400).json({ error: '"content" must be not null' });
        return;
    }

    try {
        await dynamoDbClient.send(new UpdateCommand({
            TableName: NOTES_TABLE,
            Key: {
                noteId: noteId,
                userId: req.user.userId
            },
            UpdateExpression: 'set title = :title, content = :content, updatedAt = :updatedAt',
            ExpressionAttributeValues: {
                ":title": title,
                ":content": content,
                ":updatedAt": new Date().toISOString(),
            }
        }))
        res.status(200).json({
            message: 'Updated note success!',
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Could not update note" });
    }
})

noteRouter.delete('/:noteId', isAuth, async (req, res) => {
    if (!isUUID(req.params.noteId)) {
        res.status(404).json({ message: 'noteID must be UUID' })
        return;
    }
    try {
        await dynamoDbClient.send(new UpdateCommand({
            TableName: NOTES_TABLE,
            Key: {
                noteId: req.params.noteId,
                userId: req.user.userId
            },
            UpdateExpression: 'set isDeleted = :isDeleted, updatedAt = :updatedAt',
            ExpressionAttributeValues: {
                ":isDeleted": true,
                ":updatedAt": new Date().toISOString(),
            }
        }))
        res.status(200).json({
            message: 'Deleted note success!',
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Could not delete note" });
    }
})

export default noteRouter