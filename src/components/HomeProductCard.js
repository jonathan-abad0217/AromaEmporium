import { Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
export default function HomeProductCard({ product }) {
  const { name, price, _id, imageUrl } = product;

  return (
    <>
      <Col className="pt-3" md={4} border="dark">
        <Card className="product-card">
          <Card.Img
            variant="top"
            src={imageUrl}
            alt={name}
            className="best-seller-img"
          />
          <Card.Body>
            <Card.Title>
              <Link to={`/products/${_id}`} className="product-card-title">
                {name}
              </Link>
            </Card.Title>
            <Card.Subtitle>₱{price}</Card.Subtitle>
          </Card.Body>
        </Card>
      </Col>
    </>
  );
}
