# Lambda function

``` javascript
const docClient = new AWS.DynamoDB.DocumentClient({
    region: 'ap-southeast-1'
});
```

``` javascript
module.exports.handler = async (event, context) => {
    let body;
    let statusCode = 200;
    const headers = {
        "Content-Type": "application/json",
    }
    
    const params = {
    TableName: 'users',
    Item: {
      userId: uuidv4(),
      name: "Test",
      email: "test@gmail.com",
      password: "123456",
      photoUrl: "",
      locale: "en-US",
      theme: "light",
      isAdmin: false
    }
  };

  try {
    await docClient.put(params).promise();
    body = { body: 'Successfully created item!' };
  } catch (err) {
    body = { error: err };
  }finally {
        body = JSON.stringify(body, null, 2);
    }

    try {
        switch (event.rawPath) {
            case "/api/v1/about":
                body = { message: 'Version 1.0.0' }
                break;
            case "/api/v1/list":
                body = {
                    message: "Get list success"
                };
                break;
            case "/api/v1/context":
                body = {
                    input: event,
                    context: context
                };
                break;
            case "/":
                body = {
                    message: "Go Serverless v3.0! Your function executed successfully!",
                    input: event,
                }
                break;

            default:
                throw new Error(`Unsupported route: "${event.rawPath}"`);
        }
    } catch (err) {
        statusCode = 400;
        body = err.message;
    } finally {
        body = JSON.stringify(body, null, 2);
    }

    return {
        statusCode,
        body,
        headers,
    };
};
```