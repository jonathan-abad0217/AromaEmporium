import React, { useContext, useEffect, useState } from "react";
import UserContext from "../UserContext";
import { Row, Col, Table } from "react-bootstrap";

export default function AdminOrder() {
  const { user } = useContext(UserContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrder();
  }, []);

  const fetchOrder = () => {
    fetch(`${process.env.REACT_APP_API_URL}/e-commerce/allOrder`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setOrders(data);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      });
  };

  return (
    <>
      <Row>
        <Col>
          <h3 className="text-center mt-4">Orders of Users</h3>
          <Table striped bordered hover responsive>
            <thead>
              <tr className="text-center">
                <th>User Name</th>
                <th>Order ID</th>
                <th>Product Details</th>
                <th>Quantity</th>
                <th>Total Amount</th>
                <th>Purchased On</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order.userName}</td>
                  <td>{order._id}</td>
                  <td>
                    {order.products.map((product, index) => (
                      <div key={product.productId}>
                        <p>{product.productName}</p>
                        {index !== order.products.length - 1 && <p>---</p>}
                      </div>
                    ))}
                  </td>
                  <td>
                    {order.products.map((product, index) => (
                      <div key={product.productId}>
                        <p>{product.quantity}</p>
                        {index !== order.products.length - 1 && <p>---</p>}
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
    </>
  );
}
