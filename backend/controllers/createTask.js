const AWS = require('aws-sdk');
const config = require('../config/aws-config');

AWS.config.update({
  accessKeyId: config.accessKeyId,
  secretAccessKey: config.secretAccessKey,
  region: config.region,
});

const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.createTask = (req, res) => {
  const { petID, newTask } = req.body;

  // Check actual list items
  const paramsGet = {
    TableName: 'PetBuddyToDoLists',
    Key: {
      PetID: petID,
    },
  };

  dynamoDB.get(paramsGet, (err, data) => {
    if (err) {
      console.error('Error fetching list items:', err);
      res.status(500).json({ error: 'Error fetching list items.' });
      return;
    }

    // Update list items
    const currentTasks = data.Item ? data.Item.ToDoList : [];
    currentTasks.push({ S: newTask });

    // update list items on DB
    const paramsUpdate = {
      TableName: 'PetBuddyToDoLists',
      Key: {
        PetID: petID,
      },
      UpdateExpression: 'set ToDoList = :tasks',
      ExpressionAttributeValues: {
        ':tasks': currentTasks,
      },
    };

    dynamoDB.update(paramsUpdate, (err, data) => {
      if (err) {
        console.error('Error updating list items:', err);
        res.status(500).json({ error: 'Error updating list items.' });
        return;
      }

      res.status(201).json({ message: 'Item created successfully.' });
    });
  });
};