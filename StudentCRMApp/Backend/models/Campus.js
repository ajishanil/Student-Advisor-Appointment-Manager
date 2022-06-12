/**
 * Schema model for Campus table
 */
const Sequelize = require('sequelize');

//It defines model for Campus table to get campus information 
module.exports = sequelize.define("Campus", { //name of "Campus"

  //primary Id for table
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  //campus_location is used to show the exact location of campus
  campus_location: Sequelize.STRING,

  //Name of School Regina,Saskatoon,Prince Edward,Moose Jaw
  name: Sequelize.STRING,

// //is_del to archieve student record if its 1 its archieved if 0 then not
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