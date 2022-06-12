/**
 * This function is the initial the admin account 
 *
 */

// import Advisor model for registering
const Advisor = require("../models/Advisor");
const bcrypt = require("bcryptjs");
const HASH_SALT = 10; // A cryptographic salt is made up of random bits added to each password instance before its hashing.
const ADMIN_EMAIL = "admin@sample.ca"; // Admin email
const ADMIN_PASSWORD = "admin123"; // Admin password

/**
 * CreateAdminByServer: create admin account 
 *
 */
 async function createAdminByServer() {
  try {
    let adivsorExits = await Advisor.findOne({
      where: { email: ADMIN_EMAIL, is_del: "0" },
    });
    // if not have admin in the db, then create one
    if (!adivsorExits) {
      
      const hash = await bcrypt.hash(ADMIN_PASSWORD, HASH_SALT);

      await Advisor.create({
        first_name: "admin",
        last_name: "",
        phone_num: "6666666666",
        date_birth: "1980-01-01",
        license_type: "L1",
        license_number: "123",
        email: ADMIN_EMAIL,
        password: hash,
        is_del: 0,
        create_time: Date.now(),
        campus_id: 1,
        role_id: 1,
      });

      adivsorExits = await Advisor.findOne({ where: { email: ADMIN_EMAIL, is_del: "0" }});
      

    }

  } catch (err) {
      console.log("Can't create admin " + err);
  }
};

// exporting createAdminByServer module
module.exports = {
  createAdminByServer
};
