// Importing bootstrap components for the view
import { Modal, Form, Button } from "react-bootstrap";

// importing react hooks.
// The useState allows to track state of a component.
import { useState } from "react";

// importing useNavigate to navigate to routes
import { useNavigate, useLocation } from "react-router-dom";

import { resetPassword } from "../../api/index";

// Reset Password function
export default function ResetPassword() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    navigate("/staff/info");
  };
  const handleShow = () => setShow(true);

  // defining the state of the component
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // useLocation to get the params from staff info page
  const { state } = useLocation();
  const email = state.email;

  // event handler to handle the submit of the form
  const handleSave = () => {
    if (password === confirmPassword) {
      resetPassword({
        email: email,
        old_password: "",
        new_password: password,
        type: "RESET",
      })
        .then((response) => {
          setShow(false);
          alert("Password Changed Successfully");
          navigate("/staff/info");
        })
        .catch((e) => {
          alert("Password not Changed");
        });
    }
  };

  return (
    <div>
      {/* Using Bootstrap Modal component so that it overlays
           over everything else in the document and remove scroll from the <body> so 
           that modal content scrolls instead. */}
      <Modal show={handleShow} onHide={handleClose} centered>
        {/* Modal Header */}
        <Modal.Header closeButton>
          <Modal.Title>Reset Staff Password</Modal.Title>
        </Modal.Header>

        {/* Modal Body */}
        <Modal.Body>
          {/* Modal content defined by bootstrap body */}
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                required
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
              <Form.Label>Confirm New Password</Form.Label>
              <Form.Control
                type="password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            id="btn-archive"
            type="button"
            className="m-3"
            onClick={handleClose}
          >
            Close
          </Button>
          <Button
            id="btn-cancel"
            type="button"
            className="m-3"
            onClick={handleSave}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
