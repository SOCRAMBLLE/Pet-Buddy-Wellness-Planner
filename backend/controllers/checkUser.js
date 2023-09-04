const AWS = require("aws-sdk");
const config = require("../config/aws-config");

AWS.config.update({
  accessKeyId: config.accessKeyId,
  secretAccessKey: config.secretAccessKey,
  region: config.region,
});

const dynamoDB = new AWS.DynamoDB();

exports.checkUser = (req, res) => {
  const { username, password } = req.body;

  const paramsScan = {
    TableName: "PetBuddyDataBase",
    FilterExpression: "Username = :username AND Password = :password",
    ExpressionAttributeValues: {
      ":username": { S: username },
      ":password": { S: password },
    },
  };

  dynamoDB.scan(paramsScan, (err, data) => {
    if (err) {
      console.error("Error checking username:", err);
      res
        .status(500)
        .json({ error: "Error checking username.", details: err.message });
      return;
    }
    if (data.Items.length > 0) {
      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  });
};
