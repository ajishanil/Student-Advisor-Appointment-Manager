/**
 * This function is to update advisor
 * Param: advisor id
 *
 * Ouput:
 * success: false or true
 * error: reason, if false
 * message: success message or error message
 * role_id : returns current role id
*/

const db = require("../models/Models"); // importing required models
const sequelize = require("sequelize"); // refering to sequlize package

// update staff function
updateStaffById = async (req, res) => {
  if (!req.params.id) { // if input params is empty
    return res.status(400).send({
      message: "Params ID is required",
    });
  }
  try {
    // getting campuus details
    campus = await db.Campus.findOne({
      where: { name: req.body.campus }, // get campus_id on the basis of given name

      attributes: [
        // retrun data
        "id", // Primary key
        "name", // campus name
      ],
    });
    role = await db.Role.findOne({
      //get role_id on the basis of given role title
      where: { title: req.body.role },

      attributes: [
        // retrun data
        "id", // Primary key
        "title", // campus name
      ],
    });

    // getting campus id
    let campus_id;
    if (req.body.campus == "Saskatoon") campus_id = "1";
    else if (req.body.campus == "Regina") campus_id = "2";
    else if (req.body.campus == "Moose Jaw") campus_id = "3";
    else campus_id = "4";

    // getting role id
    let role_id;
    if (req.body.role == "admin") role_id = "1";
    else {
      if (req.body.license_type == "RISIA") role_id = "2";
      else if (req.body.license_type == "RCIC") role_id = "3";
    }

    // advisor fields updating if change happens
    const advisor = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      phone_num: req.body.phone_num,
      date_birth: req.body.date_birth,
      license_type: req.body.license_type,
      license_number: req.body.license_number,
      password: req.body.password,
      campus_id: campus_id,
      role_id: role_id,
    };

    const updatedAdvisor = await db.Advisor.update(advisor, {
      where: { id: req.params.id },
    });

    // Returning Success response when updation occurs
    res.status(200).send({
      message: "Updated Succesfully",
      success: true,
      data:role_id
    });
  } catch (e) {
    // returing erroe response on failure
    res
      .status(500)
      .send(e.message || "Some error occurred while updating the Student.");
  }
};

// exporting updateStaffById
module.exports = updateStaffById;
