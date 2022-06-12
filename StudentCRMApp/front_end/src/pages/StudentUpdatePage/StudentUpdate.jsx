// Bootstrap imports for front end
import {
  Col,
  Container,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  Row,
  Button,
} from "react-bootstrap";

// importing react hooks.
// The useState allows to track state of a component.
import { useState } from "react";

// useNavigation allows to navigate ot other views with the project
import { useLocation, useNavigate } from "react-router-dom";

// Importing update student notes api
import { updateStudent } from "../../api/index";

function StudentUpdate() {
  // defined an object variable to access the object has been passed from "StudentInfo Page" in navigation
  const { state } = useLocation();

  //Form validation state
  const [validated, setValidated] = useState(false);

  //defined a state variable to store the object to access student's details
  const [student, setStudent] = useState(state.student);

  // defined the state for all inputs
  const [studentId, setStudentId] = useState(student.student_id);
  const [currentStatus, setCurrentStatus] = useState(student.status);
  const [firstName, setFirstName] = useState(student.first_name);
  const [lastName, setLastName] = useState(student.last_name);
  const [email, setEmail] = useState(student.email_address);
  const [country, setCountry] = useState(student.home_country);
  const [program, setProgram] = useState(student.program);
  const [campus, setCampus] = useState(student.campus);
  const [degree, setDegree] = useState(student.degree);
  const [year, setYear] = useState(student.year);
  const [dob, setDob] = useState(student.date_birth);
  const [gender, setGender] = useState(student.gender);

  // define a variable to navigate to other pages
  const navigate = useNavigate();

  // event onClick Cancel button which navigate user to StudentInfo Page
  const handleCancel = (event) => {
    event.preventDefault();
    navigate("/home/student-info");
  };

  // event onClick Save button which update the Student's Details then navigate user to StudentInfo Page
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === true) {
      event.preventDefault();
      // api call to update student
      updateStudent(sessionStorage.getItem("Id"), {
        student_id: studentId,
        first_name: firstName,
        last_name: lastName,
        email_address: email,
        home_country: country,
        date_birth: dob,
        gender: gender,
        program: {
          program: program,
          campus: campus,
          degree: degree,
          year: year,
          status: currentStatus,
        },
      })
        .then((response) => {
          alert("Student Updated Successfully");
          navigate("/home/student-info");
        })
        .catch((e) => {
          alert("Student not Updated");
          navigate("/home/student-info");
        });
    } else {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  return (
    <div>
      <h2 className="text-center mt-4 mb-5">Update Student's Details</h2>

      {/* single student form */}
      <Container>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row className="justify-content-center gx-4">
            {/* Student Id */}
            <Col md={5}>
              <FormGroup className="mb-3">
                <FormLabel>Student ID Number:</FormLabel>
                <FormControl
                  type="text"
                  size="sm"
                  value={studentId}
                  pattern="^\d+$"
                  onChange={(e) => setStudentId(e.target.value)}
                  required={currentStatus !== "Prospective Student"}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid Student ID.
                </Form.Control.Feedback>
              </FormGroup>
            </Col>
            <Col md={5}>
              {/* Current status */}
              <FormGroup className="mb-3">
                <FormLabel>Current Status:</FormLabel>
                <Form.Select
                  required
                  value={currentStatus}
                  onChange={(e) => setCurrentStatus(e.target.value)}
                  size="sm"
                >
                  <option key={"empty"} value={""}>
                    Choose One...
                  </option>
                  <option value="Prospective Student">
                    Prospective Student
                  </option>
                  <option value="Enrolled">Enrolled</option>
                  <option value="Withdrawal">Withdrawal</option>
                  <option value="Graduated">Graduated</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  Please chosoe a status.
                </Form.Control.Feedback>
              </FormGroup>
            </Col>
          </Row>
          {/* First name */}
          <Row className="justify-content-center gx-4">
            <Col md={5}>
              <FormGroup className="mb-3">
                <FormLabel>First Name:</FormLabel>
                <FormControl
                  required
                  type="text"
                  size="sm"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a First name.
                </Form.Control.Feedback>
              </FormGroup>
            </Col>
            <Col md={5}>
              <FormGroup className="mb-3">
                {/* Last name */}
                <FormLabel>Last Name:</FormLabel>
                <FormControl
                  required
                  type="text"
                  size="sm"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a Last name.
                </Form.Control.Feedback>
              </FormGroup>
            </Col>
          </Row>
          <Row className="justify-content-center gx-4">
            {/* Email */}
            <Col md={5}>
              <FormGroup className="mb-3">
                <FormLabel>Email Address:</FormLabel>
                <FormControl
                  required
                  type="email"
                  size="sm"
                  pattern='/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid email.
                </Form.Control.Feedback>
              </FormGroup>
            </Col>
            <Col md={5}>
              <FormGroup className="mb-3">
                {/* Home Country */}
                <FormLabel>Home Country:</FormLabel>
                <FormControl
                  type="text"
                  size="sm"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a home country.
                </Form.Control.Feedback>
              </FormGroup>
            </Col>
          </Row>
          <Row className="justify-content-center gx-4">
            <Col md={5}>
              {/* Program */}
              <FormGroup className="mb-3">
                <FormLabel>Program:</FormLabel>
                <FormControl
                  type="text"
                  size="sm"
                  value={program}
                  onChange={(e) => setProgram(e.target.value)}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a value for program.
                </Form.Control.Feedback>
              </FormGroup>
            </Col>
            <Col md={5}>
              {/* Campus */}
              <FormGroup className="mb-3">
                <FormLabel>Campus:</FormLabel>

                <Form.Select
                  required
                  value={campus}
                  onChange={(e) => setCampus(e.target.value)}
                  size="sm"
                >
                  <option key={"empty"} value={""}>
                    Choose One...
                  </option>
                  <option value="Saskatoon">Saskatoon</option>
                  <option value="Regina">Regina</option>
                  <option value="Moose Jaw">Moose Jaw</option>
                  <option value="Prince Albert">Prince Albert</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  Please choose a campus.
                </Form.Control.Feedback>
              </FormGroup>
            </Col>
          </Row>
          <Row className="justify-content-center gx-4">
            <Col md={5}>
              <FormGroup className="mb-3">
                {/* Degree */}
                <FormLabel>Degree:</FormLabel>
                <FormControl
                  type="text"
                  required
                  size="sm"
                  value={degree}
                  onChange={(e) => setDegree(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a value for degree.
                </Form.Control.Feedback>
              </FormGroup>
            </Col>
            <Col md={5}>
              <FormGroup className="mb-3">
                {/* Year */}
                <FormLabel>Year:</FormLabel>
                <FormControl
                  required
                  type="text"
                  size="sm"
                  pattern="^\d+"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter valid year.
                </Form.Control.Feedback>
              </FormGroup>
            </Col>
          </Row>
          <Row className="justify-content-center gx-4">
            <Col md={5}>
              <FormGroup className="mb-3">
                {/* Date of birth */}
                <FormLabel>Date Of Birth:</FormLabel>
                <FormControl
                  type="date"
                  size="sm"
                  value={dob}
                  required
                  onChange={(e) => setDob(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Please choose valid date.
                </Form.Control.Feedback>
              </FormGroup>
            </Col>
            <Col md={5}>
              <FormGroup className="mb-3">
                {/* Gender */}
                <FormLabel>Gender:</FormLabel>
                <Form.Select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  size="sm"
                  required
                >
                  <option key={"empty"} value={""}>
                    Choose One...
                  </option>
                  <option value="M">Male</option>
                  <option value="F">Female</option>
                  <option value="O">Other</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  Please choose a gender.
                </Form.Control.Feedback>
              </FormGroup>
            </Col>
          </Row>
          <Row className="justify-content-center gx-4">
            <Col md={5}>
              <Form.Group className="text-center m-3">
                {/* cancel button */}
                <Button id="btn-cancel" type="button" onClick={handleCancel}>
                  Cancel
                </Button>
              </Form.Group>
            </Col>
            <Col md={5}>
              {/* Save Button */}
              <Form.Group className="text-center m-3">
                <Button id="btn-submit" type="submit">
                  Save
                </Button>
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Container>
    </div>
  );
}

export default StudentUpdate;
