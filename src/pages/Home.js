// import { useContext } from "react";
import Banner from "../components/Banner.js";
import FeaturedProducts from "../components/FeaturedProducts.js";
import HomeProductCard from "../components/HomeProductCard.js";
import Section from "../components/Section.js";
// import UserContext from "../UserContext.js";
import { Row, Col, Carousel, Button, Container } from "react-bootstrap";
import React, { useEffect, useState } from "react";

export default function Home() {
  const [products, setProducts] = useState([]);

  const fetchData = () => {
    fetch(`${process.env.REACT_APP_API_URL}/e-commerce/products/all`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setProducts(data);
      });
  };

  const activeProducts = products.filter((product) => product.isActive);
  const productCards = activeProducts
    .slice(0, 9)
    .map((product) => <HomeProductCard key={product._id} product={product} />);
  useEffect(() => {
    fetchData();
  }, []);
  // const { user } = useContext(UserContext);
  return (
    <>
      <Row className="my-4">
        <Col md={8}>
          <Carousel nextLabel="" prevLabel="">
            <Carousel.Item>
              <div className="carousel-img1">
                <div className="carousel-content">
                  <h3 className="carousel-title">THE BEST COLLECTION</h3>
                  <h1 className=" carousel-h1">A Range of Perfume</h1>
                  <h5>
                    Use: Code <span className="discount-text">SALE15 OFF</span>
                  </h5>
                  <Button className="carousel-button">SHOP NOW</Button>
                </div>
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <div className="carousel-img2">
                <div className="carousel-content">
                  <h3 className="carousel-title">THE BEST COLLECTION</h3>
                  <h1 className=" carousel-h1">A Range of Perfume</h1>
                  <h5>
                    Use: Code <span className="discount-text">SALE15 OFF</span>
                  </h5>
                  <Button className="carousel-button">SHOP NOW</Button>
                </div>
              </div>
            </Carousel.Item>
          </Carousel>
        </Col>

        <Col md={4}>
          <Row>
            <div className="grab-yours">
              <h5 className="ml-2">Featured Products</h5>
            </div>
          </Row>
          <FeaturedProducts />
        </Col>
      </Row>

      <Banner />

      <Row className="my-3">
        <Col md={12}>
          <div className="text-center justify-content-center align-content-center">
            <h2 className="best-seller-title">BEST SELLER</h2>
            <h5>Best Seller Product This Week!</h5>
          </div>
        </Col>
        <Container>
          <Row>{productCards}</Row>
        </Container>
      </Row>
      <Section />
      <footer className="footing text-center d-flex d-inline justify-content-center d-grid gap-3 py-3">
        <div className="d-inline text-dark">AromaEmperium By Jonathan Abad</div>
        <div className="d-inline text-dark mx-3">|</div>
        <div className="d-inline text-dark">© Copyright 2023</div>
      </footer>
    </>
  );
}
