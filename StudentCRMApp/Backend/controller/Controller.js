/*
The main contrller file ehich maps all the controller files

*/ 
// Checking the connection
require('../database/connection');

// importing getStudentInfoByIdController
const getStudentInfoById = require('./getStudentInfoByIdController');

// importing setStudentArchivedByIdController
const setStudentArchivedById = require('./setStudentArchivedByIdController');

// importing getArchivedStudentController
const getStudentWhichArchived = require('./getArchivedStudentController');

// importing getSearchedResultController
const getSearchedResult = require('./getSearchedResultController');

// importing studentBatchAddUpdateController
const processUploadFile = require('./studentBatchAddUpdateController');

// importing createStudentController
const createStudent = require('./createStudentController');

// importing updateStudentController
const updateStudentById = require('./updateStudentController');

// importing getAdvisorByIDController
const getStaffInfoById=require('./getAdvisorByIDController');

//importing getListOfAdvisorsController
const getListAdvisors=require('./getListOfAdvisorsController');

//importing createNotesController
const createNotes = require('./createNotesController');

//importing updateAdvisorInfoByIDCOntroller
const updateAdvisorByID=require('./updateAdvisorInfoByIDController');

//importing getAllNotesController
const getAllNotes = require('./getAllNotesController');

//importing getNoteController
const getNote = require('./getNoteController');

//importing getAllFilesController
const getAllFiles = require('./getAllFilesController');

// importing downloadFileController
const download = require('./downloadFileController');



//importing getAllFilesController
const archiveNote = require('./archiveNoteController');

//importing getRecentConversedStudentListController
const getRecentConversedStudentList = require('./getRecentConversedStudentListController');


// Exporting all the controller
module.exports = {
    getStudentInfoById,
    setStudentArchivedById,
    getStudentWhichArchived,
    getSearchedResult,
    processUploadFile,
    createStudent,
    updateStudentById,
    getStaffInfoById,
    getListAdvisors,
    createNotes,
    updateAdvisorByID,
    getAllNotes,
    getNote,
    getAllFiles,
    archiveNote,
    getRecentConversedStudentList,
    download

}