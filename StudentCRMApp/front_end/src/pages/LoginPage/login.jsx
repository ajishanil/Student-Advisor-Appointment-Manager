import "../../assets/styles/login.css";
import { Form, Button, Container } from "react-bootstrap";
import { useState } from "react";
import { login } from "../../api/index";
import { Navigate, useNavigate } from "react-router-dom";

function Login() {
  // defining the state of the component
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isValidated, setIsValidated] = useState(true);
  const [err, setErr] = useState(false);

  const navigate = useNavigate();

  // event handler for login button
  const submitHandle = (event) => {
    event.preventDefault();

    // if email is empty change validation class
    if (email === "") {
      setIsValidated(false);
      return;
    }

    // if password is empty change validation class
    if (password === "") {
      setIsValidated(false);
      return;
    }

    login({
      username: email,
      password: password,
    })
      .then((response) => {
        navigate("/home");
        // store the user id in session storage
        sessionStorage.setItem("AdvisorId", response.data.data.id);
        // store the user name in session storage
        sessionStorage.setItem("Name", response.data.data.first_name);
        // store the user role in session storage
        sessionStorage.setItem("Role", response.data.data.role_id);
      })
      .catch((e) => {
        setErr(true);
      });
  };

  return (
    //login form
    <div id="loginForm">
      <Container
        className="d-flex flex-row align-items-center justify-content-end"
        style={{ minHeight: "100vh" }}
      >
        <Form
          id="form"
          className={isValidated ? "needs-validated" : "was-validated"}
        >
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <span className={err ? "d-block text-danger h6" : "d-none"}>
              Invalid email or password
            </span>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              className="input "
              type="email"
              placeholder="Enter Email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              className="input"
              type="password"
              placeholder="Enter Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="text-center">
            <Button id="btn-submit" type="submit" onClick={submitHandle}>
              LOGIN
            </Button>
          </Form.Group>
        </Form>
      </Container>
    </div>
  );
}

export default Login;
