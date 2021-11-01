const AWS = require("aws-sdk");

let dynamodb = new AWS.DynamoDB.DocumentClient();

module.exports.handler = async (event) => {
  let bodyObj = {};

  try {
    bodyObj = JSON.parse(event.body);
  } catch (jsonError) {
    console.log("There was an error parsing the body", jsonError);
    return {
      statusCode: 400,
    };
  }

  let updateParams = {
    TableName: process.env.CONTACTS_TABLE,
    Key: {
      id: event.pathParameters.id,
    },
    UpdateExpression: "SET #name = :name",
    ExpressionAttributeNames: {
      "#name": "name",
    },
    ExpressionAttributeValues: {
      ":name": bodyObj.name,
    },
    ReturnValues: "ALL_NEW",
  };

  let updateResult = {};

  try {
    updateResult = await dynamodb.update(updateParams).promise();
  } catch (updateError) {
    console.log("There was an error updating the contact. ", updateError);
    console.log("Update params ", updateParams);
    return {
      statusCode: 500,
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(updateResult),
  };
};
