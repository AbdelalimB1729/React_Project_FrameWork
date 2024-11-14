import React from 'react';
import { Container, Row, Col, Image, Card, Button, Badge } from 'react-bootstrap';
import { FaRegLightbulb, FaBookReader, FaShippingFast, FaUsers } from 'react-icons/fa';

function About() {
  return (
    <Container className="py-5 text-light" style={{ backgroundColor: '#f8f9fa' }}>
      <Row className="text-center mb-5">
        <Col>
          <h1 className="display-4 fw-bold text-dark">About Us</h1>
          <p className="lead text-secondary">Discover our story, mission, and why we’re the choice for book lovers.</p>
        </Col>
      </Row>

      
      <section className="mb-5">
        <h2 className="text-center display-6 text-dark">
          Our Mission <Badge bg="dark">Passion for Books</Badge>
        </h2>
        <p className="text-center fs-5 text-muted">
          At Online Book Store, we believe reading should be accessible and enjoyable for everyone. Our mission is to create a platform where readers can discover and fall in love with books of all genres.
        </p>
      </section>

      
      <section className="mb-5">
        <h2 className="text-center display-6 text-dark">Our Story</h2>
        <Row className="align-items-center text-center">
          <Col md={6} className="px-4">
            <Image src={`${process.env.PUBLIC_URL}/Icon/Books_icon.png`} fluid rounded className="shadow" />
          </Col>
          <Col md={6}>
            <p className="fs-5 text-muted">
              Founded in 2021 by passionate readers, Online Book Store began as a small initiative. Today, we serve a global community of readers, offering a curated selection of books for every taste.
            </p>
            <p className="fs-5 text-muted">
              Our journey is fueled by a love for stories that inspire, entertain, and transform lives. Join us as we bring joy to readers worldwide.
            </p>
          </Col>
        </Row>
      </section>

      
      <section className="mb-5">
        <h2 className="text-center display-6 text-dark">Why Choose Us</h2>
        <Row className="text-center mt-4">
          <Col md={3}>
            <FaBookReader size={50} className="mb-3 text-dark" />
            <h5>Vast Selection</h5>
            <p className="text-muted">Books across all genres.</p>
          </Col>
          <Col md={3}>
            <FaShippingFast size={50} className="mb-3 text-dark" />
            <h5>Reliable Delivery</h5>
            <p className="text-muted">Fast, secure shipping.</p>
          </Col>
          <Col md={3}>
            <FaRegLightbulb size={50} className="mb-3 text-dark" />
            <h5>Affordable Prices</h5>
            <p className="text-muted">Competitive prices & discounts.</p>
          </Col>
          <Col md={3}>
            <FaUsers size={50} className="mb-3 text-dark" />
            <h5>Community</h5>
            <p className="text-muted">Join our book-loving community.</p>
          </Col>
        </Row>
      </section>

      
      <section className="mb-5">
        <h2 className="text-center display-6 text-dark">Our Collection</h2>
        <Row className="justify-content-center mt-4">
          {[1, 2, 3, 4, 5, 6].map((index) => (
            <Col md={4} lg={3} className="mb-4" key={index}>
              <Card className="shadow-sm border-0 bg-light hover-zoom" style={{ color: '#333' }}>
                <Card.Img
                  variant="top"
                  src={`${process.env.PUBLIC_URL}/BooksImages/${index}.webp`}
                  alt={`Book Cover ${index}`}
                  className="rounded-top img-unified"
                />
                <Card.Body>
                  <Card.Title className="fw-bold text-dark">Book Title {index}</Card.Title>
                  <Card.Text className="text-muted">An intriguing synopsis of the book goes here.</Card.Text>
                  <Button variant="outline-dark" size="sm">Learn More</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </section>

      
      <section className="mb-5">
        <h2 className="text-center display-6 text-dark">Our Founders</h2>
        <Row className="justify-content-center mt-4">
          <Col md={4} lg={3} className="text-center mb-4">
            <Image
              src={`${process.env.PUBLIC_URL}/FoundersImages/Abdelalim.jpg`}
              alt="Founder 1"
              fluid
              roundedCircle
              className="shadow-sm mb-3"
              style={{ width: '150px', height: '150px' }}
            />
            <h5 className="mt-2 fw-bold text-dark">Bini Abdelalim</h5>
            <p className="text-muted">Co-Founder & CEO</p>
          </Col>
          <Col md={4} lg={3} className="text-center mb-4">
            <Image
              src={`${process.env.PUBLIC_URL}/FoundersImages/Bahae.jpg`}
              alt="Founder 2"
              fluid
              roundedCircle
              className="shadow-sm mb-3"
              style={{ width: '150px', height: '150px' }}
            />
            <h5 className="mt-2 fw-bold text-dark">Bahae Eddine Tayab</h5>
            <p className="text-muted">Co-Founder & COO</p>
          </Col>
        </Row>
      </section>
    </Container>
  );
}

export default About;
