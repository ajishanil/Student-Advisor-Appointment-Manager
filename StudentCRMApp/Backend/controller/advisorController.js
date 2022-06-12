/*

The main contrller file which maps all the advisor controller files

*/ 

// Checking the connection
require('../database/connection');

// importing setAdvisorArchivedByIdController
const setAdvisorArchivedById = require('./setAdvisorArchivedByIdController');

// Exporting all the controller
module.exports = {
    setAdvisorArchivedById,
}