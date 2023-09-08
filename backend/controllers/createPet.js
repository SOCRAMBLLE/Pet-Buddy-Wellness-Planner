const AWS = require("aws-sdk");
const uuid = require("uuid");
const config = require("../config/aws-config");

AWS.config.update({
  accessKeyId: config.accessKeyId,
  secretAccessKey: config.secretAccessKey,
  region: config.region,
});

const dynamoDB = new AWS.DynamoDB();

exports.createPet = (req, res) => {
  const { name, species, birthDate, username, password } = req.body;

  const paramsScan = {
    TableName: "PetBuddyDataBase",
    FilterExpression: "Username = :username",
    ExpressionAttributeValues: {
      ":username": { S: username },
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
      // Username exists, return error..
      res.status(400).json({ error: "Username already exists." });
      return;
    } else {
      const petId = uuid.v4();

      const paramsNewUser = {
        TableName: "PetBuddyDataBase",
        Item: {
          PetID: { S: petId },
          Name: { S: name },
          Species: { S: species },
          BirthDate: { S: birthDate },
          Username: { S: username },
          Password: { S: password },
        },
      };

      const listID = uuid.v4();
      const paramsNewList = {
        TableName: "PetBuddyToDoLists",
        Item: {
          ListID: { S: listID },
          PetID: { S: petId },
          ToDoList: { L: [{ S: "Pet " + name }] },
        },
      };

      dynamoDB.putItem(paramsNewUser, (err, data) => {
        if (err) {
          console.error("Error adding animal:", err);
          res.status(500).json({
            error: "Error trying to register animal into DataBase",
            details: err.message,
          });
        } else {
          console.log("Animal registered successfully:", data);
          res.status(201).json({ message: "Animal registered successfully." });
        }
      });
      dynamoDB.putItem(paramsNewList, (err, data) => {
        if (err) {
          console.error("Error creating list:", err);
          res.status(500).json({
            error: "Error trying to create list into DataBase",
            details: err.message,
          });
        } else {
          console.log("List created successfully:", data);
          res.status(201).json({ message: "List created successfully." });
        }
      });
    }
  });
};
