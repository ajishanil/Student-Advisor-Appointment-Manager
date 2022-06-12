import { Button } from "react-bootstrap";
import "../assets/styles/StaffSideBarButtons.css";
import { useNavigate } from "react-router-dom";

function StaffHomeButtons() {
  const navigate = useNavigate();

  const addStaff = (event) => {
    navigate("/staff/addstaff");
  };

  return (
    <div>
      <Button
        className="buttons recordsButtons"
        id="btn-submit"
        type="submit"
        onClick={addStaff}
      >
       Add Member
      </Button>
     
    </div>
  );
}

export default StaffHomeButtons;
