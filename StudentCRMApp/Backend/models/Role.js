/**
 * Schema model for Note table
 */
var Sequelize = require('sequelize'),
passportLocalSequelize = require('passport-local-sequelize');
 
// Setup sequelize db connection
var mydb = require("../database/connection");
 
//Defining model for Role table 
var Role = mydb.define('Role', {//'Role' name of table

    //primary key for table 
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    
    //title field show role of  advisor like admin 
    title: Sequelize.STRING,

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
},
{
    timestamps: false, // doesn't use create_At, update_At from sequelize automatically
    freezeTableName: true // table name doesn't add 's' at the end of name
});
 
//function is defined to attch title to user
passportLocalSequelize.attachToUser(Role, {
    usernameField: 'title',
    hashField: 'title',
    saltField: 'title'
});

module.exports = Role;
 