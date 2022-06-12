/*  Navigation side bar component which includes saskatchewan polytechnic logo and additional page navigation buttons
    which will be added sepereatly.
    This will be exported in this file to be used later */

// Styles for this component
import "../assets/styles/SideBar.css";


// import sasklogo from "../assets/images/logo.png";
import StudentRecordButtons from "./StudentRecordButtons";
import DashboardButtons from "./DashboardButtons";
import { useLocation } from "react-router-dom";
import StaffHomeButton from "./StaffHomeButtons";

// Exporting sidebar compoenent to be used later
export default function SideBar() {
  // declare variable to know user's location
  const location = useLocation();

  return (
    // Side bar container
    <div className="side-bar">
      <a href="/">
        {/* <img src={sasklogo} alt="" className="side-bar-logo" /> */}
      </a>
      <div>
        {/* Conditional rendering of Student Record buttons based on user's location */}
        {location.pathname.includes("/student") ? (
          <StudentRecordButtons />
        ) : location.pathname.includes("/staff") ? (
          sessionStorage.getItem("Role") == 1 ? (
            <StaffHomeButton />
          ) : null
        ) : location.pathname.includes("/addstaff") ? (
          <StaffHomeButton />
        ) : (
          <DashboardButtons />
        )}
      </div>
    </div>
  );
}
