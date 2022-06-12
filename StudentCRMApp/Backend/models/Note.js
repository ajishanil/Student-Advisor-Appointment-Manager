/**
 * Schema model for Note table
 */
const Sequelize=require('sequelize');

module.exports=sequelize.define("Note",  //name of model 
{
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
    
      //content is used to store content of notes 
     content: Sequelize.STRING,

     //subject of note created
     subject: Sequelize.STRING,
    
     // specify date  when notes were taken
     date_occur:Sequelize.DATE,

     //used to store files that our uploaded with notes
     file:Sequelize.BLOB('medium'),

     // used to store name of the file
     fileName:Sequelize.STRING,

     // used to store path of the uploaded file
     filePath:Sequelize.STRING,

     // used to store whether the files are confidential
     isConfedential:Sequelize.BOOLEAN,

    // //is_del to archieve note record if its 1 its archieved if 0 then not
      is_del: Sequelize.INTEGER,
    
      //create_time is used to show the time of creating record 
      create_time: Sequelize.DATE,
    
      //update_time is used to show the time when any changes are done in the record
      update_time: Sequelize.DATE,
    
      //create_by is used to show the ID of advisor who created the record
      create_by: Sequelize.INTEGER,
    
       //update_by is used to show the ID of advisor who update the record
      update_by: Sequelize.INTEGER,

      //student_id is id of student table used to keep track about which student notes are added
       student_id:Sequelize.INTEGER ,

       //id in advisor table is id of advisor table used to keep track about which student notes are added
       advisor_id:  Sequelize.INTEGER,

       //type_id is id of type table to include type of notes
        type_id:Sequelize.INTEGER ,
      
    },  // optional 
    {
      timestamps: false, // doesn't use create_At, update_At from sequelize automatically
      freezeTableName: true // table name doesn't add 's' at the end of name
});