import { Button, Row, Col } from "react-bootstrap";
import { NavLink } from "react-router-dom";
export default function Banner() {
  return (
    <Row>
      <Col xs={12} className="p-0">
        <div className="bg-image">
          <div className="bg-overlay"></div>

          <div className="content d-flex text-center flex-column justify-content-center align-items-center vh-100">
            <h2>Experience Elegance with Fragrances at</h2>
            <h1>Aroma Emporium</h1>
            <p>Discover our captivating array of scents</p>
            <Button as={NavLink} to="/products" className="shop-now-button">
              Shop Now
            </Button>
          </div>
        </div>
      </Col>
    </Row>
  );
}
