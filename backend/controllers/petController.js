const createPetModule = require('./createPet');
const deletePetModule = require('./deletePet');
const modifyPetModule = require('./modifyPet');

exports.createPet = createPetModule.createPet;
exports.deletePet = deletePetModule.deletePet;
exports.modifyPet = modifyPetModule.modifyPet;
