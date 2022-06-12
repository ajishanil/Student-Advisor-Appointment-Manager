import { Button } from "react-bootstrap";
import "../assets/styles/SidebarButtons.css";
import { useNavigate } from "react-router-dom";

function DashboardButtons() {
  // define a variable to navigate to other pages
  const navigate = useNavigate();

  // event onClick Add Student button which will navigate to "Add Student" page
  const addStudent = (event) => {
    navigate("/home/addstudent");
  };

  // event onClick Archived button which will navigate to "Archived" page
  const archived = (event) => {
    navigate("/home/archivestudent");
  };

  return (
    <div>
      <Button
        className="buttons"
        id="btn-submit"
        type="submit"
        onClick={addStudent}
      >
        Add Students
      </Button>
      <Button
        className="buttons"
        id="btn-submit"
        type="submit"
        onClick={archived}
      >
        Archived
      </Button>
    </div>
  );
}

export default DashboardButtons;
