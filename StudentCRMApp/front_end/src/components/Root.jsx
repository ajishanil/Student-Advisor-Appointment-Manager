import SideBar from "./SideBar";
import NavBar from "./NavBar";
import Home from "../pages/HomePage/Home";
import Login from "../pages/LoginPage/login";
import AddStudent from "../pages/AddStudentPage/AddStudent";
import ArchiveStudent from "../pages/ArchiveStudentPage/ArchiveStudent";
import StudentInfo from "../pages/StudentInfoPage/StudentInfo";
import StudentUpdate from "../pages/StudentUpdatePage/StudentUpdate";
import AddNote from "../pages/AddNotePage/AddNote";
import StaffHome from "../pages/StaffHome/StaffHome";
import AddStaff from "../pages/AddStaffPage/AddStaffPage";
import StudentNotes from "../pages/StudentNotesPage/StudentNotes";
import StaffInfo from "../pages/StaffInfoPage/StaffInfo";
import StaffUpdate from "../pages/StaffUpdatePage/StaffUpdate";
import StudentFiles from "../pages/StudentFilesPage/StudentFilesPage";
import ResetPassword from "../pages/PasswordManage/ResetPassword";
import UpdatePassword from "../pages/PasswordManage/UpdatePassword";

import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";

function Root() {
  return (
    <BrowserRouter>
      <SubRoot />
    </BrowserRouter>
  );
}

function SubRoot() {
  // declare variable to know user's location
  const location = useLocation();

  return (
    <div className="d-flex flex-row">
      {location.pathname !== "/login" ? <SideBar /> : null}

      <div className="d-flex flex-column flex-grow-1">
        {location.pathname !== "/login" ? <NavBar /> : null}

        <div
          className="bg-light flex-grow-1"
          style={
            location.pathname !== "/login"
              ? { height: "0px", overflowY: "auto" }
              : {}
          }
        >
          {/* path for pages */}
          {/* login page route */}

          <Routes>
            <Route
              exact
              path="/"
              element={
                <Navigate
                  to={{
                    pathname: `${
                      sessionStorage.getItem("AdvisorId") ? "/home" : "/login"
                    }`,
                  }}
                />
              }
            />
            {/* home page route */}
            <Route exact path="/home" element={sessionStorage.getItem("AdvisorId") ? <Home /> : <Navigate to={{pathname: "/login",}}/>} />
            {/* add-student page route */}
            <Route exact path="/home/addstudent" element={sessionStorage.getItem("AdvisorId") ? <AddStudent /> : <Navigate to={{pathname: "/login",}}/>} />
            {/* archive-student-list page route */}
            <Route
              exact
              path="/home/archivestudent"
              element={sessionStorage.getItem("AdvisorId") ? <ArchiveStudent /> : <Navigate to={{pathname: "/login",}}/>}
            />
            {/* student-inforation page route */}
            <Route exact path="/home/student-info" element={sessionStorage.getItem("AdvisorId") ? <StudentInfo /> : <Navigate to={{pathname: "/login",}}/>} />
            {/* student-inforation-update page route */}
            <Route
              exact
              path="/home/student-update"
              element={sessionStorage.getItem("AdvisorId") ? <StudentUpdate /> : <Navigate to={{pathname: "/login",}}/>}
            />
            {/* student-notes page route */}
            <Route
              exact
              path="/home/student-notes"
              element={sessionStorage.getItem("AdvisorId") ? <StudentNotes /> : <Navigate to={{pathname: "/login",}}/>}
            />
            {/* student-addnote page route */}
            <Route exact path="/home/student-addnote" element={sessionStorage.getItem("AdvisorId") ? <AddNote /> : <Navigate to={{pathname: "/login",}}/>} />
            {/* student-files page route */}
            <Route
              exact
              path="/home/student-files"
              element={sessionStorage.getItem("AdvisorId") ? <StudentFiles /> : <Navigate to={{pathname: "/login",}}/>}
            />
            {/* staff page route */}
            <Route exact path="/staff" element={sessionStorage.getItem("AdvisorId") ? <StaffHome /> : <Navigate to={{pathname: "/login",}}/>} />
            {/* add-staff page route */}
            <Route exact path="/staff/addstaff" element={sessionStorage.getItem("AdvisorId") ? <AddStaff /> : <Navigate to={{pathname: "/login",}}/>} />
            {/* staff-inforation page route */}
            <Route exact path="/staff/info" element={sessionStorage.getItem("AdvisorId") ? <StaffInfo /> : <Navigate to={{pathname: "/login",}}/>} />
            {/* staff-inforation-update page route */}
            <Route exact path="/staff/update" element={sessionStorage.getItem("AdvisorId") ? <StaffUpdate /> : <Navigate to={{pathname: "/login",}}/>} />

            {/* staff-reset-pass route */}
            <Route
              exact
              path="/staff/resetpassword"
              element={sessionStorage.getItem("AdvisorId") ? <ResetPassword /> : <Navigate to={{pathname: "/login",}}/>}
            />

            {/* staff-update-pass route */}
            <Route
              exact
              path="/staff/updatepassword"
              element={sessionStorage.getItem("AdvisorId") ? <UpdatePassword /> : <Navigate to={{pathname: "/login",}}/>}
            />

            {/* staff-profile page route */}
            <Route exact path="/staff/profile" element={sessionStorage.getItem("AdvisorId") ? <StaffInfo /> : <Navigate to={{pathname: "/login",}}/>} />

            {/* wildcard route - if user types something which is not defined as path, 
            user will be redirected to home page */}
            <Route
              path="*"
              element={
                <Navigate
                  to={{ pathname: "/", state: { from: location.pathname } }}
                />
              }
            />

            <Route exact path="/login" element={<Login />} />
            <Route
              path="*"
              element={
                <Navigate
                  to={{
                    pathname: "/login",
                    state: { from: location.pathname },
                  }}
                />
              }
            />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default Root;
