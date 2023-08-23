import "./App.css";
import { UserProvider } from "./UserContext.js";
import AppNavbar from "./components/AppNavbar.js";
import Home from "./pages/Home.js";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Register from "./pages/Register";
import Courses from "./pages/Courses";
import ProductView from "./pages/ProductView";
import Profile from "./pages/Profile.js";
import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import CartPage from "./pages/CartPage";
import AdminOrder from "./pages/AdminOrder";

function App() {
  const [user, setUser] = useState({
    id: null,
    isAdmin: null,
  });
  // Clear localstorage upon logout
  const unsetUser = () => {
    localStorage.clear();
  };

  useEffect(() => {
    console.log(user);
    console.log(localStorage);
  }, [user]);

  // to implement hot reload effecienlty
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/e-commerce/details`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        if (typeof data._id !== "undefined") {
          setUser({
            id: data._id,
            isAdmin: data.isAdmin,
          });
        } else {
          setUser({
            id: null,
            isAdmin: null,
          });
        }
      });
  }, []);

  return (
    <UserProvider value={{ user, setUser, unsetUser }}>
      <Router>
        <Container fluid>
          <AppNavbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Courses />} />
            <Route path="/products/:productId" element={<ProductView />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/orders" element={<AdminOrder />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Container>
      </Router>
    </UserProvider>
  );
}

export default App;
// Admin Credentials :
// Email: admin@email.com
// Password: admin123

// Customer Credentials :
// Email: user@email.com
// Password: user123
