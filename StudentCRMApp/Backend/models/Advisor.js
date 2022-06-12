/**
 * Schema model for Advisor table
 */

// Import sequelize for define the model
var Sequelize = require('sequelize'),


// Passport-Local Sequelize is a Sequelize plugin that simplifies 
// building username and password login with Passport
passportLocalSequelize = require('passport-local-sequelize');
 
// Setup sequelize db connection
var mydb = require("../database/connection");


//defining model for Advisor table 
var Advisor = mydb.define("Advisor", {//"Advisor" is name of table

  //id is primary key in the table
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    
    //first_name is name of the advisor
    first_name: {
      type:Sequelize.STRING,
      allowNull:true
    },

    //last_name is last_name of advisor
    last_name:{
      type:Sequelize.STRING,
      allowNull:true
    } ,
    // The email cannot be null, and must be a proper email before creation
    //This email is used as advisor_id in Auth table
    email: {
      type: Sequelize.STRING,
      // allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },

    //phone_num is contact number of the advisor 
    phone_num:{
      type:Sequelize.STRING,
      allowNull:true
    }, 

    //date_birth is date of birth of advisor 
    date_birth: {
      type:Sequelize.DATE,
      allowNull:true
    },

    // license_type is the type of advisor: RISIA, RCIC
    license_type:{
      type:Sequelize.STRING,
      allowNull:true
    },

    // license_type is the license number of advisor
    license_number:{
      type:Sequelize.STRING,
      allowNull:true
    },

    // The password cannot be null
    password: {
      type: Sequelize.STRING,
      // allowNull: false
    },

    //is_del to archieve student record if its 1 its archieved if 0 then not
    is_del:{
      type:Sequelize.INTEGER,
      allowNull:true
    } ,

     //create_time is used to show the time of creating record 
    create_time:{
      type:Sequelize.DATE,
      allowNull:true
    },

    //update_time is used to show the time when any changes are done in the record
    update_time:{
      type:Sequelize.DATE,
      allowNull:true
    } ,

    
  //create_by is used to show the ID of advisor who created the record
    create_by: {
      type:Sequelize.INTEGER,
      allowNull:true
    },

     //update_by is used to show the ID of advisor who update the record
    update_by:{
      type:Sequelize.INTEGER,
      allowNull:true
    },
    role_id:{
      type:Sequelize.STRING,
      
    },

      //campus_id is used to grab information about campus location from Campus table
    campus_id: {
      type:Sequelize.INTEGER,
      allowNull:true
    }
  },
  {
    timestamps: false, // doesn't use create_At, update_At from sequelize automatically
    freezeTableName: true // table name doesn't add 's' at the end of name
});


//method to rehash the password 
passportLocalSequelize.attachToUser(Advisor, {
  usernameField: 'email',
  hashField: 'title',
  saltField: 'title'
});

module.exports = Advisor;
