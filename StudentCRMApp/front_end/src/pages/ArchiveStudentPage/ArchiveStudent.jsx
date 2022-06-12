// Importing styles for this view
import "../../assets/styles/ArchivedStudents.css";

// importing react hooks.
// The useEfect allows to perform side effects to components
// The useState allows to track state of a component.
import { useEffect, useState } from "react";

// importing the api for this view
import { getArchiveStudents } from "../../api";

export default function ArchivedStudents() {
  const [list, setList] = useState([]);

  // this calls the funtion after dom render
  useEffect(() => {
    getArchiveStudents()
      .then((res) => {
        // Setting list with data from responce
        setList(res.data.data);
      })
      .catch((e) => {
        alert("Error in fetching data");
      });
  }, []);

  return (
    <div>
      {/* Archived students page heading */}
      <h2 className="text-center m-5">Archived Students</h2>
      {/* Table container for students */}
      <div className="recent-table">
        {/* Table which will return all the list of archived studnets */}
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Student ID</th>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {list.map((item, index) => (
              <tr key={index}>
                <td>{item.student_id}</td>
                <td>{item.name}</td>
                <td>{item.email_address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
