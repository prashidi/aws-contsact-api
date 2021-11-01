const AWS = require("aws-sdk");
const { v4: uuidv4 } = require("uuid");

let dynamodb = new AWS.DynamoDB.DocumentClient();

module.exports.handler = async (event) => {
  let bodyObj = {};
  let id = uuidv4();

  try {
    bodyObj = JSON.parse(event.body);
  } catch (jsonError) {
    console.log("There was an error parsing the body", jsonError);
    return {
      statusCode: 400,
    };
  }

  if (typeof bodyObj.name === "undefined") {
    console.log("Missing required parameters");
    console.log("Body ", bodyObj);
    return {
      statusCode: 400,
    };
  }

  let putParams = {
    TableName: process.env.CONTACTS_TABLE,
    Item: {
      id,
      ...bodyObj,
    },
  };

  let putResult = {};

  try {
    putResult = await dynamodb.put(putParams).promise();
  } catch (putError) {
    console.log("There was an error putting the contact. ", putError);
    console.log("Put params ", putParams);
    return {
      statusCode: 500,
    };
  }

  return {
    statusCode: 204,
  };
};
