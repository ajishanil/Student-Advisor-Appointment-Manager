/*  Navigation top bar component which includes student and staff buttons for navigation to respective views 
    along with prifile options.
    This will be exported in this file to be used later
 */

// Importing style sheet for html
import "../assets/styles/NavBar.css";
//  Importing bootsrap icons to be used in this file
//  Installation -> npm install bootstrap-icons
//  version -> 1.8.2
//  This package allows to put icons into web page as elements*/
import "bootstrap-icons/font/bootstrap-icons.css";

import { NavLink } from "react-router-dom";

// Exporting NavBar component to be used later
export default function NavBar() {
  return (
    // top-bar container will have the entire navbar scope
    <div className="top-bar">
      {/* Student button to navigate to student view (selected by default) */}

      <NavLink to="/home" className="navItem nav-link text-white btn-student">
        Student
      </NavLink>

      {/* Staff button to navigate to student view */}

      <NavLink to="/staff" className="navItem nav-link text-white btn-staff">
        Staff
      </NavLink>

      {/* Container holding elements in the top right of navigation bar */}
      <div className="top-right">
        {/*Profile link to access logged in user profile and sub menus */}
        <a href="#Profile" className="user-name">
          {sessionStorage.getItem("Name")}
        </a>

        {/* Dropdown menu lis for profile link */}
        <div className="dropdown-content">
          {/* Dropdown items:  */}

          {/* Profile link which will navigate to logged in users profile details */}
          <a
            href="/staff/profile"
            onClick={() => {
              sessionStorage.setItem("Id", sessionStorage.getItem("AdvisorId"));
            }}
          >
            <i className="bi bi-person-lines-fill"></i>&nbsp;Profile
          </a>

          {/* Logout link which will proide the functionality for loggin out of portal */}
          <a href="/login">
            <i className="bi bi-box-arrow-in-right"></i>&nbsp;Log Out
          </a>
        </div>
      </div>
    </div>
  );
}
