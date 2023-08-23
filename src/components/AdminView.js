import { useState, useEffect } from "react";
import { Row, Col, Table } from "react-bootstrap";

import EditProduct from "./EditProduct";
import ArchiveProduct from "./ArchiveProduct";

export default function AdminView({ productsData, fetchData }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(productsData);
  }, [productsData]);

  const productData = products.map((product) => (
    <tr key={product._id}>
      <td>
        <img
          src={product.imageUrl}
          alt={product.name}
          className="admin-img"
        ></img>
      </td>
      <td>{product._id}</td>
      <td>{product.name}</td>
      <td>{product.description}</td>
      <td>₱{product.price}</td>
      <td>
        {product.isActive ? (
          <span className="text-success">Available</span>
        ) : (
          <span className="text-danger">Unavailable</span>
        )}
      </td>
      <td>
        <EditProduct product={product._id} fetchData={fetchData} />
      </td>
      <td>
        <ArchiveProduct
          productId={product._id}
          isActive={product.isActive}
          fetchData={fetchData}
        />
      </td>
    </tr>
  ));

  return (
    <Row>
      <Col>
        <h3 className="text-center mt-4">Admin Dashboard</h3>
        <Table striped bordered hover responsive>
          <thead>
            <tr className="text-center">
              <th>Image</th>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Availability</th>
              <th colSpan={2}>Action</th>
            </tr>
          </thead>
          <tbody>{productData}</tbody>
        </Table>
      </Col>
    </Row>
  );
}
