import { Form, Button, Row, Col } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import Swal from "sweetalert2";
import UserContext from "../UserContext.js";

export default function Register() {
  const { user } = useContext(UserContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [streetNumber, setStreetNumber] = useState("");
  const [barangay, setBarangay] = useState("");
  const [municipality, setMunicipality] = useState("");
  const [province, setProvince] = useState("");
  const [isActive, setIsActive] = useState(false);

  function registerUser(event) {
    event.preventDefault();

    fetch(`${process.env.REACT_APP_API_URL}/e-commerce/checkEmail`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data === true) {
          Swal.fire({
            title: "Duplicate email found.",
            icon: "error",
            text: "Use another email to register.",
          });
        } else {
          fetch(`${process.env.REACT_APP_API_URL}/e-commerce/register`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: name,
              email: email,
              mobileNumber: mobileNumber,
              password: password,
              address: [
                {
                  streetNumber: streetNumber,
                  barangay: barangay,
                  municipality: municipality,
                  province: province,
                },
              ],
            }),
          })
            .then((response) => response.json())
            .then((result) => {
              if (result) {
                setName("");
                setEmail("");
                setMobileNumber("");
                setPassword("");
                setConfirmPassword("");
                setStreetNumber("");
                setBarangay("");
                setMunicipality("");
                setProvince("");

                Swal.fire({
                  title: "Registered Successfully",
                  icon: "success",
                  text: "Welcome to AromaEmporium!",
                });
              } else {
                Swal.fire({
                  title: "Registered Unsuccessfully",
                  icon: "error",
                  text: "Check your details and try again",
                });
              }
            });
        }
      });
  }

  useEffect(() => {
    if (
      name !== "" &&
      email !== "" &&
      mobileNumber !== "" &&
      password !== "" &&
      confirmPassword !== "" &&
      streetNumber !== "" &&
      barangay !== "" &&
      municipality !== "" &&
      province !== "" &&
      password === confirmPassword &&
      mobileNumber.length === 11
    ) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [
    name,
    email,
    mobileNumber,
    password,
    confirmPassword,
    streetNumber,
    barangay,
    municipality,
    province,
  ]);

  return user.id !== null ? (
    <Navigate to="/" />
  ) : (
    <>
      <div className="register-page ">
        <Form
          className="register-form"
          onSubmit={(event) => registerUser(event)}
        >
          <h1 className="text-center text-register">Register</h1>
          <Row className="register-container mt-2">
            <Col md={4}>
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Enter Name"
                  required
                  value={name}
                  onChange={(event) => {
                    setName(event.target.value);
                  }}
                  className="text-left register-form-control"
                />
              </Form.Group>
              <Form.Group>
                <Form.Control
                  type="email"
                  placeholder="Enter Email"
                  required
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                  className="text-left register-form-control"
                />
              </Form.Group>
              <Form.Group>
                <Form.Control
                  type="number"
                  placeholder="Enter Mobile Number"
                  required
                  value={mobileNumber}
                  onChange={(event) => {
                    setMobileNumber(event.target.value);
                  }}
                  className="text-left register-form-control"
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group>
                <Form.Control
                  type="password"
                  placeholder="Enter Password"
                  required
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                  className="text-left register-form-control"
                />
              </Form.Group>
              <Form.Group>
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  required
                  value={confirmPassword}
                  onChange={(event) => {
                    setConfirmPassword(event.target.value);
                  }}
                  className="text-left register-form-control"
                />
              </Form.Group>
            </Col>
            <Col md={5}>
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Enter Street Number"
                  required
                  value={streetNumber}
                  onChange={(event) => {
                    setStreetNumber(event.target.value);
                  }}
                  className="text-left register-form-control"
                />
              </Form.Group>
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Enter Barangay"
                  required
                  value={barangay}
                  onChange={(event) => {
                    setBarangay(event.target.value);
                  }}
                  className="text-left register-form-control"
                />
              </Form.Group>
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Enter Municipality"
                  required
                  value={municipality}
                  onChange={(event) => {
                    setMunicipality(event.target.value);
                  }}
                  className="text-left register-form-control"
                />
              </Form.Group>
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Enter Province"
                  required
                  value={province}
                  onChange={(event) => {
                    setProvince(event.target.value);
                  }}
                  className="text-left register-form-control"
                />
              </Form.Group>
            </Col>
          </Row>
          <Button
            className="register-form-button"
            type="submit"
            disabled={!isActive}
          >
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
}
