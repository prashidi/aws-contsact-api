const AWS = require("aws-sdk");

let dynamodb = new AWS.DynamoDB.DocumentClient();

module.exports.handler = async (event) => {
  let scanParams = {
    TableName: process.env.CONTACTS_TABLE,
  };

  let scanResult = {};
  try {
    scanResult = await dynamodb.scan(scanParams).promise();
  } catch (scanError) {
    console.log("There was an error scanning contacts. ", scanError);
    return {
      statusCode: 500,
    };
  }

  if (
    scanResult.Items === null ||
    !Array.isArray(scanResult.Items) ||
    scanResult.Items.length === 0
  ) {
    return {
      statusCode: 404,
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(
      scanResult.Items.map((contact) => {
        return {
          id: contact.id,
          name: contact.name,
          email: contact.email,
          phone: contact.phone,
        };
      })
    ),
  };
};
