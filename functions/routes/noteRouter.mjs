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
import { isAuth } from '../utils/helper.mjs';

const noteRouter = express.Router()


const dynamoDbClient = DynamoDBDocumentClient.from(client);

const NOTES_TABLE = 'notes';

noteRouter.get('/', isAuth, async (req, res) => {
    try {
        const { Items } = await dynamoDbClient.send(new QueryCommand({
            TableName: NOTES_TABLE,
            IndexName: 'userId-index',
            KeyConditionExpression: "userId = :userId",
            ExpressionAttributeValues: {
                ":userId": req.user.userId
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

noteRouter.get('/:noteId/:updatedAt', isAuth, async (req, res) => {
    try {
        const { Item } = await dynamoDbClient.send(new GetCommand({
            TableName: NOTES_TABLE,
            Key: {
                noteId: req.params.noteId,
                updatedAt: req.params.updatedAt
            }
        }))
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

noteRouter.get('/:noteId', isAuth, async (req, res) => {
    try {
        const { Items } = await dynamoDbClient.send(new QueryCommand({
            TableName: NOTES_TABLE,
            KeyConditionExpression: "noteId = :noteId",
            ExpressionAttributeValues: {
                ":noteId": req.params.noteId
            }
        }))
        res.status(200).json({
            message: "Get note success",
            data: Items
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
                noteId: noteId
            },
            UpdateExpression: 'set title = :title, content = :content, updatedAt = :updatedAt',
            ExpressionAttributeValues: {
                ":title": title,
                ":content": content,
                ":updatedAt": new Date().toISOString(),
            }
        }))
        res.status(201).json({
            message: 'Create notes success!',
            data: newNote
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Could not update note" });
    }
})

export default noteRouter