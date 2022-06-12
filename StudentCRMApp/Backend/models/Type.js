/**
 * Schema model for Type table
 */
const Sequelize=require('sequelize');

module.exports=sequelize.define("Type",  // name of database showing what category  of notes being stored
{
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
    
      //type_title is used to show the type of document to be stored such as appointment notes,student notes
      type_title: Sequelize.STRING,
    
    
    // //is_del to archieve type of notes  if its 1 its archieved if 0 then not
      is_del: Sequelize.INTEGER,
    
      //create_time is used to show the time of creating type record
      create_time: Sequelize.DATE,
    
      //update_time is used to show the time when any changes are done in the type record
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