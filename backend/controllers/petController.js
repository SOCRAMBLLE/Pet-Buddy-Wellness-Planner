const createPetModule = require('./createPet');
const deletePetModule = require('./deletePet');
const modifyPetModule = require('./modifyPet');
const checkUserModule = require('./checkUser');

exports.createPet = createPetModule.createPet;
exports.deletePet = deletePetModule.deletePet;
exports.modifyPet = modifyPetModule.modifyPet;
exports.checkUser = checkUserModule.checkUser;
