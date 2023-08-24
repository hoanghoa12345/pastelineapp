import { DynamoDBClient, CreateTableCommand } from '@aws-sdk/client-dynamodb';
import { config } from '../../config';

const client = new DynamoDBClient({ region: config.dynamodb.region });

export const createUsersTable = async () => {
  const command = new CreateTableCommand({
    TableName: 'users',
    AttributeDefinitions: [
      {
        AttributeName: 'email',
        AttributeType: 'S',
      },
      {
        AttributeName: 'isActive',
        AttributeType: 'BOOL',
      },
      {
        AttributeName: 'isAdmin',
        AttributeType: 'BOOL',
      },
      {
        AttributeName: 'locale',
        AttributeType: 'S',
      },
      {
        AttributeName: 'name',
        AttributeType: 'S',
      },
      {
        AttributeName: 'password',
        AttributeType: 'S',
      },
      {
        AttributeName: 'photoUrl',
        AttributeType: 'S',
      },
      {
        AttributeName: 'theme',
        AttributeType: 'S',
      },
    ],
    KeySchema: [
      {
        AttributeName: 'userId',
        KeyType: 'HASH',
      },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1,
    },
  });

  const response = await client.send(command);

  return response;
};

export const createNotesTable = async () => {
  const command = new CreateTableCommand({
    TableName: 'notes',
    AttributeDefinitions: [
      {
        AttributeName: 'category',
        AttributeType: 'S',
      },
      {
        AttributeName: 'content',
        AttributeType: 'S',
      },
      {
        AttributeName: 'createdAt',
        AttributeType: 'S',
      },
      {
        AttributeName: 'updatedAt',
        AttributeType: 'S',
      },
      {
        AttributeName: 'isDeleted',
        AttributeType: 'BOOL',
      },
      {
        AttributeName: 'isFavorite',
        AttributeType: 'BOOL',
      },
      {
        AttributeName: 'isPinned',
        AttributeType: 'BOOL',
      },
    ],
    KeySchema: [
      {
        AttributeName: 'noteId',
        KeyType: 'HASH',
      },
      {
        AttributeName: 'userId',
        KeyType: 'RANGE',
      },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1,
    },
  });

  const response = await client.send(command);
  return response;
};
