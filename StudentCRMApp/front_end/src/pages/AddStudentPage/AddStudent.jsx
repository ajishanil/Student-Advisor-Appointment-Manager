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
import { useNavigate } from "react-router-dom";
import { addStudent } from "../../api/index";

// Importing add student api
import { addStudents } from "../../api/index";

// Styles for this page
import "../../assets/styles/addStudent.css";

function AddStudent() {
  // defined the state for all inputs
  const [file, setFile] = useState(null);
  const [studentId, setStudentId] = useState("");
  const [currentStatus, setCurrentStatus] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [program, setProgram] = useState("");
  const [campus, setCampus] = useState("");
  const [degree, setDegree] = useState("");
  const [year, setYear] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");

  // event onClick Cancel button
  const cancelHandle = (event) => {
    event.preventDefault();
    navigate("/home");
  };

  // Validation for form validaiton
  const [validated, setValidated] = useState(false);

  const [disable, setDisable] = useState(false);

  // event onClick Upload button
  const fileUpload = (event) => {
    event.preventDefault();
    setDisable(true);

    // convert the file into formData
    const formData = new FormData();
    formData.append("datafile", file);

    // api call to upload file
    addStudents(formData)
      .then((response) => {
        // if the response is successfull then navigate to the home page
        alert("Student Added Successfully");
        setDisable(false);
        navigate("/home");
      })
      .catch((e) => {
        alert(e.response.data.message);
        setDisable(false);
      });
  };

  const navigate = useNavigate();

  // event onClick Save button

  const submitHandle = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();

      // api call to save student
      addStudent({
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
          alert("Student Added Successfully");
          navigate("/home");
        })
        .catch((e) => {
          alert(e.response.data.message);
        });
    }
    setValidated(true);
  };

  return (
    <div>
      <h2 className="text-center m-4">Add Multiple Student</h2>

      {/* file upload form */}
      <Container>
        <Form>
          <Row className="align-items-center justify-content-center gx-4">
            <Col md={6}>
              <FormGroup className="mt-2 mb-3">
                <FormControl
                  type="file"
                  size="sm"
                  accept=".xlsx, .xls"
                  key="datafile"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </FormGroup>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3 text-center">
                <Button
                  id="btn-submit"
                  type="submit"
                  onClick={fileUpload}
                  disabled={disable}
                >
                  Upload
                </Button>
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Container>

      {/* devider */}
      <hr />
      <h2 className="text-center m-4">Add Student</h2>

      {/* single student form */}
      <Container>
        <Form noValidate validated={validated} onSubmit={submitHandle}>
          {/* Student Id */}
          <Row className="justify-content-center gx-4">
            <Col md={5}>
              <FormGroup className="mb-3">
                <FormLabel>Student ID Number:</FormLabel>
                <FormControl
                  type="text"
                  size="sm"
                  placeholder=""
                  onChange={(e) => setStudentId(e.target.value)}
                  pattern="^\d+$"
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
          <Row className="justify-content-center gx-4">
            <Col md={5}>
              {/* First name */}
              <FormGroup className="mb-3">
                <FormLabel>First Name:</FormLabel>
                <FormControl
                  required
                  type="text"
                  size="sm"
                  placeholder=""
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a First name.
                </Form.Control.Feedback>
              </FormGroup>
            </Col>
            <Col md={5}>
              {/* Last name */}
              <FormGroup className="mb-3">
                <FormLabel>Last Name:</FormLabel>
                <FormControl
                  required
                  type="text"
                  size="sm"
                  placeholder=""
                  onChange={(e) => setLastName(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a Last name.
                </Form.Control.Feedback>
              </FormGroup>
            </Col>
          </Row>
          <Row className="justify-content-center gx-4">
            <Col md={5}>
              <FormGroup className="mb-3">
                {/* Email */}
                <FormLabel>Email Address:</FormLabel>
                <FormControl
                  type="email"
                  size="sm"
                  required
                  pattern='/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/'
                  placeholder=""
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
                  required
                  type="text"
                  size="sm"
                  placeholder=""
                  onChange={(e) => setCountry(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a home country.
                </Form.Control.Feedback>
              </FormGroup>
            </Col>
          </Row>
          <Row className="justify-content-center gx-4">
            <Col md={5}>
              <FormGroup className="mb-3">
                {/* Program */}
                <FormLabel>Program:</FormLabel>
                <FormControl
                  required
                  type="text"
                  size="sm"
                  placeholder=""
                  onChange={(e) => setProgram(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a value for program.
                </Form.Control.Feedback>
              </FormGroup>
            </Col>
            <Col md={5}>
              <FormGroup className="mb-3">
                {/* Campus */}
                <FormLabel>Campus:</FormLabel>

                <Form.Select
                  onChange={(e) => setCampus(e.target.value)}
                  size="sm"
                  required
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
                  required
                  type="text"
                  size="sm"
                  placeholder=""
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
                  pattern="^\d+"
                  type="text"
                  size="sm"
                  placeholder=""
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
                  required
                  type="date"
                  size="sm"
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
              {/* cancel button */}
              <Form.Group className="text-center m-3">
                <Button id="btn-cancel" type="button" onClick={cancelHandle}>
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

export default AddStudent;
