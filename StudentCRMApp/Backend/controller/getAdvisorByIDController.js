/**
 * This function will get all the advisors by auto increment id in database,
 *  
 *
 * Param:
 * id of advisor table, 
 * Output:
 * success: true or false
 * data:
 *       first_name, last_name, birth_date, phone_num
 *      email, password, campus, role
 *
 */

// Import sequelize to connnect to database
 const sequelize = require("sequelize");

// Import the models as db for easily using model
const db = require("../models/Models");

// Get information from Advisor table by id
getStaffInfoById = async (req, res) => {
  
  try{
    const staff = await db.Advisor.findOne({

      // The where option is used to filter the query
         where: { id: req.params.id }, 

         // use models having relation  
         include: [{ model: db.Campus ,attributes:[]},{model:db.Role,attributes:[]}],   
         
         // Consturct return result, if included relation, you can return all tables in `include:[]`;
        attributes:
         [
         
            // `sequelize.col`, refer to columns so that the columns are properly
            // interpreted as columns and not a strings.
            [sequelize.col("Advisor.first_name"), "first_name"],
           [sequelize.col("Advisor.last_name"), "last_name"],
           [sequelize.fn("DATE", sequelize.col("Advisor.date_birth")), "date_birth"],
           [sequelize.col("Advisor.phone_num"), "phone_num"],
           [sequelize.col("Advisor.email"), "email"],
           [sequelize.col("Advisor.license_type"), "license_type"],
           [sequelize.col("Advisor.license_Number"), "license_Number"],
           [sequelize.col("Advisor.password"), "password"],
           [sequelize.col("Role.title"), "role"],
           [sequelize.col("Campus.name"), "campus"],
         ]    , 
     })
      // If cannot find anything record about the id in the request, return status 400 annd student not found
   if (!staff || staff.length == 0) {
       return res.status(400).json({ success: false, error: "Staff not found in the record" });
     }

 // If found the staff, return 200 and data of staff
   return res.status(200).json({ success: true, data: staff });
 } 
 catch(e){ // returning error message on response
    return res.status(400).json({ success: false, message: e.message });
  }
};
  
// export this function as module for import in another files easily
module.exports = getStaffInfoById;