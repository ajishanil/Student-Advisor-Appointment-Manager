/*
    This file has all routes for all api
*/

// Imports
const express = new require("express");
const fs = require("fs");
const router = express.Router();
const StudentCtrl = require("../controller/Controller"); // Importing controllers
const AuthCtrl = require("../controller/authController"); // Importing authcontroller for login and register
const AdvisorCtrl = require("../controller/advisorController"); // Importing authcontroller for login and register
const multer = require("multer"); // Package used for uploading file
const upload = multer({ dest: "uploads/" }); // setting destination to store the uploaded file

let storage = multer.diskStorage({
  destination: (req, file, cb) => {

    if (!fs.existsSync("./attachments/" + req.body.student_id + "/")) {
      fs.mkdirSync("./attachments/" + req.body.student_id + "/"); // create folder in the given path
    }

    cb(null, "./attachments/" + req.body.student_id + "/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname.replace(/ /g, ""));
  },
});

const uploadAttachement = multer({
  storage: storage,
});

//GET
// Getting Student using id
router.get("/student/:id", StudentCtrl.getStudentInfoById);

//PUT
// Archiving student data
router.put("/student/archive/set/:id", StudentCtrl.setStudentArchivedById);

//GET
// Getting archived student list
router.get("/student/archive/get", StudentCtrl.getStudentWhichArchived);

// GET
// Getting searched result
router.get("/student/search/:input", StudentCtrl.getSearchedResult);

//POST
// Adding or Updating multiple student using uploaded file.
// Upload.single() is used so only one file will be uploaded
router.post(
  "/student/upload",
  upload.single("datafile"),
  StudentCtrl.processUploadFile
);

//POST
// Creating students
router.post("/student/create", StudentCtrl.createStudent);

//PUT
//Updating student data
router.put("/student/update/:id", StudentCtrl.updateStudentById);

//POST
// Registering advisor
router.post("/staff/register", AuthCtrl.registerAccount);

//POST
//Login api.
router.post("/login", AuthCtrl.loginAccount);

//GET
//Getting one advisor based on id
router.get("/advisor/:id", StudentCtrl.getStaffInfoById);

//POST
//Logout api.
router.post("/logout", AuthCtrl.logoutAccount);

// POST
// reset password
router.post("/resetPassword", AuthCtrl.resetAccountPassword);

// POST
//Getting
router.post("/advisor/archive/set/:id", AdvisorCtrl.setAdvisorArchivedById);

//GET
//Getting one advisor based on id
// router.get('/advisor/:id',StudentCtrl.getStaffInfoById);

//GET
//Getting List of advisors
router.get("/advisors", StudentCtrl.getListAdvisors);

//POST
// Creating Notes
router.post(
  "/student/notes",
  uploadAttachement.single("attachmentFile"),
  StudentCtrl.createNotes
);

//Put
//changing information of advisors based on ID
router.put("/advisor/:id", StudentCtrl.updateAdvisorByID);

//Get
//Getting all note list
router.get("/student/notes/:id", StudentCtrl.getAllNotes);

//Get
//Getting note details
router.get("/student/notes/detail/:id", StudentCtrl.getNote);

//Get
//Getting all files
router.get("/student/files/:id", StudentCtrl.getAllFiles);

//Post
//Getting all files
router.post("/student/file/download", StudentCtrl.download);



//Put
// Archiving note
router.put("/student/notes/archive/:id", StudentCtrl.archiveNote);

//Get
// Getting list of student who had recent conversation with advisor
router.get("/student/recent/:id", StudentCtrl.getRecentConversedStudentList);

// Exporting routes
module.exports = router;
