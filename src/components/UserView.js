import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { Row } from "react-bootstrap";

export default function UserView({ productsData }) {
  const [products, setProducts] = useState([]);

  const activeProducts = products.filter((product) => product.isActive);
  const productCards = activeProducts.map((product) => (
    <ProductCard key={product._id} product={product} />
  ));

  useEffect(() => {
    // Update the state with the productsData prop
    setProducts(productsData);
  }, [productsData]);

  return (
    <div className="mt-2">
      <Row className="mb-4">{productCards}</Row>
    </div>
  );
}
