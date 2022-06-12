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

// Importing update staff api
import { updateStaff } from "../../api/index";

function StaffUpdate() {
  // defined an object variable to access the object has been passed from "StaffInfo Page" in navigation
  const { state } = useLocation();

  //defined a state variable to store the object to access staff's details
  const staff = state.staff;

  // Validate form states
  const [validated, setValidated] = useState(false);

  // defined the state for all inputs
  const [role, setRole] = useState(staff.role);
  const [firstName, setFirstName] = useState(staff.first_name);
  const [lastName, setLastName] = useState(staff.last_name);
  const [email, setEmail] = useState(staff.email);
  const [phone, setPhone] = useState(staff.phone_num);
  const [campus, setCampus] = useState(staff.campus);
  const [dob, setDob] = useState(staff.date_birth);
  const [License, setLicense] = useState(staff.license_type);
  const [licenseNumber, setLicenseNumber] = useState(staff.license_Number);

  const navigate = useNavigate();

  // event onClick Cancel button which navigate user to StaffInfo Page
  const handleCancel = (event) => {
    event.preventDefault();
    navigate("/staff/info");
  };

  // event onClick Save button which update the Staff's Details then navigate user to StaffInfo Page
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() !== true) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();

      // api call to update staff
      updateStaff(sessionStorage.getItem("Id"), {
        role: role,
        first_name: firstName,
        last_name: lastName,
        email: email,
        phone_num: phone,
        campus: campus,
        date_birth: dob,
        license_type: License,
        license_Number: licenseNumber,
      })
        .then((response) => {
          alert("Staff Updated Successfully");
          if (
            sessionStorage.getItem("Id") === sessionStorage.getItem("AdvisorId")
          ) {
            sessionStorage.setItem("Name", firstName);
          }
          navigate("/staff/info");
        })
        .catch((e) => {
          alert("Staff Update Failed");
          navigate("/staff/info");
        });
    }
    setValidated(true);
  };

  // Update Staff form
  return (
    <div>
      <h2 className="text-center m-4">Update the Information</h2>
      <Container>
        {/* Form with validation */}
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row className="justify-content-center gx-4">
            <Col md={10}>
              <FormGroup className="mb-3">
                <Form.Check
                  type="checkbox"
                  label="Admin"
                  disabled={sessionStorage.getItem("Role") == 1 ? false : true}
                  checked={role === "admin" ? true : false}
                  onChange={(e) => {
                    setRole(e.target.checked ? "admin" : "");
                  }}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row className="justify-content-center gx-4">
            <Col md={5}>
              {/* First name field */}
              <FormGroup className="mb-3">
                <FormLabel>First Name:</FormLabel>
                <FormControl
                  type="text"
                  size="sm"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a first name
                </Form.Control.Feedback>
              </FormGroup>
            </Col>
            <Col md={5}>
              <FormGroup className="mb-3">
                {/* Last name field */}
                <FormLabel>Last Name:</FormLabel>
                <FormControl
                  type="text"
                  size="sm"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
                {/* Form validation retuen value for invalid validation */}
                <Form.Control.Feedback type="invalid">
                  Please provide a last name
                </Form.Control.Feedback>
              </FormGroup>
            </Col>
          </Row>
          <Row className="justify-content-center gx-4">
            <Col md={5}>
              <FormGroup className="mb-3">
                {/* Email adress field */}
                <FormLabel>Email Address:</FormLabel>
                <FormControl
                  type="email"
                  pattern='/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/'
                  size="sm"
                  value={email}
                  disabled={sessionStorage.getItem("Role") == 1 ? false : true}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid email.
                </Form.Control.Feedback>
              </FormGroup>
            </Col>
            <Col md={5}>
              <FormGroup className="mb-3">
                {/* Phone number field */}
                <FormLabel>Phone Number:</FormLabel>
                <FormControl
                  type="text"
                  size="sm"
                  pattern="^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid phone number.
                </Form.Control.Feedback>
              </FormGroup>
            </Col>
          </Row>
          <Row className="justify-content-center gx-4">
            <Col md={5}>
              <FormGroup className="mb-3">
                {/* campus field */}
                <FormLabel>Campus:</FormLabel>

                <Form.Select
                  size="sm"
                  value={campus}
                  onChange={(e) => setCampus(e.target.value)}
                  required
                  as="select"
                  custom
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
                  Please Select a Campus.
                </Form.Control.Feedback>
              </FormGroup>
            </Col>

            <Col md={5}>
              <FormGroup className="mb-3">
                {/* date of birth field */}
                <FormLabel>Date Of Birth:</FormLabel>
                <FormControl
                  required
                  type="date"
                  size="sm"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Please select a date.
                </Form.Control.Feedback>
              </FormGroup>
            </Col>
          </Row>
          <Row className="justify-content-center gx-4">
            <Col md={5}>
              <FormGroup className="mb-3">
                {/* License Type field */}
                <FormLabel>License Type:</FormLabel>
                <Row>
                  <Col>
                    <Form.Check
                      inline
                      type="radio"
                      label="RISIA"
                      name="group2"
                      id="radio1"
                      checked={License === "RISIA" ? true : false}
                      onChange={(e) => setLicense("RISIA")}
                    />
                  </Col>
                  <Col>
                    <Form.Check
                      inline
                      type="radio"
                      label="RCIC"
                      name="group2"
                      id="radio2"
                      checked={License === "RCIC" ? true : false}
                      onChange={(e) => setLicense("RCIC")}
                    />
                  </Col>
                  <Col>
                    <Form.Check
                      inline
                      type="radio"
                      label="Other"
                      name="group2"
                      id="radio2"
                      onChange={(e) => setLicense("Other")}
                    />
                  </Col>
                </Row>
              </FormGroup>
            </Col>
            <Col md={5}>
              <FormGroup className="mb-3">
                {/* License number field */}
                <FormLabel>License Number:</FormLabel>
                <FormControl
                  required
                  type="text"
                  size="sm"
                  value={licenseNumber}
                  onChange={(e) => setLicenseNumber(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a valid license number.
                </Form.Control.Feedback>
              </FormGroup>
            </Col>
          </Row>

          <Row className="btns justify-content-center gx-4">
            <Col md={5}>
              <Form.Group className="text-center m-3">
                {/* Cancel  button */}
                <Button id="btn-cancel" type="button" onClick={handleCancel}>
                  Cancel
                </Button>
              </Form.Group>
            </Col>
            <Col md={5}>
              {/* Submit button */}
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

export default StaffUpdate;
