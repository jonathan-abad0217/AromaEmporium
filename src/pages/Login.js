import { useState, useEffect, useContext } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { Navigate, NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import UserContext from "../UserContext.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";

export default function Login() {
  const { user, setUser } = useContext(UserContext);

  // State hooks to store the values of the input fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // State to determine whether submit button is enabled or not
  const [isActive, setIsActive] = useState(true);

  function authenticate(e) {
    e.preventDefault();

    fetch(`${process.env.REACT_APP_API_URL}/e-commerce/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.access);

        if (data.access) {
          localStorage.setItem("token", data.access);

          retrieveUserDetails(data.access);

          Swal.fire({
            title: "Login successful",
            icon: "success",
            text: "Welcome to Aroma Emporium!",
          });
        } else {
          Swal.fire({
            title: "Authentication failed",
            icon: "error",
            text: "Check your login details and try again.",
          });
        }
      });
    // Clear input fields after submission
    setEmail("");
    setPassword("");
  }

  const retrieveUserDetails = (token) => {
    fetch(`${process.env.REACT_APP_API_URL}/e-commerce/details`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        setUser({
          id: data._id,
          isAdmin: data.isAdmin,
        });
      });
  };

  useEffect(() => {
    // Validation to enable submit button when all fields are populated and both passwords match
    if (email !== "" && password !== "") {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [email, password]);

  return user.id !== null ? (
    <Navigate to="/" />
  ) : (
    <div className="login-page">
      <Row>
        <Col>
          <div className="login-container text-center">
            <h2 className="text">Have an account?</h2>
            <Form onSubmit={(e) => authenticate(e)} className="login-form">
              <Form.Group controlId="userEmail">
                <Form.Control
                  type="email"
                  placeholder="Email Address"
                  className="text-left login-form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="password" className="my-3">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  className="text-left login-form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>
              {isActive ? (
                <Button
                  variant="primary"
                  className="login-button"
                  type="submit"
                  id="submitBtn"
                >
                  Submit
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="login-button"
                  id="submitBtn"
                  disabled
                >
                  Submit
                </Button>
              )}

              <Form.Group controlId="formBasicCheckbox">
                <Form.Check
                  type="checkbox"
                  label="Remember me"
                  className="remember"
                />
              </Form.Group>
              <p className="forgot-password">Forgot Password</p>
            </Form>
            <Button as={NavLink} to="/register" className="register-button">
              Register
            </Button>
            <h4 className="sign-in-with">-Or Sign In With-</h4>
            <Button className="sign-in-with-button">
              <FontAwesomeIcon icon={faGoogle} style={{ color: "red" }} />
              Google
            </Button>
            <Button className="sign-in-with-button">
              <FontAwesomeIcon icon={faFacebook} style={{ color: "blue" }} />
              Facebook
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
}
