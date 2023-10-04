const AWS = require('aws-sdk');
const config = require('../config/aws-config');

AWS.config.update({
  accessKeyId: config.accessKeyId,
  secretAccessKey: config.secretAccessKey,
  region: config.region,
});

const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.modifyTaskDescription = async (req, res) => {
  const { petID, taskID, newDescription } = req.body;

  try {
    // Verify if task exists
    const paramsGet = {
      TableName: 'PetBuddyToDoLists',
      Key: {
        PetID: petID,
      },
    };

    const data = await dynamoDB.get(paramsGet).promise();

    if (!data.Item || !data.Item.ToDoList) {
      res.status(404).json({ error: 'Pet not found or no to-do list available.' });
      return;
    }

    // find task by taskID
    const taskIndex = data.Item.ToDoList.findIndex((task) => task.TaskID === taskID);

    if (taskIndex === -1) {
      res.status(404).json({ error: 'Task not found.' });
      return;
    }

    // update description
    data.Item.ToDoList[taskIndex].Description = newDescription;

    // update on DB
    const paramsUpdate = {
      TableName: 'PetBuddyToDoLists',
      Key: {
        PetID: petID,
      },
      UpdateExpression: 'SET ToDoList = :newTaskList',
      ExpressionAttributeValues: {
        ':newTaskList': data.Item.ToDoList,
      },
      ReturnValues: 'UPDATED_NEW',
    };

    await dynamoDB.update(paramsUpdate).promise();

    res.status(200).json({ message: 'Task description updated successfully.' });
  } catch (error) {
    console.error('Error while updating task description:', error);
    res.status(500).json({ error: 'Error while updating task description.' });
  }
};
