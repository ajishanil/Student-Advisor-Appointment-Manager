import "../../assets/styles/StaffHome.css";
import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { getStaff } from "../../api/index";

export default function StaffHome() {
  // define a variable to navigate to other pages
  const navigate = useNavigate();

  // define a variable to store staff data
  const [list, setList] = useState([]);

  // Setting list with data from responce of getStaff
  useEffect(() => {
    getStaff()
      .then((res) => {
        setList(res.data.data);
      })
      .catch((e) => {
        alert(e.response.data.message);
      });
  }, []);

  // navigation to staff info page
  const viewStaffDetails = (index) => {
    sessionStorage.setItem("Id", index);
    navigate("/staff/info");
  };

  return (
    <div>
      <h2 className="text-center m-4">Advisor's List</h2>
      <div className="recent-table m-4">
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Campus</th>
            </tr>
          </thead>
          <tbody>
            {list.map((item, index) => (
              <tr
                key={index}
                onClick={() => {
                  viewStaffDetails(item.id);
                }}
              >
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.campus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
