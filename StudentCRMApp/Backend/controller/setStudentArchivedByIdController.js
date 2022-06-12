/**
 * This function is to archive a student in the database
 * Param:
 * id, not student_id in student table
 * Ouput:
 * success: false or true
 * error: reason, if false
 * data: id in request, if true
*/


// Import the models as db for easily using models
const db = require('../models/Models');

// Define errHandler for output log about error
const errHandler = (err) =>{
    console.error("Error: ", err);
}

// Set student archived(deleted)
setStudentArchivedById = async(req, res) =>{
try{
// Update student table
await db.Student.update(
    {is_del: '1'}, // is_del == 1 means archived
    {where : {id: req.params.id}}, // Auto inncrement index in student table 
);

// Return result
const student = await db.Student.findAll({
    where : {id: req.params.id},  // Auto inncrement index in student table 
    // Construct return data
    attributes: [
        ['id', 'id'], // Auto inncrement index in student table 
        ['is_del',  'arichived'] // Rename the result
    ], 
});

// If cannot find student, that means archiving the student not working
if(student.length == 0){
    return res
    .status(400)
    .json({success: false, error: 'id of student not found'});
}

// If finnd the student, return status with 200 and success: true, and {id, archived status}
return res
.status(200)
.json({success: true, data: student});
}
catch(e){
    // retrun error message
    return res
.status(400)
.json({success: false, message: e.message});
}
    

}

// Export this function as module for import in another files easily
module.exports = setStudentArchivedById;