const AWS = require('aws-sdk');
const config = require('../config/aws-config');

AWS.config.update({
  accessKeyId: config.accessKeyId,
  secretAccessKey: config.secretAccessKey,
  region: config.region,
});

const dynamoDB = new AWS.DynamoDB();

exports.modifyTask = (req, res) => {
  const { petID, newTask } = req.body;

};