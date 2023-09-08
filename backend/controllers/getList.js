const AWS = require("aws-sdk");
const config = require("../config/aws-config");

AWS.config.update({
  accessKeyId: config.accessKeyId,
  secretAccessKey: config.secretAccessKey,
  region: config.region,
});

const dynamoDB = new AWS.DynamoDB();

exports.getList = (req, res) => {
  const { petID } = req.query;

  const paramsList = {
    TableName: "PetBuddyToDoLists",
    KeyConditionExpression: "PetID = :petID",
    ExpressionAttributeValues: {
      ":petID": { S: petID },
    },
  };

  dynamoDB.query(paramsList, (err, data) => {
    if (err) {
      console.error("Error querying ToDoList:", err);
      res
        .status(500)
        .json({ error: "Error querying ToDoList.", details: err.message });
      return;
    } if (data.Items.length > 0) {
        const toDoList = data.Items[0].ToDoList.L;
        res.json({ success: true, toDoList });
    } else {
        res.json({success:false, toDoList: [] })
    }
  });
};
