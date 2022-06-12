/**
 * This function will get all archived sutdent, here we see archived as deleted
 * Param: null
 * Output:
 * id of student table, student_id which imported, last_name + frist_name, email_address
 *
 */

// import Models as db
const db = require("../models/Models");
// import sequelize to connnect to database
const sequelize = require("sequelize");

// Get all student which are archived
getStudentWhichArchived = async (req, res) => {
  try{
    const student = await db.Student.findAll({
      where: { is_del: "1" }, // get all student which are achivied, here we regard achivied as deleted
  
      // all the thing you want to return need to be added into `attributes:[]`
      // you can also rename the column you want to return as [old_column_name, new_column_name]
      attributes: [
        // `sequelize.col`, refer to columns so that the columns are properly
        // interpreted as columns and not a strings.
        [sequelize.col("Student.id"), "id"],
        [sequelize.col("Student.student_id"), "student_id"],
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
        ],
        [sequelize.col("Student.email_address"), "email_address"],
      ],
    });

    // get all the archived students, if there no archived student, data will be empty.
  return res.status(200).json({ success: true, data: student });
  }catch(e){
    return res.status(400).json({ success: false, message: e.message });
  }
  

  
};

// export this function as module for import in another files easily
module.exports = getStudentWhichArchived;
