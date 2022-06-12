/**
 * This function will get all the sutdent by auto increment id in database,
 *  not the imported student, because some student_id will empty.
 *
 * Param:
 * id of student table, not the student_id, it's an another field
 * Output:
 * success: true of false
 * data:
 *      name, student_id, first_name, last_name, birth_date, gender, home_country
 *      email_address, campus, program, degree, year, status
 *
 */

// Import the models as db for easily using models
const db = require("../models/Models");
// Import sequelize to connnect to database
const sequelize = require("sequelize");

// Define errHandler for output log about error
const errHandler = (err) => {
  console.error("Error: ", err);
};

// Get information from student_program table by student id
// (not real student in system db, because the student id could be null)
getStudentInfoById = async (req, res) => {
  // Read the whole Student_program table from the database
  const student_program = await db.Student_program.findAll({
    // The where option is used to filter the query
    where: { student_id: req.params.id }, // autocrement id

    include: [
      // use relation to
      // as: short name of db.Campus
      { model: db.Campus, as: "Campus", attributes: [] }, // attributes: [] means doesn't  return anything under Campus, Ref: https://bit.ly/3GnOclb
      { model: db.Student, as: "Student", attributes: [] }, // empty attributes means no field will return from student table
    ],

    // Consturct return result, if included relation, you can return all tables in `include:[]`;
    attributes: [
      // Use sequelize.fn to do aggregations
      // Here it is concat the thr last name of student and first name of student
      [
        sequelize.fn(
          "concat",
          sequelize.col("Student.last_name"),
          ",",
          sequelize.col("Student.first_name")
        ),
        "name",
      ],
      // `sequelize.col`, refer to columns so that the columns are properly
      // interpreted as columns and not a strings.
      [sequelize.col("Student.student_id"), "student_id"], // return real student id from system if have, if not, return null
      [sequelize.col("Student.first_name"), "first_name"],
      [sequelize.col("Student.last_name"), "last_name"],
      [sequelize.fn("DATE", sequelize.col("Student.date_birth")), "date_birth"],
      [sequelize.col("Student.gender"), "gender"],
      [sequelize.col("Student.home_country"), "home_country"],
      [sequelize.col("Student.email_address"), "email_address"],
      [sequelize.col("Campus.name"), "campus"],
      [sequelize.col("Student.is_del"), "is_del"],
      "program",
      "degree",
      "year",
      "status",
    ], // Filter field in student_program table  Ref: https://bit.ly/3lzAHoM
  }).catch(errHandler);

  // If cannot find anything record about the id in the request, return status 400 annd student not found
  if (student_program.length == 0) {
    return res.status(400).json({ success: false, error: "Student not found" });
  }

  // If found the student, return 200 and data of student
  return res.status(200).json({ success: true, data: student_program });
};

// export this function as module for import in another files easily
module.exports = getStudentInfoById;
