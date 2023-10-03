const AWS = require('aws-sdk');
const config = require('../config/aws-config');

AWS.config.update({
  accessKeyId: config.accessKeyId,
  secretAccessKey: config.secretAccessKey,
  region: config.region,
});

const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.deleteTask = async (req, res) => {
  const { petID, taskID } = req.body;

  try {
    // Verifique se a tarefa existe antes de excluí-la
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

    // Encontre a tarefa pelo TaskID
    const taskIndex = data.Item.ToDoList.findIndex((task) => task.TaskID === taskID);

    if (taskIndex === -1) {
      res.status(404).json({ error: 'Task not found.' });
      return;
    }

    // Remova a tarefa da lista
    data.Item.ToDoList.splice(taskIndex, 1);

    // Atualize a lista no DB
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

    res.status(200).json({ message: 'Task removed successfully.' });
  } catch (error) {
    console.error('Error while removing task:', error);
    res.status(500).json({ error: 'Error while removing task.' });
  }
};
