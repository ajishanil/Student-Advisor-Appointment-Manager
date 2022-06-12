/*
  This function add or update multiple student details from uploaded file
  Parameter: 
  Body: form-data
        input file in request.file
        key : datafile
  Prequisite: multer package
  Output: Success status and message
  
*/

// required imports
const XLSX = require("xlsx"); // package is used for processing excel files
const fs = require("fs"); // package is used for file processing
const db = require("../models/Models"); // importing models
const sequelize = require("sequelize"); // importing sequlize

// Function for proccseeing upploaded file for adding students
processUploadFile = async (req, res, next) => {
  var respBody = {};
  try {
    const fileLocation = req.file.path; // getting file location
    //processing data
    var workbook = XLSX.readFile(fileLocation); // reading excel file from the location
    var sheet_name_list = workbook.SheetNames; // getting sheet list

    var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]); // getting data from student sheet

    // Initializing success count and error count
    var errorCount = 0;
    var successCount = 0;

    //iterating through all student data in excel sheet.
    for (var data in xlData) {
      // Taking one student detail
      var singleStudentData = xlData[data];

      var enrolStatus = "Perspective"; // setting default program status for student

      // checking whether the student is graduated or not
      if (singleStudentData["Grad Ind"] == "Y") {
        enrolStatus = "Graduate";
      } else {
        //check the current status of the student
        if (singleStudentData["Enrol Status"] == "EL") {
          // EL => Enrolled
          enrolStatus = "Enrolled";
        }
      }

      // Building a student object
      const student = {
        student_id: singleStudentData["Id"],
        first_name: singleStudentData["First Name"],
        last_name: singleStudentData["Last Name"],
        date_birth: singleStudentData["Birth Date"],
        gender: singleStudentData["Gender"],
        home_country: singleStudentData["Nation Of Citizenship Desc"],
        email_address: singleStudentData["Internet Address"], // email
        is_del: 0, // archive field.
        create_time: Date.now(),
        create_by: 1,
      };

      // Building student program object
      const student_program = {
        status: enrolStatus,
        program: singleStudentData["Program"],
        degree: singleStudentData["Degree"],
        year: singleStudentData["YR"],
        is_del: 0,
        create_time: Date.now(),
        create_by: 1,
        campus_id: 1,
      };

      // checking whether the student data is already added in the field
      studentExist = await db.Student.findOne({
        where: { student_id: singleStudentData["Id"] },
      }).catch((error) => {});

      // If this is a new student
      if (!studentExist) {
        //Add new student
        try {
          // build student model using models
          let student_data = await db.Student.build(student);
          await student_data.save(); // adding the student record

          // building student program using model
          let program_data = await db.Student_program.build(student_program);

          // setting the referecen between student and student program record
          program_data.student_id = student_data.dataValues.id;
          await program_data.save(); // adding the program to student program table

          successCount++; // incrementing as the record added successfully
        } catch (e) {
          errorCount++; // incrementing as an error occured
        }
      } else {
        // Iff student record is already there then updating the record if any changes is there
        // updating exsisting

        try {
          // applying changes
          studentExist.set({
            student_id: singleStudentData["Id"],
            first_name: singleStudentData["First Name"],
            last_name: singleStudentData["Last Name"],
            date_birth: singleStudentData["Birth Date"],
            gender: singleStudentData["Gender"],
            home_country: singleStudentData["Nation Of Citizenship Desc"],
            email_address: singleStudentData["Internet Address"],
            update_time: Date.now(),
            update_by: 1,
          });

          // updating student record
          await studentExist.save();

          // checking if given program associated with student is already in database
          exsistingStudentProgram = await db.Student_program.findOne({
            where: { student_id: studentExist.dataValues.id },
          }).catch((error) => {});

          // if the data is there update if any changes is there
          if (
            exsistingStudentProgram.dataValues.program ==
            student_program.program
          ) {
            // updating program list
            exsistingStudentProgram.set({
              status: enrolStatus,
              program: singleStudentData["Program"],
              degree: singleStudentData["Degree"],
              year: singleStudentData["YR"],
              campus_id: 1,
              update_time: Date.now(),
              update_by: 1,
            });

            await exsistingStudentProgram.save(); // updating
          } else {
            // creating a new record for the student_programs
            let program_data = await db.Student_program.build(student_program);
            //Seeting reference to student
            program_data.student_id = studentExist.dataValues.id;
            await program_data.save(); // updating
          }

          // if success the count is incresed
          successCount++;
        } catch (e) {
          errorCount++; // error count is increased in case of failure
        }
      }
    }

    //
    // deleting the uploaded tempory file uploaded in upload folder
    fs.unlinkSync(fileLocation);
    respBody = {
      success: true,
      message: "file uploded successfully",
      successCount: successCount,
      errorCount: errorCount,
    };
    res.status(200).send(respBody); // sending success response
  } catch (e) {
    respBody = { success: false, message: "file upload failed" };
    res.status(400).send(respBody); // sending failure response
  }
};

// exporting processUploadFile module
module.exports = processUploadFile;
