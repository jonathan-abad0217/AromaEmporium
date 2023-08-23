import React from "react";
import { Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Highlights(props) {
  const { data } = props;

  const { _id, name, price, imageUrl } = data;

  return (
    <Col>
      <div className="mb-2 featured-container">
        <img src={imageUrl} alt={name} className="featured-img" />
        <Card.Title>
          <Link to={`/products/${_id}`} className="featured-title">
            {name}
          </Link>
        </Card.Title>
        <Card.Subtitle className="featured-price">₱{price} </Card.Subtitle>
      </div>
    </Col>
  );
}
