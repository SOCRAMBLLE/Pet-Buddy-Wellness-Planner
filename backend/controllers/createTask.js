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
    } if (!data.Item) {
      res.status(404).json({ error: 'Pet not found.' });
      return;
    }

    // Update list items
    // const currentTasks = data.Item.ToDoList.L || [];
    // const updatedTasks = currentTasks.push( { L: [{S: newTask}, {BOOL: false}] } );

    // const newTasks = [{S: newTask , BOOL: false}]
    const newTasks = [{
        "Description": newTask ,
        "Completed": false ,
    }];

    // update list items on DB
    const paramsUpdate = {
      TableName: 'PetBuddyToDoLists',
      Key: {
        PetID: petID,
      },
      UpdateExpression: 'SET ToDoList = list_append(ToDoList, :newTask)',
      ExpressionAttributeValues: {
        ':newTask':  newTasks,
      },
      ReturnValues: 'UPDATED_NEW',
    };

    dynamoDB.update(paramsUpdate, (err, data) => {
      if (err) {
        console.error('Error updating list items:', err);
        res.status(500).json({ error: 'Error updating list items.' });
        return;
      }
      console.log('Item created successfully.', data);
      res.status(201).json({ message: 'Item created successfully.' });
    });
  });
  
};