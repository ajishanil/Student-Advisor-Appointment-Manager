import axios from "axios";

// define a base address for backend api
const Api = axios.create({
  baseURL: "http://localhost:3001/api",
});

// A post route which takes one parameter and passes that to the route.
export const login = (payload) => Api.post("/login", payload);

// get recent Student list
export const getRecentStudent = (id) => Api.get("/student/recent/" + id);

//add a single student
// A post route which takes one parameter and passes that to the route.
export const addStudent = (payload) => Api.post("/student/create", payload);

// add students by file
// A post route which takes file as parameter and passes that to the route
export const addStudents = (payload) =>
  Api.post("/student/upload", payload, {
    headers: {
      "Content-Type": "multipart/form-data", // which allows the file to be uploaded in multipart
    },
  });

// archive a student
// A put route which takes id as parameter and passes that to the route
export const archiveStudent = (id) => Api.put("/student/archive/set/" + id);

// get all archived students
// A get route which return Archive Student List
export const getArchiveStudents = () => Api.get("/student/archive/get");

// get student user searched for
// A get route which takes id as parameter and passes that to the route
export const getStudent = (id) => Api.get("/student/search/" + id);

// get student by id
// A get route which takes id as parameter and passes that to the route
export const getStudentById = (id) => Api.get("/student/" + id);

// update a student
// A put route which takes id as parameter and passes that to the route
export const updateStudent = (id, payload) =>
  Api.put("/student/update/" + id, payload);

// add note
export const addNote = (payload) => Api.post("/student/notes", payload);

// get all notes
export const getNotes = (id) => Api.get("/student/notes/" + id);

// get note by id
export const getNoteById = (id) => Api.get("/student/notes/detail/" + id);

// archive note
export const archiveNote = (id) => Api.put("/student/notes/archive/" + id);

// get staff
export const getStaff = () => Api.get("/advisors/");

// get staff by id
export const getStaffById = (id) => Api.get("/advisor/" + id);

// add staff
export const addStaff = (payload) => Api.post("/staff/register", payload);

// update staff
export const updateStaff = (id, payload) => Api.put("/advisor/" + id, payload);

// archive staff
export const archiveStaff = (id) => Api.post("/advisor/archive/set/" + id);

// get files
export const getFiles = (id) => Api.get("/student/files/" + id);

// reset password
export const resetPassword = (payload) => Api.post("/resetPassword", payload);

// download file
export const downloadFile = (payload) =>
  Api.post("/student/file/download", payload, {
    responseType: "blob",
  });
