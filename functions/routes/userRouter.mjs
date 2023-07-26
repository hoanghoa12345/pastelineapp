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
import bcrypt from "bcryptjs";
import { isAuth, generateToken, isAdmin } from '../utils/helper.mjs';

const userRouter = express.Router();


const dynamoDbClient = DynamoDBDocumentClient.from(client);

const USERS_TABLE = 'users';

userRouter.post('/signin', async ({ body }, res) => {
    try {
        const { Items } = await dynamoDbClient.send(new QueryCommand({
            TableName: USERS_TABLE,
            IndexName: "email-index",
            KeyConditionExpression: "#email = :email",
            ExpressionAttributeNames: {
                "#email": "email"
            },
            ExpressionAttributeValues: {
                ":email": body.email
            }
        }))

        console.log("item", Items)

        if (Items.length > 0) {
            const user = Items[0];
            if (bcrypt.compareSync(body.password, user.password)) {
                user.password = ''
                res.send({
                    message: "Login successful",
                    data: {
                        user,
                        access_token: generateToken(user)
                    },
                })
                return;
            }
        }


        res.status(400).json({
            message: "Invalided email or password",
        })

    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
})

userRouter.post("/signup", async ({ body }, res) => {
    const { name, email, password } = body;
    if (typeof email !== "string") {
        res.status(400).json({ error: '"email" must be a string' });
        return;
    } else if (typeof password !== "string") {
        res.status(400).json({ error: '"password" must be a string' });
        return;
    }

    const { Items } = await dynamoDbClient.send(new QueryCommand({
        TableName: USERS_TABLE,
        IndexName: "email-index",
        KeyConditionExpression: "#email = :email",
        ExpressionAttributeNames: {
            "#email": "email"
        },
        ExpressionAttributeValues: {
            ":email": body.email
        }
    }))

    if (Items.length > 0) {
        res.status(400).json({ error: 'Email already exists' });
        return;
    }

    let hashPassword = bcrypt.hashSync(password)
    const newUser = {
        userId: uuidv4(),
        name,
        email,
        password: hashPassword,
        photoUrl: "",
        locale: "en-US",
        theme: "light",
        isAdmin: false
    }
    const params = {
        TableName: USERS_TABLE,
        Item: newUser,
    };

    try {
        await dynamoDbClient.send(new PutCommand(params));
        newUser.password = ''
        res.status(201).json({
            message: 'Create account success!',
            data: newUser
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Could not create user", error: error.message });
    }
});

userRouter.get("/me", isAuth, async (req, res) => {
    const params = {
        TableName: USERS_TABLE,
        Key: {
            userId: req.user.userId,
        },
    };

    try {
        const { Item } = await dynamoDbClient.send(new GetCommand(params));
        if (Item) {
            const { userId, name, email, photoUrl, locale, theme, isAdmin } = Item;
            res.json({ userId, name, email, photoUrl, locale, theme, isAdmin });
        } else {
            res
                .status(404)
                .json({ error: 'Could not find user with provided "userId"' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Could not retrieve user" });
    }
})

userRouter.get("/:userId", isAuth, async (req, res) => {
    const params = {
        TableName: USERS_TABLE,
        Key: {
            userId: req.params.userId,
        },
    };

    try {
        const { Item } = await dynamoDbClient.send(new GetCommand(params));
        if (Item) {
            const { userId, name, email, photoUrl, locale, theme, isAdmin } = Item;
            res.json({ userId, name, email, photoUrl, locale, theme, isAdmin });
        } else {
            res
                .status(404)
                .json({ error: 'Could not find user with provided "userId"' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Could not retrieve user" });
    }
})

userRouter.put("/:userId", isAuth, async ({ user, body }, res) => {

    try {
        await dynamoDbClient.send(new UpdateCommand({
            TableName: USERS_TABLE,
            Key: {
                userId: user.userId
            },
            UpdateExpression: 'set photoUrl = :p',
            ExpressionAttributeValues: {
                ":p": body.photoUrl
            }
        }))
        res.status(200).json({
            message: "Updated users",
            userId: user.userId
        })
    } catch (error) {
        res.status(500).json({ error: "Could not update user" });
    }
})

userRouter.delete("/:userId", isAuth, async ({ params }, res) => {
    const { userId } = params

    try {
        if (userId) {
            await dynamoDbClient.send(new DeleteCommand({
                TableName: USERS_TABLE,
                Key: {
                    userId
                }
            }))

            res.json({
                message: "Delete user successful!",
                userId
            })
        }
    } catch (error) {
        res.status(500).json({ message: "Could not remove user", error: error.message });
    }
})

export default userRouter;