import { Button } from "react-bootstrap";
import "../assets/styles/SidebarButtons.css";
import { useNavigate } from "react-router-dom";

function StudentRecordButtons() {
  // define a variable to navigate to other pages
  const navigate = useNavigate();

  // event onClick Student Info button which will navigate to "Student Info" page
  const studentInfo = (event) => {
    navigate("/home/student-info");
  };

  // event onClick Student Note button which will navigate to "Notes" page
  const viewNotes = (event) => {
    navigate("/home/student-notes");
  };

  // event onClick Student Files button which will navigate to "Files" page
  const viewFiles = (event) => {
    navigate("/home/student-files");
  };

  return (
    <div>
      <Button
        className="buttons recordsButtons"
        id="btn-submit"
        type="submit"
        onClick={studentInfo}
      >
        Students Info
      </Button>
      <Button
        className="buttons recordsButtons"
        id="btn-submit"
        type="submit"
        onClick={viewNotes}
      >
        Student Notes
      </Button>
      <Button
        className="buttons recordsButtons"
        id="btn-submit"
        type="submit"
        onClick={viewFiles}
      >
        Files
      </Button>
    </div>
  );
}

export default StudentRecordButtons;
