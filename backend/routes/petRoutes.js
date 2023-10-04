const express = require('express');
const router = express.Router();
const petController = require('../controllers/petController');

router.post('/create', petController.createPet);
// router.delete('/delete/:petId', petController.deletePet);
// router.put('/modify/:petId', petController.modifyPet);
router.post('/check', petController.checkUser); 
router.get('/list', petController.getList);
router.get('/getPetID', petController.getPetID);
router.post('/addTask', petController.createTask);
router.put('/modifyTask', petController.modifyTaskDescription);
router.delete('/deleteTask', petController.deleteTask);
router.put('/modifyTaskStatus', petController.modifyTaskStatus);


module.exports = router;
