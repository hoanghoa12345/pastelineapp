import {DynamoDBClient} from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({
  region: "ap-southeast-1"
});

export default client;