/**
 * Schema model for Student program table
 */
const Sequelize = require('sequelize');
 
//defining the  Sequelize model for Student_program table  having table name and fields for the table
module.exports = sequelize.define("Student_program", { // "Student_program": table name and Capital frist letter

    //Its a primary key for Student_program table 
  id: {                     
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  //status shows current eductional status of students whether there are enrolled,withdraw ,graduated
  status: Sequelize.STRING,  

  //program shows the name program student enrolled in 
  program: Sequelize.STRING,   // datatype for fields is defined STRING
  
  //Its going to show type of program
  degree: Sequelize.STRING,

  //year field shows the year of enrollment
  year: Sequelize.STRING,

  

  //student_id is Student table's primary key(id) used as foreign key in this table 
  student_id: Sequelize.INTEGER, // not real student_id, just the auto increment index in the student_program table

  //campus_id is used to grab information about campus location from Campus table
  campus_id: Sequelize.INTEGER,

// is_del field is used to show whether student record is archieved or not  
  is_del: Sequelize.INTEGER,

  //create_time is used to show the time of creating record 
  create_time: Sequelize.DATE,

  //update_time is used to show the time when any changes are done in the record
  update_time: Sequelize.DATE,

  //create_by is used to show the ID of advisor who created the record
  create_by: Sequelize.INTEGER,

  //update_by is used to show the ID of advisor who update the record
  update_by: Sequelize.INTEGER,
},  // optional
{
  timestamps: false, // doesn't use create_At, update_At from sequelize automatically
  freezeTableName: true // table name doesn't add 's' at the end of name
});