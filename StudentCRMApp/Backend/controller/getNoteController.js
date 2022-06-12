/*
  This function get details of one specific note of the given id
  Parameter: note_id
  Body:
  Output: Success status and data body containing all details of the notes
  
*/

// imports
const db = require('../models/Models'); // required models
const sequelize = require('sequelize'); // improrting sequlize
const fs = require('fs'); // package is used for file processing

// fetching all note details
  getNote = async (req, res) =>{
      try{
          // getting note details using id
        var note = await db.Note.findOne({where: { id: req.params.id },
            include: [{ model: db.Type ,attributes:[]}] // include related data from Type table
        });
        var noteData; // initializing variable for note data
        var resultMessage; // variable for result message
        if(note){
            resultMessage ="Note data found."
            var file_path = note.filePath + "/" + note.fileName; // creating file path
            noteData = {
                content : note.content,
                date_occur : note.date_occur,
                fileName : note.fileName,
                filePath : file_path,
                isConfedential : note.isConfedential,
                subject : note.subject
            };
            if (!fs.existsSync(file_path) && note.fileName) { // checking if file exsist on the given location
               // if not creating the file on the place.
                fs.writeFile(file_path, note.file, function (err) {
                    if (err){ // if error occur during creation
                        resultMessage += "File not found in the given location";
                    }
                  }); 
              }
              
              // returning note details on success
              return res.status(200).json({ success: true, data: noteData, message : resultMessage }); 
    
        }
        else{
            // returning not found message
            return res.status(400).json({ success: false, message: "Note data note found" }); 
        }

      }catch(err){
          // returning error message
        return res.status(400).json({ success: false, message: err.message }); 
      }
    


  }

    // exporting getNote module
    module.exports = getNote;