import React, { useEffect, useState, useContext } from "react";
import AdminView from "../components/AdminView.js";
import UserView from "../components/UserView.js";
import UserContext from "../UserContext.js";
import ProductSearch from "../components/ProductSearch";
export default function Courses() {
  const { user } = useContext(UserContext);
  const [products, setProducts] = useState([]);

  const fetchData = () => {
    fetch(`${process.env.REACT_APP_API_URL}/e-commerce/products/all`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setProducts(data);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      {user.isAdmin === true ? (
        <AdminView productsData={products} fetchData={fetchData} />
      ) : (
        <>
          <ProductSearch />
          <UserView productsData={products} />
        </>
      )}
    </div>
  );
}
