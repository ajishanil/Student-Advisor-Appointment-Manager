/**
 * Schema model for STudent table
 */
const Sequelize = require('sequelize');

//Defining the student model for Student table 
module.exports = sequelize.define("Student", {//"Student" is name of table

  id: {                           //primary key for student table 
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  //SDC number for students
  student_id: Sequelize.INTEGER,   

  //first_name field for the student
  first_name: Sequelize.STRING,

  //last_name field for the student 
  last_name: Sequelize.STRING,

  //date_birth field is used  for student's date of birth 
  date_birth: Sequelize.DATE,        // Data type for fields

  //gender field for specify female ,male
  gender: Sequelize.STRING,

  //home_country is used for country student belongs
  home_country: Sequelize.STRING,

  //email_address is student's unique mail address given by College
  email_address: Sequelize.STRING,

  //is_del to archieve student record if its 1 its archieved if 0 then not
  is_del: Sequelize.INTEGER,         

  //create_time is used to show the time of creating record 
  create_time: Sequelize.DATE,

  //update_time is used to show the time when any changes are done in the record
  update_time: Sequelize.DATE,

  //create_by is used to show the ID of advisor who created the record
  create_by: Sequelize.INTEGER,

   //update_by is used to show the ID of advisor who update the record
  update_by: Sequelize.INTEGER,
},
  // optional
{
  timestamps: false, // doesn't use create_At, update_At from sequelize automatically
  freezeTableName: true // table name doesn't add 's' at the end of name
});