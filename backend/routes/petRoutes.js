const express = require('express');
const router = express.Router();
const petController = require('../controllers/petController');

router.post('/create', petController.createPet);
// router.delete('/delete/:petId', petController.deletePet);
// router.put('/modify/:petId', petController.modifyPet);
router.post('/check', petController.checkUser); 

module.exports = router;
