/**
 * This file stores the connection details with the database
 *
 */
const Sequelize = require("sequelize");

// pass database name,username and password as parameter
const sequelize = new Sequelize("studentInfo_manageDB", "admin", "admin@123", {
  host: "127.0.0.1", // host url
  dialect: "mysql", // specifying which database is used. Here its mysql
  logging: false,
});

// exporting sequlize
module.exports = sequelize;
global.sequelize = sequelize;
