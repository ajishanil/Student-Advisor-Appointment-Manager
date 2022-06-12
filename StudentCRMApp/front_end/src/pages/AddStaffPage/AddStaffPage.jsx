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

// Importing add staff api
import { addStaff } from "../../api/index";

// Styles for this page
import "../../assets/styles/AddStaff.css";

function AddStaff() {
  // useNavigate allows to navigate to other views
  const navigate = useNavigate();

  const [validated, setValidated] = useState(false);

  // defined the state for all inputs
  const [admin, setStaffAdmin] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [campus, setCampus] = useState("");
  const [dob, setDob] = useState("");
  const [license, setLicense] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");

  // event onClick Cancel button
  const cancelHandle = (event) => {
    event.preventDefault();
    navigate("/staff");
  };

  // event to check if the password and confirm password are same
  const handlePassword = () => {
    if (password === confirmPassword) {
      return true;
    } else {
      return false;
    }
  };

  // event onClick Save button
  const submitHandle = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === true) {
      if (!handlePassword()) {
        alert("Passwords do not match");
        return false;
      } else {
        // api call to save staff
        addStaff({
          role: admin,
          first_name: firstName,
          last_name: lastName,
          email: email,
          phone_num: phone,
          date_birth: dob,
          campus: campus,
          license_type: license,
          license_number: licenseNumber,
          password: password,
          create_by: sessionStorage.getItem("AdvisorId"),
        })
          .then((response) => {
            alert("Staff Added Successfully");
            navigate("/staff");
          })
          .catch((e) => {
            alert(e.response.data.error);
          });
      }
    } else {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  return (
    <div>
      {/*Heading for the page  */}
      <h2 className="text-center m-4">Add New Member</h2>
      <br />
      <br />
      <Container>
        {/* Form with validation */}
        <Form noValidate validated={validated} onSubmit={submitHandle}>
          <Row className="justify-content-center gx-4">
            <Col md={10}>
              {/* Check box for admin */}
              <FormGroup className="mb-3">
                <Form.Check
                  type="checkbox"
                  label="Admin"
                  onChange={(e) =>
                    setStaffAdmin(e.target.checked ? "admin" : "")
                  }
                />
              </FormGroup>
            </Col>
          </Row>
          <Row className="justify-content-center gx-4">
            <Col md={5}>
              {/* First Name field */}
              <FormGroup className="mb-3">
                <FormLabel>First Name:</FormLabel>
                <FormControl
                  type="text"
                  required
                  size="sm"
                  placeholder=""
                  onChange={(e) => setFirstName(e.target.value)}
                />
                {/* Form validation for name field */}
                <Form.Control.Feedback type="invalid">
                  Please provide a first name
                </Form.Control.Feedback>
              </FormGroup>
            </Col>
            <Col md={5}>
              {/* Last Name field */}
              <FormGroup className="mb-3">
                <FormLabel>Last Name:</FormLabel>
                <FormControl
                  type="text"
                  required
                  size="sm"
                  placeholder=""
                  onChange={(e) => setLastName(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a last name
                </Form.Control.Feedback>
              </FormGroup>
            </Col>
          </Row>
          <Row className="justify-content-center gx-4">
            <Col md={5}>
              <FormGroup className="mb-3">
                {/* Email address field */}
                <FormLabel>Email Address:</FormLabel>
                <FormControl
                  type="email"
                  required
                  pattern='/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/'
                  size="sm"
                  placeholder=""
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid email.
                </Form.Control.Feedback>
              </FormGroup>
            </Col>
            <Col md={5}>
              {/* Phone Number */}
              <FormGroup className="mb-3">
                <FormLabel>Phone Number:</FormLabel>
                <FormControl
                  required
                  pattern="^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$"
                  type="text"
                  size="sm"
                  placeholder=""
                  onChange={(e) => setPhone(e.target.value)}
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
                {/* Password field  */}
                <FormLabel>Password:</FormLabel>
                <FormControl
                  type="password"
                  required
                  size="sm"
                  placeholder=""
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a password
                </Form.Control.Feedback>
              </FormGroup>
            </Col>
            <Col md={5}>
              <FormGroup className="mb-3">
                {/* confirm password field  */}
                <FormLabel>Confirm Password:</FormLabel>
                <FormControl
                  required
                  type="password"
                  size="sm"
                  placeholder=""
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Please comfirn the password
                </Form.Control.Feedback>
              </FormGroup>
            </Col>
          </Row>
          <Row className="justify-content-center gx-4">
            <Col md={5}>
              <FormGroup className="mb-3">
                {/* Campus options */}
                <FormLabel>Campus:</FormLabel>

                <Form.Select
                  required
                  as="select"
                  custom
                  size="sm"
                  onChange={(e) => setCampus(e.target.value)}
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
                <FormLabel>License Type:</FormLabel>

                <Row>
                  <Col>
                    <Form.Check
                      inline
                      type="radio"
                      label="RISIA"
                      name="group2"
                      id="radio1"
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
                <FormLabel>License Number:</FormLabel>
                <FormControl
                  required
                  type="text"
                  size="sm"
                  placeholder=""
                  onChange={(e) => setLicenseNumber(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a valid license number.
                </Form.Control.Feedback>
              </FormGroup>
            </Col>
          </Row>

          <Row className="justify-content-center gx-4">
            <Col md={5}>
              <Form.Group className="text-center m-3">
                <Button id="btn-cancel" type="button" onClick={cancelHandle}>
                  Cancel
                </Button>
              </Form.Group>
            </Col>
            <Col md={5}>
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

// Exporting add staff function to be used later
export default AddStaff;
