/*
  This function add new student
  Parameter: 
  Body: data passed similar to Student and Student program model.
  Output: Success status and Primary key of newly created record
  
*/

// imports
const db = require('../models/Models'); // required models

// The function for creating new student
createStudent = async (req, res) => {  
    // Validate request body
    if (req.body.length == 0) {
      // in case of empty body
      return res.status(400).send({
        message: "Content can not be empty!",
      });
    }
    try {
      
      // Create a student object
      const student = {
        student_id: req.body.student_id,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        date_birth: req.body.date_birth,
        gender: req.body.gender,
        home_country: req.body.home_country,
       
        email_address: req.body.email_address,
        is_del: 0,
        create_time: Date.now(),
        create_by: req.body.create_by
      };
  
      // gettiing campus details
      campus = await db.Campus.findOne({
        where : {
          name: req.body.program.campus,
          is_del: 0,
        }, // get all student with the given email
        
        attributes: [// retrun data
            'id', // Primary key
            'name' // campus name
            ],
    });
    
    
      
    let student_data = await db.Student.build(student);// Building the object with Student Model
    await student_data.save();// Save new Student record in the database

      // Creating student program object
    const student_program = {
        status: req.body.program.status,
        program: req.body.program.program,
        degree: req.body.program.degree,
        year: req.body.program.year,
        is_del: 0,
        create_time: Date.now(),
        create_by: req.body.create_by,
        student_id: student_data.dataValues.id,
        campus_id: campus.id
    }

    let program_data = await db.Student_program.build(student_program);// Building the object with Student program Model
    await program_data.save();// Save new Student progarm record in the database
    
      // return success status
      return res.status(200).json({
        success: true,
        message:"Added successfully",
        studentId: student_data.id
      });

    } catch (e) {
      // return error status
      return res
        .status(400).json({ success: false, error: e}); 
    }
  };


  // exporting createStudent module
  module.exports = createStudent;