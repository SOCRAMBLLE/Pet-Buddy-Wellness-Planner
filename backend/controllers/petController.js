const createPetModule = require('./createPet');
const deletePetModule = require('./deletePet');
const modifyPetModule = require('./modifyPet');
const checkUserModule = require('./checkUser');
const getListModule = require('./getList');
const getPetIDModule = require('./getPetID');

exports.createPet = createPetModule.createPet;
exports.deletePet = deletePetModule.deletePet;
exports.modifyPet = modifyPetModule.modifyPet;
exports.checkUser = checkUserModule.checkUser;
exports.getList = getListModule.getList;
exports.getPetID = getPetIDModule.getPetID
