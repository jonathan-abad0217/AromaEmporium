import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

export default function AddProductModal({
  show,
  handleClose,
  addProduct,
  fetchData,
}) {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productImageUrl, setProductImageUrl] = useState("");

  const handleSubmit = () => {
    if (
      !productName ||
      !productDescription ||
      !productPrice ||
      !productImageUrl
    ) {
      return;
    }

    const newProduct = {
      name: productName,
      description: productDescription,
      price: parseFloat(productPrice),
      imageUrl: productImageUrl,
    };

    addProduct(newProduct);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Product Description</Form.Label>
            <Form.Control
              type="text"
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Product Price</Form.Label>
            <Form.Control
              type="number"
              step="0.01"
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Product Image URL</Form.Label>
            <Form.Control
              type="text"
              value={productImageUrl}
              onChange={(e) => setProductImageUrl(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Add Product
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
