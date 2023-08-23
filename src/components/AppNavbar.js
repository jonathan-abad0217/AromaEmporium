import { useContext } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UserContext from "../UserContext";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import AddProductModal from "./AddProductModal";
import Swal from "sweetalert2";
import { useState } from "react";

export default function AppNavbar() {
  const { user } = useContext(UserContext);
  const [showAddModal, setShowAddModal] = useState(false);

  console.log(user);

  const addProduct = async (newProduct) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/e-commerce/products/add`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(newProduct),
        }
      );

      if (response.ok) {
        Swal.fire({
          title: "Product Added",
          icon: "success",
        });
      } else {
        Swal.fire({
          title: "Unsuccessful Product Creation",
          icon: "error",
          text: "Please try again",
        });
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <Navbar className="navBar" expand="lg">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Navbar.Brand href="/" className="ms-auto ">
          <h2 className="ml-3">AromaEmporium</h2>
        </Navbar.Brand>

        <Nav className="ml-auto">
          <Nav.Link as={NavLink} to="/" className="custom-margin">
            Home
          </Nav.Link>
          <Nav.Link as={NavLink} to="/products">
            Shop
          </Nav.Link>
          {user.id !== null ? (
            user.isAdmin ? (
              <>
                <Nav.Link onClick={() => setShowAddModal(true)}>
                  Add Product
                </Nav.Link>
                <Nav.Link as={NavLink} to="/orders">
                  Orders
                </Nav.Link>
                <Nav.Link as={NavLink} to="/logout" className="mr-2">
                  Logout
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={NavLink} to="/profile">
                  Profile
                </Nav.Link>
                <Nav.Link as={NavLink} to="/logout">
                  Logout
                </Nav.Link>
                <Nav.Link as={NavLink} to="/cart" className="mr-2">
                  <FontAwesomeIcon
                    icon={faShoppingCart}
                    className="custom-margin1"
                  />
                </Nav.Link>
              </>
            )
          ) : (
            <>
              <Nav.Link as={NavLink} to="/login">
                Login
              </Nav.Link>
              <Nav.Link as={NavLink} to="/register" className="mr-2">
                Register
              </Nav.Link>
            </>
          )}

          <AddProductModal
            show={showAddModal}
            handleClose={() => setShowAddModal(false)}
            addProduct={addProduct}
          />
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
