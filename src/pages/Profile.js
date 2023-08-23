import React, { useContext, useState, useEffect } from "react";
import { Row, Col, Table, Button, Modal } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import UserContext from "../UserContext";
import UpdateProfile from "../components/UpdateProfile";
import ResetPassword from "../components/ResetPassword";

export default function Profile() {
  const { user } = useContext(UserContext);
  const [details, setDetails] = useState({});
  const [orders, setOrders] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showResetPasswordModal, setShowResetPasswordModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleShowResetPasswordModal = () => {
    setShowResetPasswordModal(true);
  };

  const handleCloseResetPasswordModal = () => {
    setShowResetPasswordModal(false);
  };
  const handleCloseResetPassword = () => {
    handleCloseResetPasswordModal();
  };

  const fetchProfileDetails = () => {
    fetch(`${process.env.REACT_APP_API_URL}/e-commerce/details`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (typeof data._id !== "undefined") {
          setDetails(data);
        }
      });
  };

  const fetchUserOrders = () => {
    fetch(`${process.env.REACT_APP_API_URL}/e-commerce/orders`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched orders data:", data);

        if (data && data.data && Array.isArray(data.data)) {
          setOrders(data.data);
        } else {
          console.error("Invalid orders data:", data);
          setOrders([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching user orders:", error);
      });
  };

  useEffect(() => {
    fetchProfileDetails();
    fetchUserOrders();
  }, []);

  console.log("Orders:", orders);

  return user.id === null ? (
    <Navigate to="/" />
  ) : (
    <>
      <Row>
        <Col md={4} className="p-5  text-dark">
          <h1 className="mt-2 mb-4">Profile</h1>
          <h2 className="mt-3">{details.name}</h2>
          <hr />
          <Row>
            <Col md={6}>
              <h4>Contacts</h4>
              <ul>
                <li>Email: {details.email}</li>
                <li>Mobile No: {details.mobileNumber}</li>
              </ul>
            </Col>
            <Col md={6}>
              {details.address && details.address.length > 0 && (
                <>
                  <h4>Address</h4>
                  <ul>
                    <li>Street Number: {details.address[0].streetNumber}</li>
                    <li>Barangay: {details.address[0].barangay}</li>
                    <li>Municipality: {details.address[0].municipality}</li>
                    <li>Province: {details.address[0].province}</li>
                  </ul>
                </>
              )}
            </Col>
            <Button
              className="profile-view-button ml-3"
              onClick={handleShowModal}
            >
              Update Profile
            </Button>
            <Button
              className="profile-view-button mt-2 ml-3"
              onClick={handleShowResetPasswordModal}
            >
              Reset Password
            </Button>
          </Row>
        </Col>

        <Col md={8} className="p-5  text-dark">
          {/* Display User's Orders */}
          {orders.length > 0 && (
            <Row className="pt-4 mt-4">
              <Col>
                <h3 className="text-center mt-2 mb-4">User's Orders</h3>
                <Table
                  striped
                  bordered
                  hover
                  responsive
                  className="text-center"
                >
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Product Name</th>
                      <th>Quantity</th>
                      <th>Total</th>
                      <th>Date & Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order._id}>
                        <td>{order._id}</td>
                        <td>
                          {order.products.map((product, index) => (
                            <div key={product.productId}>
                              <p>{product.productName}</p>
                              {index !== order.products.length - 1 && (
                                <p>---</p>
                              )}
                            </div>
                          ))}
                        </td>
                        <td>
                          {order.products.map((product, index) => (
                            <div key={product.productId}>
                              <p>{product.quantity}</p>
                              {index !== order.products.length - 1 && (
                                <p>---</p>
                              )}
                            </div>
                          ))}
                        </td>
                        <td>{order.totalAmount}</td>
                        <td>{new Date(order.purchasedOn).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Col>
            </Row>
          )}
        </Col>
      </Row>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Update Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <UpdateProfile
            onUpdate={() => {
              fetchProfileDetails();
              handleCloseModal();
            }}
            initialDetails={details}
          />
        </Modal.Body>
      </Modal>

      <Modal
        show={showResetPasswordModal}
        onHide={handleCloseResetPasswordModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>Reset Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ResetPassword onClose={handleCloseResetPassword} />
        </Modal.Body>
      </Modal>
    </>
  );
}
