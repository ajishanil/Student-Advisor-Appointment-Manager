// Importing bootstrap components for the view
import {
  Col,
  Container,
  FormControl,
  FormGroup,
  Form,
  Row,
  Button,
} from "react-bootstrap";

import { archiveStaff, getStaffById } from "../../api/index";

// importing react hooks.
// The useState allows to track state of a component.
import { useEffect, useState } from "react";

// importing useNavigate to navigate to routes
import { useNavigate } from "react-router-dom";

function StaffInfo() {
  const [staff, setStaff] = useState({});

  useEffect(() => {
    getStaffById(sessionStorage.getItem("Id"))
      .then((res) => {
        setStaff(res.data.data);
        localStorage.setItem("staff", staff);
      })
      .catch((e) => {
        alert(e.response.data.message);
      });
  }, {});

  // define a variable to navigate to other pages
  const navigate = useNavigate();

  // event onClick Archive button
  const handleArchive = (event) => {
    if (window.confirm("Are you sure you want to archive this Member?")) {
      archiveStaff(sessionStorage.getItem("Id"))
        .then((response) => {
          alert("Staff Archived Successfully");
          navigate("/staff");
        })
        .catch((e) => {
          alert("Staff not Archived");
        });
    }
  };

  // event onClick Update button
  const handleUpdate = (event) => {
    navigate("/staff/update", {
      state: {
        staff: staff,
      },
    });
  };

  // event onClick Reset Password button
  const handleResetPassword = (event) => {
    navigate("/staff/resetpassword", {
      state: {
        email: staff.email,
      },
    });
  };

  const handleUpdatePassword = (event) => {
    navigate("/staff/updatepassword", {
      state: {
        email: staff.email,
      },
    });
  };

  return (
    <div>
      <h2 className="text-center mt-3 mb-5">Personal Information</h2>
      <Container>
        <Row className="justify-content-center gx-4">
          <Col md={10}>
            <FormGroup className="mb-3">
              <Form.Check
                type="checkbox"
                label="Admin"
                checked={staff.role === "admin"}
                disabled
              />
            </FormGroup>
          </Col>
        </Row>
        <Row className="justify-content-center mb-3 gx-4">
          <Col md={5}>
            <h6>First Name</h6>
            <FormControl
              size="sm"
              style={{ backgroundColor: "white" }}
              value={staff.first_name}
              disabled
            />
          </Col>
          <Col md={5}>
            <h6>Last Name</h6>
            <FormControl
              size="sm"
              style={{ backgroundColor: "white" }}
              value={staff.last_name}
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
              value={staff.email}
              disabled
            />
          </Col>
          <Col md={5}>
            <h6>Phone Number</h6>
            <FormControl
              size="sm"
              style={{ backgroundColor: "white" }}
              value={staff.phone_num}
              disabled
            />
          </Col>
        </Row>
        <Row className="justify-content-center mb-3 gx-4">
          <Col md={5}>
            <h6>Campus</h6>
            <FormControl
              size="sm"
              style={{ backgroundColor: "white" }}
              value={staff.campus}
              disabled
            />
          </Col>
          <Col md={5}>
            <h6>Date Of Birth</h6>
            <FormControl
              size="sm"
              style={{ backgroundColor: "white" }}
              value={staff.date_birth}
              disabled
            />
          </Col>
        </Row>
        <Row className="justify-content-center mb-3 gx-4">
          <Col md={5}>
            <h6>Licensed</h6>
            <FormControl
              size="sm"
              style={{ backgroundColor: "white" }}
              value={staff.license_type}
              disabled
            />
          </Col>
          <Col md={5}>
            <h6>License Number</h6>
            <FormControl
              size="sm"
              style={{ backgroundColor: "white" }}
              value={staff.license_Number}
              disabled
            />
          </Col>
        </Row>
        <Row className="btns justify-content-center text-center mt-5 mb-3 gx-4">
          {sessionStorage.getItem("Role") == 1 ? (
            <Col md={4}>
              <Button
                id="btn-archive"
                type="button"
                className="m-3"
                onClick={handleArchive}
              >
                Archive
              </Button>
            </Col>
          ) : null}

          {/* Choose button based on admin role */}

          <Col md={4}>
            {window.location.pathname === "/staff/profile" ? (
              <Button
                id="btn-submit"
                type="submit"
                className="m-3 buttons"
                onClick={handleUpdatePassword}
              >
                Update Password
              </Button>
            ) : sessionStorage.getItem("Role") == 1 ? (
              <Button
                id="btn-submit"
                type="submit"
                className="m-3 buttons"
                onClick={handleResetPassword}
              >
                Reset Password
              </Button>
            ) : null}
          </Col>

          {sessionStorage.getItem("Role") == 1 ||
          window.location.pathname === "/staff/profile" ? (
            <Col md={4}>
              <Button
                id="btn-submit"
                type="submit"
                className="m-3"
                onClick={handleUpdate}
              >
                Update
              </Button>
            </Col>
          ) : null}
        </Row>
      </Container>
    </div>
  );
}

export default StaffInfo;
