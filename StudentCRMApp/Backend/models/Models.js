/**
 * file containns reference to all model files
 
 * */
const Student = require('./Student');
const Student_program = require('./Student_program');
const Campus = require('./Campus');
const Role = require('./Role');
const Advisor=require('./Advisor');
const Note = require('./Note');
const Type = require('./Type');

// Declaring relation between student_program and Student
Student_program.hasOne(Student, {
    foreignKey: 'id', // the id in the student table, not real student_id in the system
    sourceKey: 'student_id',
});

// Declaring relation between student_program and Campus
Student_program.hasOne(Campus, {
    foreignKey: 'id',  // from campus table
    sourceKey: 'campus_id', // from student_program table
});

// Declaring relation between Advisor and Campus
Advisor.hasOne(Campus, {
    foreignKey: 'id',  // from Campus table
    sourceKey: 'campus_id', // from Advisor table
});
// Declaring relation between Advisor and Role
Advisor.hasOne(Role, {
    foreignKey: 'id',  // from Role table
    sourceKey: 'role_id', // from Advisor table
});

// Declaring relation between Note and Type
Note.hasOne(Type,{
    foreignKey: 'id',  // from Note table
    sourceKey: 'type_id', // from Type table
});

// Declaring relation between Note and Student
Note.hasOne(Student, {
    foreignKey: 'id', // the id in the student table, not real student_id in the system
    sourceKey: 'student_id',
});

// Declaring relation between Advisor and Note
Note.hasOne(Advisor,{
    foreignKey: 'id',  // from Note table
    sourceKey: 'advisor_id', // from advisor table
});


//exports all the models for database in one page
module.exports = {
    Student,
    Student_program,
    Campus,
    Role,
    Advisor,
    Note,
    Type
}