/*
  This function updates the student basic information and student program list
  Parameter: id (INTEGER) => Primary key of student record(STUDENT TABLE)
  Output: Success status and success message
  
*/

// importing requirments
const db = require("../models/Models"); // importing required models
const sequelize = require("sequelize"); // refering to sequlize package

// This function updates student details
updateStudentById = async (req, res) => {
  // Checking if the given parameter us empty or null
  if (!req.params.id) {
    //return error status
    return res.status(400).send({
      success: false,
      message: "Params ID is required",
    });
  }

  try {
    // getting campus details
    campus = await db.Campus.findOne({
      where: { name: req.body.program.campus }, // get all student with the given email

      attributes: [
        // retrun data
        "id", // Primary key
        "name", // campus name
      ],
    });
    // Updating the student details
    await db.Student.update(req.body, {
      where: { id: req.params.id }, // checking the given parameter with student primary key
    });

    try {
      // Updating student program table if any changes is there

      req.body.program.campus_id = campus.id;
      await db.Student_program.update(req.body.program, {
        where: { student_id: req.params.id }, // checking the given parameter with student_progaram tabel foreign key
      });
    } catch (e) {
      // Sending error response
      return res.status(500).send({
        success: false,
        message:
          e.message ||
          "Some error occurred while updating the student program.",
      });
    }

    // Returning Success response when updation occurs
    res.status(200).send({
      message: "Updated Succesfully",
      success: true,
    });
  } catch (e) {
    // returing erroe response on failure
    res
      .status(500)
      .send(e.message || "Some error occurred while updating the Student.");
  }
};

// exporting this function as a module
module.exports = updateStudentById;
