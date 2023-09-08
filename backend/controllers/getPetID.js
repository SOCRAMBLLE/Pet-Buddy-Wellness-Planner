const AWS = require("aws-sdk");
const config = require("../config/aws-config");

AWS.config.update({
  accessKeyId: config.accessKeyId,
  secretAccessKey: config.secretAccessKey,
  region: config.region,
});

const dynamoDB = new AWS.DynamoDB();

exports.getPetID = (req, res) => {
  const { username } = req.query;

  const paramsScan = {
    TableName: "PetBuddyDataBase",
    FilterExpression: "Username = :username",
    ExpressionAttributeValues: {
      ":username": { S: username },
    },
    ProjectionExpression: "PetID",
  };

  dynamoDB.scan(paramsScan, (err, data) => {
    if (err) {
      console.error("Erro ao buscar o PetID:", err);
      res
        .status(500)
        .json({ error: "Erro ao buscar o PetID.", details: err.message });
      return;
    }
    if (data.Items.length > 0) {
      const petID = data.Items[0].PetID.S;
      res.json({ success: true, petID });
    } else {
      res.json({ success: false });
    }
  });
};
