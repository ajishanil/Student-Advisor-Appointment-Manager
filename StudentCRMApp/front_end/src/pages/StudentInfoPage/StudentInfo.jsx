import {
  Col,
  Container,
  FormControl,
  FormGroup,
  Form,
  Row,
  Button,
} from "react-bootstrap";
import "../../assets/styles/StudentInfo.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { archiveStudent, getStudentById } from "../../api";

function StudentInfo() {
  // define a state variable to track the student
  const [student, setStudent] = useState(sessionStorage.getItem("student"));

  // store the student is archived or not in session storage
    sessionStorage.setItem("isDel", student.is_del);

  useEffect(() => {
    // api call to get student by id
    getStudentById(sessionStorage.getItem("Id"))
      .then((res) => {
        // set the student state
        setStudent(res.data.data[0]);
      })
      .catch((e) => {
        alert("Student not found");
      });
  }, {});

  // define a variable to navigate to other pages
  const navigate = useNavigate();

  // event onClick Archive button
  const handleArchive = (event) => {
    if (window.confirm("Are you sure you want to archive this Student?")) { 
    // api call to archive the student
    archiveStudent(sessionStorage.getItem("Id"))
      .then((response) => {
        alert("Student Archived Successfully");
        navigate("/home/archivestudent");
      })
      .catch((e) => {
        alert("Student not Archived");
      });
    }
  };

  // event onClick Update button
  const handleUpdate = (event) => {
    navigate("/home/student-update", {
      state: {
        student: student,
      },
    });
  };

  return (
    <div>
      <h2 className="text-center mt-3 mb-5">Student Information</h2>
      <Container>
        <Row className="justify-content-center mb-2 gx-4">
          <Col md={5}>
            <h6>Student ID Number</h6>
            <FormControl
              size="sm"
              style={{ backgroundColor: "white" }}
              value={student.student_id}
              disabled
            />
          </Col>
          <Col md={5}>
            <h6>Current Status</h6>
            <FormControl
              size="sm"
              style={{ backgroundColor: "white" }}
              value={student.status}
              disabled
            />
          </Col>
        </Row>
        <Row className="justify-content-center mb-3 gx-4">
          <Col md={5}>
            <h6>First Name</h6>
            <FormControl
              size="sm"
              style={{ backgroundColor: "white" }}
              value={student.first_name}
              disabled
            />
          </Col>
          <Col md={5}>
            <h6>Last Name</h6>
            <FormControl
              size="sm"
              style={{ backgroundColor: "white" }}
              value={student.last_name}
              disabled
            />
          </Col>
        </Row>
        <Row className="justify-content-center mb-3 gx-4">
          <Col md={5}>
            <h6>Email Address</h6>
            <FormControl
              size="sm"
              style={{ backgroundColor: "white" }}
              value={student.email_address}
              disabled
            />
          </Col>
          <Col md={5}>
            <h6>Home Country</h6>
            <FormControl
              size="sm"
              style={{ backgroundColor: "white" }}
              value={student.home_country}
              disabled
            />
          </Col>
        </Row>
        <Row className="justify-content-center mb-3 gx-4">
          <Col md={5}>
            <h6>Program</h6>
            <FormControl
              size="sm"
              style={{ backgroundColor: "white" }}
              value={student.program}
              disabled
            />
          </Col>
          <Col md={5}>
            <h6>Campus</h6>
            <FormControl
              size="sm"
              style={{ backgroundColor: "white" }}
              value={student.campus}
              disabled
            />
          </Col>
        </Row>
        <Row className="justify-content-center mb-3 gx-4">
          <Col md={5}>
            <h6>Degree</h6>
            <FormControl
              size="sm"
              style={{ backgroundColor: "white" }}
              value={student.degree}
              disabled
            />
          </Col>
          <Col md={5}>
            <h6>Year</h6>
            <FormControl
              size="sm"
              style={{ backgroundColor: "white" }}
              value={student.year}
              disabled
            />
          </Col>
        </Row>
        <Row className="justify-content-center mb-3 gx-4">
          <Col md={5}>
            <h6>Date Of Birth</h6>
            <FormControl
              size="sm"
              style={{ backgroundColor: "white" }}
              value={student.date_birth}
              disabled
            />
          </Col>
          <Col md={5}>
            <h6>Gender</h6>
            <FormControl
              size="sm"
              style={{ backgroundColor: "white" }}
              value={student.gender}
              disabled
            />
          </Col>
        </Row>
        <Row className="justify-content-center text-center mb-3 gx-4">
          <Col md={5}>
            <Button
              id="btn-archive"
              type="button"
              className="m-3"
              hidden={student.is_del === 1 ? true : false}
              onClick={handleArchive}
            >
              Archive
            </Button>
          </Col>
          <Col md={5}>
            <Button
              id="btn-submit"
              type="submit"
              className="m-3"
              hidden={student.is_del === 1 ? true : false}
              onClick={handleUpdate}
            >
              Update
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default StudentInfo;
