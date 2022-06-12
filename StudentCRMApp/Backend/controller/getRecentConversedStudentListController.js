/*
  This function return list of ten student with whom the advisor added notes recently
  Parameter: advisor_id
  Body: 
  Output: Success status and list of student name
  
*/


// imports
const db = require('../models/Models'); // required models
const sequelize = require('sequelize'); // improrting sequlize

// module to get 10 student who with 
getRecentConversedStudentList= async (req, res) => {
    try{
        
        // gettinga all note object with student data
        const recentList =  await db.Note.findAll({
        where: {
            advisor_id: req.params.id
        }, 
        limit: 10, //limiting to 10 records
        include: [{ model: db.Student ,where: {
            is_del: 0
        },attributes:[]}],
        // Add order conditions here....
        order: [
            ['create_time', 'DESC'] // taking descending order
        ],
        attributes: [

            [sequelize.col("Student.email_address"), "email_address"],
            [
                sequelize.fn(
                  "concat",
                  sequelize.col("Student.last_name"),
                  " ",
                  sequelize.col("Student.first_name")
                ),
                "name",
              ],
              [sequelize.col("Student.student_id"), "student_id"],
              [sequelize.col("Student.id"), "id"]
        ],
        group: "student_id" // grouping by student_id
    });

    if(recentList.length == 0){
        // if there is no recent list
        return res.status(200).json({ success: true, data: recentList, message:"No recent conversations" });
    }
    
    // returning success result
    return res.status(200).json({ success: true, data: recentList });
}catch(e){
    // returning error message
    return res.status(400).json({ success: false, message: e.message });
}
   

    
}

  // exporting getRecentConversedStudentList module
  module.exports = getRecentConversedStudentList;