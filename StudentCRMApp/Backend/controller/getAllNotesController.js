/*
  This function get all notes related to the given student
  Parameter: student_id
  Body:
  Output: Success status and data body containing list of notes whicha have: noteId,category,date_occur
  
*/

// imports
const db = require('../models/Models'); // required models
const sequelize = require('sequelize'); // improrting sequlize

// get all notes
getAllNotes = async (req, res) => {

  try{
    let note = await db.Note.findAll({ where: { student_id: req.params.id, is_del: "0" } ,
    

      // all the thing you want to return need to be added into `attributes:[]`
      // you can also rename the column you want to return as [old_column_name, new_column_name]
      include: [{ model: db.Type ,attributes:[]},{ model: db.Advisor ,attributes:[]}],
        attributes: [// `sequelize.col`, refer to columns so that the columns are properly
        // interpreted as columns and not a strings.
        [sequelize.col("Note.id"), "id"], // id of the note
       [sequelize.fn("DATE",sequelize.col("Note.date_occur")),"date_occur"],// date of occurence of the event
       [sequelize.col("Type.type_title"), "category"], // Title of the type event on which note is made
       [sequelize.col("Note.subject"), "subject"], // subject of note,
       [sequelize.col("Note.content"), "content"], // content of the note
       [sequelize.col("Note.fileName"), "fileName"], // name of the attachement file
       [sequelize.col("Note.isConfedential"), "isConfedential"], // is the file is confedential
       [sequelize.col("Note.filePath"), "filePath"],
       [
        sequelize.fn(
          "concat",
          sequelize.col("Advisor.last_name"),
          " ",
          sequelize.col("Advisor.first_name")
        ),
        "name",
      ]
   ]
          
      });
         
   // return list of notes present in database
   return res.status(200).json({ success: true, data: note }); 
  }
  catch(e){
    // give error response
    return res.status(400).json({ success: false, message: e.error });
  }


   

 };
  // exporting getAllNotes module
  module.exports = getAllNotes;