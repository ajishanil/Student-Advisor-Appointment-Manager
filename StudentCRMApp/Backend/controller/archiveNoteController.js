/*
  This function aerchive dthe note by changing is_del parameter
  Parameter: note_id
  Body:
  Output: Success status
  
*/

// imports
const db = require('../models/Models'); // required models
const sequelize = require('sequelize'); // improrting sequlize

// module to archive note
archiveNote = async (req, res) =>{
    try{
        // fetching the note
        var note = await db.Note.findOne({where: { id: req.params.id },
        });

        note.set({
            is_del:1 // setting active flag as false
        });

        // saving the updated value
        await note.save();

        // returning success status
        return res.status(200).json({ success: true, message : "Archived successfully" }); 

    }catch(e){
        // returning error response
        return res.status(200).json({ success: false, message : "Archived failed"+e.message }); 
    }
}

    // exporting archive note module
    module.exports = archiveNote;