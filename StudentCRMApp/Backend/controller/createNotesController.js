/*
  This function add notes by advisor for student
  Parameter: 
  Body: data passed similar to notes in models.
  Output: Success status and notes record id
  
*/

// imports
const db = require("../models/Models"); // required models
const sequelize = require("sequelize"); // improrting sequlize
const fs = require("fs"); // package is used for file processing

createNotes = async (req, res, next) => {
  // Validate request body
  if (!req.body || req.body.length == 0 || !req.body.content) {
    // checking notes is empty or note.
    // in case of empty body
    return res.status(400).send({
      message: "Notes cannot be empty",
    });
  }

  try {
    // variables to store details about uploaded file
    var filedata, fileLocation, fileName, storedPath;

    if (req.file) {
      // if file is uploded
      fileLocation = req.file.path; // getting file location
      fileName = req.file.originalname; // getting file name with extension
      storedPath = "./attachments/" + req.body.student_id; // set path to store file locally
      filedata = fs.readFileSync(req.file.path, "utf8"); // reading file data

    }
    // taaking type of notes object
    var type = await db.Type.findOne({ where: { type_title: req.body.type } });
    

    // creating notes object
    const notes = {
      content: req.body.content, // notes added by the advisor,
      subject: req.body.subject,
      date_occur: new Date(req.body.date_occur), // date of occurence of the event(if it was an appoinment) or the date at which note is created
      file: filedata, // data read from the uploded file
      fileName: fileName, // name of the uploaded file
      filePath: fileLocation, // location at which path is stored
      isConfedential: parseInt(req.body.isConfedential), // if the uploaded file has confidential data
      is_del: 0, // is the record active
      create_time: Date.now(), // date at which this record is created
      create_by: parseInt(req.body.advisor_id), // id of the person created this record
      student_id: parseInt(req.body.student_id), // id of the student for whom notes is made
      advisor_id: parseInt(req.body.advisor_id), // id of the staff who made the notes
      type_id: type.id, // id of category of notes[Email, Appoinment, Others]
    };

    let note_data = await db.Note.build(notes); // Building the object with Note Model
    await note_data.save(); // Save new Note record in the database

    // Sending success response
    return res.status(200).send({
      status: true,
      message: "Added successfully",
      noteId: note_data.id,
    });
  } catch (e) {
    // return error status

    return res
      .status(500)
      .send(e.message || "Some error occurred while adding notes.");
  }
};

// exporting createNotes module
module.exports = createNotes;
