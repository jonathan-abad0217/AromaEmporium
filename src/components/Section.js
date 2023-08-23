import { ListGroup, Row, Col, Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faTwitter,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
export default function Section() {
  return (
    <Row className="my-5">
      <Col md={5}>
        <div className="text-center section-title">
          <h1>AromaEmperium</h1>
          <h5>Sophisticated simplicity for the independent mind.</h5>
          <a
            className="d-inline mx-1 text-dark secondary-color"
            href="https://www.facebook.com/jonathan.abad.0217"
            target="_blank"
          >
            <FontAwesomeIcon icon={faFacebook} />
          </a>
          <a
            className="d-inline mx-1 text-dark secondary-color"
            href="https://www.instagram.com/a.jonathann_/"
            target="_blank"
          >
            <FontAwesomeIcon icon={faInstagram} />
          </a>
          <a
            className="d-inline mx-1 text-dark secondary-color"
            href="https://twitter.com/JayyAbad"
            target="_blank"
          >
            <FontAwesomeIcon icon={faTwitter} />
          </a>
          <a
            className="d-inline mx-1 text-dark secondary-color"
            href="https://github.com/jonathan-abad0217"
            target="_blank"
          >
            <FontAwesomeIcon icon={faGithub} />
          </a>
        </div>
      </Col>
      <Col md={2}>
        <div className="customer-service">
          <h4 className="section-cc">Customer Care</h4>
          <ListGroup variant="flush">
            <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
            <ListGroup.Item>Morbi leo risus</ListGroup.Item>
            <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
          </ListGroup>
        </div>
      </Col>
      <Col md={2} className="section2">
        <ListGroup variant="flush">
          <ListGroup.Item>Cras justo odio</ListGroup.Item>
          <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
          <ListGroup.Item>Morbi leo risus</ListGroup.Item>
        </ListGroup>
      </Col>

      <Col md={3}>
        <div>
          <h4 className="section-newsletter">Newsletter</h4>
          <h4>Please Return To</h4>
          <h6>Get notified of new products, limited releases, and more.</h6>
          <Form className="search-form ml-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="p-1"
            />
            <Button variant="outline-secondary" className="mx-2">
              Search
            </Button>
          </Form>
          <div className="cards-img"></div>
        </div>
      </Col>
    </Row>
  );
}
