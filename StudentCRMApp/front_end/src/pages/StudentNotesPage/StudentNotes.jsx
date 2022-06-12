import { Form, Accordion, Row, Col, Button, Container } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/styles/StudentNotes.css";
import { getNotes } from "../../api/index";
import { archiveNote } from "../../api/index";

function StudentNotes() {
  // define a variable to navigate to other pages
  const navigate = useNavigate();

  // define a state variable to track the student
  const [list, setList] = useState([]);

  useEffect(() => {
    // api call to get notes by id
    getNotes(sessionStorage.getItem("Id"))
      .then((response) => {
        // set the student state
        setList(response.data.data);
      })
      .catch((e) => {
        alert(e.response.data.message);
      });
  }, []);

  // event onClick add note button
  const handleAddNote = (e) => {
    e.preventDefault();
    navigate("/home/student-addnote");
  };

  // event onClick Archive button
  const handleArchive = (id) => {
    if (window.confirm("Are you sure you want to archive this note?")) {
    archiveNote(id)
      .then((response) => {
        alert("Note Archived Successfully");
        window.location.reload();
      })
      .catch((e) => {
        alert(e.response.data.message);
      });
    };
  }

  return (
    <div>
      <Form>
        <Form.Group className="text-center">
          <Button
            id="btn-submit"
            className="buttons"
            type="button"
            hidden={sessionStorage.getItem("isDel") === "1" ? true : false}
            onClick={handleAddNote}
          >
            Add Note
          </Button>
        </Form.Group>
      </Form>
      <hr className="mt-5" />
      <h3 className="text-center mt-4">List of Notes</h3>
      <Container>
        <div className="m-4">
          <Accordion>
            {list.map((item, index) => (
              <Accordion.Item eventKey={index}>
                <Accordion.Header>
                  <Container>
                    <Row>
                      <Col md={6}>{item.subject}</Col>
                      <Col md={3}>{item.category}</Col>
                      <Col md={3}>{item.date_occur}</Col>
                    </Row>
                  </Container>
                </Accordion.Header>
                <Accordion.Body>
                  <Row>
                    <Col md={10} className="disabled"><p>Note:</p></Col>
                    <Col md={2} className="disabled"><p>Created By: {item.name}</p></Col>
                  </Row>
                  <Row>
                  <p>{item.content}</p>
                  </Row>
                  <Container>
                    <Row>
                      <Col  md={11} className={sessionStorage.getItem("Role") !== "1" && item.isConfedential ? "disabled" : "file" }>{item.fileName}</Col>
                      <Col  md={1}>
                        <span
                          className="material-icons delete"
                          style={{ color: "red" }}
                          onClick={() => {
                            handleArchive(item.id);
                          }}
                        >
                          delete
                        </span>
                      </Col>
                    </Row>
                  </Container>
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </div>
      </Container>
    </div>
  );
}

export default StudentNotes;
