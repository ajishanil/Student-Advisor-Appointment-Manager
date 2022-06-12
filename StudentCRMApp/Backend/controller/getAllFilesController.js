/*
  This function get all files of one student added to notes
  Parameter: student_id
  Body:
  Output: Success status and data body containing all files
  
*/

// imports
const db = require('../models/Models'); // required models
const sequelize = require('sequelize'); // improrting sequlize
const { Op } = require("sequelize"); // Operator function of sequlize, used when SQL operator is needed

getAllFiles = async (req, res) => {
    try{
 //get all files which are present in database  
 // filtering through notes table and taking records having file data in it
 let files = await db.Note.findAll({ where: {
    [Op.and]: [
      { student_id: req.params.id }, // checking with student id
      {is_del: 0},
      { fileName: {
        [Op.ne]: null // avoiding records having null value
      } },
      { filePath: {
        [Op.ne]: null // avoiding records having null value
      } },
    ],
  } ,

    attributes: [// `sequelize.col`, refer to columns so that the columns are properly
    // interpreted as columns and not a strings.
    [sequelize.col("Note.fileName"), "fileName"], //name of the file
    [sequelize.col("Note.isConfedential"), "isConfedential"], // file confidentiality
   [sequelize.col("Note.subject"), "subject"],// Subject of the note
   [sequelize.col("Note.filePath"), "filePath"] // path of file
   
]
      
  });
   // return list of files present in database
   return res.status(200).json({ success: true, data: files }); 
}
catch(err){
    return res.status(400).json({ success: false, message: err.message }); 
} // catch the error
   
  
 };
  // exporting getAllFiles module
  module.exports = getAllFiles;