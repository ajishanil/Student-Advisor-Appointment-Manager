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
import { useNavigate } from "react-router-dom";

// Importing add notes api
import { addNote } from "../../api";

function AddNote() {
  // defining the state of the component
  const [subject, setSubject] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [file, setFile] = useState(null);
  const [note, setNote] = useState("");
  const [isConfedential, setIsConfedential ] = useState("");
  const student_id = sessionStorage.getItem("Id");
  const advisor_id = sessionStorage.getItem("AdvisorId");

  const [validated, setValidated] = useState(false);

  // useNavigate allows to navigate to other views
  const navigate = useNavigate();

  // Submit handle to add notes data
  const handleSubmit = (e) => {
    const form = e.currentTarget;

    // if all feilds are valid then the form will be submitted
    if (form.checkValidity() === true) {
      e.preventDefault();

      // defining the data to be sent to the api
      const formData = new FormData();
      formData.append("student_id", student_id);
      formData.append("subject", subject);
      formData.append("type", category);
      formData.append("date_occur", date);
      formData.append("attachmentFile", file);
      formData.append("content", note);
      formData.append("advisor_id", advisor_id);
      formData.append("create_by", advisor_id);
      formData.append("isConfedential", isConfedential);

      // calling the add notes api
      addNote(formData)
        .then((res) => {
          // if the response is successfull then navigate to the notes page
          alert("Note added successfully");
          navigate("/home/student-notes");
        })
        .catch((err) => {
          // if the response is not successfull then show the error
          alert("Note not added");
        });
    } else {
      e.preventDefault();
      e.stopPropagation();
    }

    setValidated(true);
  };

  // Cancel handle to handle cancellation of form and navigate back to notes page
  const handleCancel = (e) => {
    e.preventDefault();
    navigate("/home/student-notes");
  };

  return (
    <div>
      {/* Header */}
      <h2 className="text-center mt-4">Add Note</h2>

      {/* add note form */}
      <Container>
        <Form
          className="m-3"
          noValidate
          validated={validated}
          onSubmit={handleSubmit}
        >
          {/* Subject Field */}
          <Row className="align-items-center justify-content-center gx-4">
            <Col>
              <FormGroup className="mb-3">
                <FormLabel>Subject:</FormLabel>
                <FormControl
                  type="text"
                  size="sm"
                  placeholder="Enter Subject"
                  required
                  onChange={(e) => setSubject(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Please Enter a valid Subject.
                </Form.Control.Feedback>
              </FormGroup>
            </Col>
          </Row>
          <Row className="justify-content-center gx-5">
            {/* Category Field */}
            <Col>
              <FormGroup className="mb-3">
                <FormLabel>Category:</FormLabel>
                <Form.Select
                  size="sm"
                  onChange={(e) => setCategory(e.target.value)}
                  required
                >
                  <option key={"empty"} value={""}>
                    Choose One...
                  </option>
                  <option value="APPOINTMENT">Appointment</option>
                  <option value="EMAIL">Email</option>
                  <option value="OTHERS">Others</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  Please Select a Category.
                </Form.Control.Feedback>
              </FormGroup>
            </Col>
            <Col>
              {/* Date Field */}
              <FormGroup className="mb-3">
                <FormLabel>Date:</FormLabel>
                <FormControl
                  required
                  type="date"
                  size="sm"
                  placeholder="Select the Date"
                  onChange={(e) => setDate(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Please select a date.
                </Form.Control.Feedback>
              </FormGroup>
            </Col>
          </Row>
          <Row className="align-items-center justify-content-center gx-4">
            {/* File Upload field */}
            <Col>
              <FormGroup className="mb-3">
                <FormLabel>Upload a file:</FormLabel>
                <FormControl
                  type="file"
                  size="sm"
                  accept=".pdf, .doc, .docx, .jpg, .png"
                  key="attachmentFile"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row className="justify-content-center gx-4">
            <Col>
              <FormGroup className="mb-3">
                <Form.Check
                  type="checkbox"
                  label="Is the file confidential?"
                  onChange={(e) => setIsConfedential(e.target.checked ? "1" : "0")}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row className="align-items-center justify-content-center gx-4">
            {/* Notes field */}
            <Col>
              <FormGroup className="mb-3">
                <FormLabel>Write a note:</FormLabel>
                <FormControl
                  as="textarea"
                  rows={10}
                  size="sm"
                  placeholder="Enter your text"
                  onChange={(e) => setNote(e.target.value)}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please enter valid Notes into text area.
                </Form.Control.Feedback>
              </FormGroup>
            </Col>
          </Row>

          <Row className="justify-content-center gx-4">
            {/* cancel button */}
            <Col md={5}>
              <Form.Group className="text-center m-3">
                <Button id="btn-cancel" type="button" onClick={handleCancel}>
                  Cancel
                </Button>
              </Form.Group>
            </Col>
            <Col md={5}>
              {/* Submit Button */}
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

export default AddNote;
