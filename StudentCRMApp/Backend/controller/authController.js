/**
 * This function is the controller of authentication for this system. which includes register and
 * login functions.
 *
 * (2) loginAccount
 * Param: advisor email and advisor password
 * Output: success: true or false
 */

// import Advisor model for registering
const Advisor = require("../models/Advisor");
const bcrypt = require("bcryptjs");
const e = require("express");
const HASH_SALT = 10; // A cryptographic salt is made up of random bits added to each password instance before its hashing.

/**
 * RegisterAccount, get request parameters from body, if the path without parameters
 *
 * param advisor info and password
 * output: success: true or false, if not success, there will give a error reason for failure.
 */
registerAccount = async (req, res) => {
  try {

    // finding if advisor exsist on not
    let adivsorExits = await Advisor.findOne({
      where: { email: req.body.email, is_del: "0" },
    });

    // if exsist returning false
    if (adivsorExits) {
      return res.status(400).json({
        success: false,
        error: "Email eixsting",
        data: req.body.email,
      });
    }

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
      else if (req.body.license_type == "Other") role_id = "4";
    }

    // hasing the password
    const hash = await bcrypt.hash(req.body.password, HASH_SALT);

    // creating advisor object
    await Advisor.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      phone_num: req.body.phone_num,
      date_birth: req.body.date_birth,
      license_type: req.body.license_type,
      license_number: req.body.license_number,
      email: req.body.email,
      password: hash,
      is_del: 0,
      create_time: Date.now(),
      create_by: req.body.create_by,
      campus_id: campus_id,
      role_id: role_id,
    });

    //after creation obtaining advisor id
    adivsorExits = await Advisor.findOne({
      where: { email: req.body.email, is_del: "0" },
      attributes: [
        [sequelize.col("Advisor.id"), "id"], // Auto inncrement index in advisor table
        [sequelize.col("Advisor.email"), "email"], // Auto inncrement index in advisor table
      ],
    });

    // if no error, return status 200, and success true for registering successfully.
    return res.status(200).json({
      success: true,
      message: "register successfully",
      data: adivsorExits,
    });
  } catch (err) {
    // returning error message
    return res.status(400).json({ success: false, error: String(err) });
  }
};

/**
 * Login function for authController
 *
 * Param:
 * username amd password
 *
 * Output:
 * {success: false, message: "Incorrect username or Incorrect password"}
 * {success: true, message: "login successfully", data[{id: , first_name: , last_name: }]}
 *
 */
loginAccount = function (req, res, next) {
  // using the passport defined in server.js. Note:passport is global variable

  // "local" will use the configuration in config/passport.js
  passport.authenticate("local", function (err, user, info) {
    // if can not login, the user will null and return status 400 and reason for the failure
    if (!user) {
      return res.status(400).json({
        success: false,
        message: info.message,
        data: [
          {
            message: req.body.username,
          },
        ],
      });
    }

    req.session.userId = user.email;
    // Explicitly save the session before returning json!
    req.session.save(() => {
      // if can login, return status 500 and message: login successfully
      return res.status(200).json({
        success: true,
        message: "login successfully",
        data: {
          id: user.id,
          first_name: user.first_name,
          last_name: user.last_name,
          role_id: user.role_id,
        },
      });
    });
  })(req, res, next); // add this for return can work, if without (req, res, next), nothing will return
};

// logout module
logoutAccount = function (req, res) {
  req.session.destroy((err) => { // destroying the session
    if (err) {
      return res.status(400).json({ success: false, message: err });
    }
  });

  res.clearCookie("sessionId"); // clearing cookkie
  // returning successful message
  return res
    .status(200)
    .json({ success: true, message: "logout successfully" });
};

/**
 * RESET ACCOUNT PASSWORD
 * 
 * Param:
 *    "email": email of the advisor,
 *    "new_password": giving new password
 * 
 * Returns:
 *    {success: false, error: "error reason"}
 *    {success: true, data: "email"}}
 
 * */
resetAccountPassword = async (req, res, next) => {
  // get body parameter need req.body.parameter

  // Check the email is existing or not
  let advisor;
  try {
    advisor = await Advisor.findAll({
      where: {
        email: req.body.email,
        is_del: 0,
      },
    });
  } catch (err) {
    return res
      .status(400)
      .json({ success: false, error: "[found advisor error]" + err }); // if error in finding the advisor
  }

  // If cannot find advisor, that means archiving the advisor not working
  if (advisor.length == 0) {
    return res
      .status(400)
      .json({ success: false, error: "email of advisor not found" });
  }

  // If found email in db, then reset/update

  const email = req.body.email;
  const old_password = req.body.old_password;
  const new_password = req.body.new_password;
  const type = req.body.type;

  try {
    if (type == "RESET") { // if the action is to reset
      if (new_password == null) {
        return res.status(400).json({
          success: false,
          error:
            type + "[reset password error]: " + "please type your new password",
        });
      } else {
        // change the password to new password
        resetPassword(email, new_password);
        // If finnd the advisor, return status with 200 and success: true, and {id, archived status}
        return res.status(200).json({
          success: true,
          email: email,
          message: type + " password successfully",
        });
      }
    } else {
      // type == "UPDATE"
      if (old_password == null) {
        return res.status(400).json({
          success: false,
          error: type + "[password error]: " + "please type your old password",
        });
      } else {
        // Need username and password to auth, transfer them if don't have these two fields
        // Only for update password
        if (req.body.email && req.body.old_password) {
          req.body.username = req.body.email;
          req.body.password = req.body.old_password;
        }

        passport.authenticate("local", async (err, user, info) => {
          let isCorrect = true;

          // if can not login, the user will null and return status 400 and reason for the failure

          if (!user) isCorrect = false;

          if (!isCorrect) {
            // if given old password is null
            return res.status(400).json({
              success: false,
              error:
                type +
                "[password error]: " +
                "please type your right old password " +
                info.message,
            });
          }

          if (new_password == null) { // if new password is null
            return res.status(400).json({
              success: false,
              error:
                type + "[password error]: " + "please type your new password",
            });
          } else {
            // change the password to new password
            resetPassword(email, new_password);
            // If finnd the advisor, return status with 200 and success: true, and {id, archived status}
            return res.status(200).json({
              success: true,
              email: email,
              message: type + " password successfully",
            });
          }
        })(req, res, next);
      }
    }
  } catch (err) { // returning error response on 
    return res
      .status(400)
      .json({ success: false, error: "[reset password error]: " + err });
  }
};

isLoginAccount = function (req, res, next) {
  if (req.session.userId) {
    return next();
  }

  return res
    .status(400)
    .json({ success: false, message: "please login firstly" });
};

resetPassword = async (email, new_password) => {
  const hash = await bcrypt.hash(new_password, HASH_SALT);
  await Advisor.update(
    {
      password: hash,
      update_time: Date.now(),
    }, // set new hashed password
    {
      where: {
        email: email,
        is_del: 0,
      },
    } // Auto inncrement index in advisor table
  );
};

// exporting modules
module.exports = {
  registerAccount,
  loginAccount,
  logoutAccount,
  isLoginAccount,
  resetAccountPassword,
};
