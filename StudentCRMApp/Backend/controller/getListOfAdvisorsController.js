/**
 * This function is to get list of advisor
 * Param:
 *
 * Ouput:
 * success: false or true
 * error: reason, if false
 * data: list in request, if true
*/



//import models here
const db = require("../models/Models");
// Import sequelize to connnect to database
const sequelize = require("sequelize");

// List of Advisors in database
getListOfAdviors = async (req, res) => {
  try{
  //get all advisors which are present in database
  let staff = await db.Advisor.findAll({
    where: { is_del: 0 },
    include: [{ model: db.Campus, attributes: [] }],

    // all the thing you want to return need to be added into `attributes:[]`
    // you can also rename the column you want to return as [old_column_name, new_column_name]

    attributes: [
      // `sequelize.col`, refer to columns so that the columns are properly
      // interpreted as columns and not a strings.
      [sequelize.col("Advisor.id"), "id"],

      // Use sequelize.fn to do aggregations
      // Here it is concat the thr last name of advisor and first name of advisor
      [
        sequelize.fn(
          "concat",
          sequelize.col("Advisor.last_name"),
          " ",
          sequelize.col("Advisor.first_name")
        ),
        "name",
      ],
      [sequelize.col("Advisor.email"), "email"],
      [sequelize.col("Campus.name"), "campus"],
    ],
  });

  // return list of advisors present in database
  return res.status(200).json({ success: true, data: staff });
}catch(e){
  // returning error message
  return res.status(400).json({ success: true, message: e.message });
}
};

// exporting getListOfAdviors
module.exports = getListOfAdviors;
