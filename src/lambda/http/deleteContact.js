const AWS = require("aws-sdk");

let dynamodb = new AWS.DynamoDB.DocumentClient();

module.exports.handler = async (event) => {
  let deleteParams = {
    TableName: process.env.CONTACTS_TABLE,
    Key: {
      id: event.pathParameters.id,
    },
  };

  try {
    await dynamodb.delete(deleteParams).promise();
  } catch (deleteError) {
    console.log("There was an error deleting the contact. ", deleteError);
    console.log("Update params ", deleteParams);
    return {
      statusCode: 500,
    };
  }

  return {
    statusCode: 200,
  };
};
