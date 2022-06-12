/*
  This function to return search result of students.
  Parameter: 
        input: searched value
    Output : Result list of students
  
  */

// imports
const db = require("../models/Models"); // models
const sequelize = require("sequelize"); // sequlize
const { Op } = require("sequelize"); // Operator function of sequlize, used when SQL operator is needed

// This function returns search results
getSearchedResult = async (req, res) => {
  var students;
  //Type variable is used to makesure the given input is email, id or name
  var type = "name"; // setting default type as name
  //Checking if the input is null
  if (!req.params.input) {
    return res.status(400).json({
      success: false,
      message: "Invalid Input",
    });
  }
  // Removing trailing space
  var searchInput = req.params.input.trim();

  //checking search input is number then setting type as id
  if (!isNaN(searchInput)) {
    type = "id";
  } else {
    //validating to check if the input is email
    const emailRegexp =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    const valid = emailRegexp.test(searchInput);
    // ifvalid is true then type is email otherwise name
    if (valid) {
      type = "email";
    } else {
      type = "name";
    }
  }

  // all the thing you want to return need to be added into `attributes:[]`
  // If type is email
  if (type == "email") {
    students = await db.Student.findAll({
      where: { email_address: searchInput }, // get all student with the given email

      attributes: [
        // retrun data
        "id", // Primary ket
        "student_id", // SDC number
        [
          sequelize.fn(
            "concat",
            sequelize.col("Student.last_name"),
            " ",
            sequelize.col("Student.first_name")
          ),
          "name",
        ], //Name
        [sequelize.col("Student.email_address"), "email_address"], // Email
      ],
    }).catch((error) => {
      // In case of null response
      return res.status(400).json({
        error,
        message: "Search not found",
      });
    });
  }
  // if the type is id
  else if (type == "id") {
    students = await db.Student.findAll({
      where: { student_id: searchInput }, // find student with given SDC number of student

      attributes: [
        // retrun data
        "id", //Primary Key
        "student_id", //SDC Number
        // Use sequelize.fn to do aggregations
        // Here it is concat the thr last name of student and first name of student
        [
          sequelize.fn(
            "concat",
            sequelize.col("Student.last_name"),
            " ",
            sequelize.col("Student.first_name")
          ),
          "name",
        ], // Name
        // `sequelize.col`, refer to columns so that the columns are properly
        // interpreted as columns and not a strings.
        [sequelize.col("Student.email_address"), "email_address"], // Email
      ],
    }).catch((error) => {
      // In case null response
      return res.status(400).json({
        error,
        message: "Search not found",
      });
    });
  }
  // If type is name
  else if (type == "name") {
    // get if any match is present in the first and last name of the student table
    students = await db.Student.findAll({
      where: {
        [Op.or]: [
          { first_name: { [Op.like]: "%" + searchInput + "%" } }, // checking for matches in first name
          { last_name: { [Op.like]: "%" + searchInput + "%" } }, // Checking for matches in last name
        ],
      },
      attributes: [
        // retrun data
        "id", // Primary key
        "student_id", // SDC number
        [
          sequelize.fn(
            "concat",
            sequelize.col("Student.last_name"),
            " ",
            sequelize.col("Student.first_name")
          ),
          "name",
        ], // Name
        [sequelize.col("Student.email_address"), "email_address"], // email
      ],
    }).catch((error) => {
      // in case of null response
      return res.status(400).json({
        error,
        message: "Search not found",
      });
    });
  }
  if (students.length == 0) {
    return res.status(400).json({
      success: false,
      message: "No record fround with " + searchInput,
    });
  }
  // returning searched data on completion
  return res.status(200).json({ success: true, data: students });
};

// exporting getSearchedResult
module.exports = getSearchedResult;
