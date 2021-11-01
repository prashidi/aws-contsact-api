const AWS = require("aws-sdk");

let dynamodb = new AWS.DynamoDB.DocumentClient();

module.exports.handler = async (event) => {
  let getParams = {
    TableName: process.env.CONTACTS_TABLE,
    Key: {
      id: event.pathParameters.id,
    },
  };

  let getResult = {};
  try {
    getResult = await dynamodb.get(getParams).promise();
  } catch (getError) {
    console.log("There was an error getting the contact. ", getError);
    return {
      statusCode: 500,
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      getResult,
    }),
  };
};
