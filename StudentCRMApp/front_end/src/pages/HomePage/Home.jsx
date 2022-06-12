/* Student table page view that holds all the list of all the students that have recently contacted the logged in user */

// Styles for this page
import "../../assets/styles/StudentRecentTable.css";
import { useEffect, useState } from "react";

import {
  Col,
  Container,
  Form,
  FormControl,
  FormGroup,
  Row,
  Button,
} from "react-bootstrap";

// useNavigation allows to navigate ot other views with the project
import { useNavigate } from "react-router-dom";

// import api for getting students by ID
import { getRecentStudent, getStudent } from "../../api/index";

export default function Home() {
  const [list, setList] = useState([]);

  useEffect(() => {
    getRecentStudent(sessionStorage.getItem("AdvisorId"))
      .then((response) => {
        setList(response.data.data); // set the recent student list
      })
      .catch((err) => {
        alert("Error in fetching data");
      });
  }, []);

  // define a variable to navigate to other pages
  const navigate = useNavigate();

  const [id, setId] = useState("");
  const [student, setStudent] = useState({});
  const [heading, setHeading] = useState("Recent Students");

  // Setting list with data from responce if student is found
  const handleSearch = (event) => {
    event.preventDefault();

    getStudent(id)
      .then((res) => {
        setList(res.data.data);
        setHeading("Search Results");
        setId("");
      })
      .catch((e) => {
        alert(e.response.data.message);
        setId("");
      });
  };

  // navigation to student info page
  const viewStudentDetails = (index) => {
    // store the student id in session storage
    sessionStorage.setItem("Id", index);
    // store the student in session storage
    sessionStorage.setItem("student", student);
    // navigate to student info page
    navigate("/home/student-info");
  };

  return (
    <div>
      {/* Search box */}
      <Container>
        <Form>
          <Row className="align-items-center justify-content-center mt-5 mb-4">
            <Col md={4}>
              <FormGroup className="mb-3">
                <FormControl
                  type="text"
                  size="sm"
                  placeholder="Search Student"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                />
              </FormGroup>
            </Col>
            <Col md={2}>
              <Form.Group className=" mb-3 text-center">
                <Button
                  id="btn-submit"
                  type="submit"
                  size="sm"
                  onClick={handleSearch}
                >
                  Search
                </Button>
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Container>

      <h2 className="text-center mb-4">{heading}</h2>
      {/* Dummy table data which will be replaced by data from Database once final integrations are completed */}
      <div className="recent-table">
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Student ID</th>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {/* data from database will be made into the list and placed into this table rows */}
            {list.map((item, index) => (
              <tr
                key={index}
                onClick={() => {
                  viewStudentDetails(item.id);
                }}
              >
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
