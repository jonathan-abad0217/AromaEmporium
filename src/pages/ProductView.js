import React, { useState, useEffect, useContext } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { useParams, NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import UserContext from "../UserContext";

export default function ProductView() {
  const { user } = useContext(UserContext);

  const { productId } = useParams();

  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: 0,
    imageUrl: "",
    quantity: 0,
  });

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/e-commerce/products/${productId}`)
      .then((response) => response.json())
      .then((data) => {
        setProductData(data);
      });
  }, [productId]);

  const handleAddToCart = async () => {
    try {
      if (!user.id) {
        window.location.href = "/login";
        return;
      }

      const cartResponse = await fetch(
        `${process.env.REACT_APP_API_URL}/e-commerce/cart/view`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const cartData = await cartResponse.json();

      // If the user doesn't have a cart, create one
      if (!cartData.userCart) {
        const createCartResponse = await fetch(
          `${process.env.REACT_APP_API_URL}/e-commerce/cart/addToCart`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify([]),
          }
        );
        const newCartData = await createCartResponse.json();
        cartData.userCart = newCartData.userCart;
      }

      let updatedQuantity;

      // Find the product in the user's cart (if it exists)
      const existingProduct = cartData.userCart.products.find(
        (product) => product.productId === productId
      );

      if (existingProduct) {
        // If the product already exists in the cart, increase its quantity
        updatedQuantity = existingProduct.quantity + 1;
      } else {
        // If the product does not exist in the cart, set initial quantity to 1
        updatedQuantity = 1;
      }

      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/e-commerce/cart/addToCart`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify([
            {
              productId: productId,
              quantity: updatedQuantity,
            },
          ]),
        }
      );

      if (response.ok) {
        setProductData((prevProductData) => ({
          ...prevProductData,
          quantity: updatedQuantity,
        }));
        Swal.fire({
          title: "Added to cart",
          icon: "success",
        });
      } else {
        console.error("Failed to add to cart");
        Swal.fire({
          title: "Failed to add to cart",
          icon: "error",
        });
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  return (
    <Row>
      <Col md={8} className="product-view-col1">
        <img
          src={productData.imageUrl}
          alt={productData.name}
          className="product-view-image"
        ></img>
      </Col>
      <Col md={4} className="product-view-col2">
        <div className="product-view-details">
          <h2>{productData.name}</h2>
          <p className="product-view-price">₱{productData.price}</p>
          <p className="product-view-description">{productData.description}</p>
          {user.id !== null ? (
            <div>
              <button className="product-view-button" onClick={handleAddToCart}>
                Add to Cart
              </button>
            </div>
          ) : (
            <Button
              className="product-view-button-login"
              as={NavLink}
              to="/login"
            >
              Login to Add to Cart
            </Button>
          )}
        </div>
      </Col>
    </Row>
  );
}
