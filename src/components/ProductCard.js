import { Card, Col } from "react-bootstrap";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  const { name, price, _id, imageUrl } = product;

  return (
    <Col md={3}>
      <Card className="text-left custom-card">
        <Card.Img
          variant="top"
          src={imageUrl}
          alt={name}
          className="product-img"
        />
        <Card.Body>
          <Card.Title>{name}</Card.Title>

          <Card.Subtitle>₱{price}</Card.Subtitle>

          <Link className="btn btn-secondary mt-2" to={`/products/${_id}`}>
            Details
          </Link>
        </Card.Body>
      </Card>
    </Col>
  );
}

// PropTypes is used for validating the data from the props
ProductCard.propTypes = {
  course: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }),
};
