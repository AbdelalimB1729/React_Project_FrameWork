import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Footer() {
   return (
      <footer className="bg-dark text-light py-3 mt-5">
         <Container>
            <Row>
               <Col md={4}>
                  <h5>Quick Links</h5>
                  <ul className="list-unstyled">
                     <li>
                        <Link to="/" className="text-light">Home</Link>
                     </li>
                     <li>
                        <Link to="/about" className="text-light">About Us</Link>
                     </li>
                     <li>
                        <Link to="/contact" className="text-light">Contact Us</Link>
                     </li>
                     <li>
                        <Link to="/auth" className="text-light">Login / Register</Link>
                     </li>
                  </ul>
               </Col>
               <Col md={4}>
                  <h5>Contact Information</h5>
                  <p>Email: support@onlinebookstore.com</p>
                  <p>Phone: +123 456 7890</p>
               </Col>
               <Col md={4}>
                  <h5>Follow Us</h5>
                  <ul className="list-unstyled">
                     <li>Facebook</li>
                     <li>Twitter</li>
                     <li>Instagram</li>
                  </ul>
               </Col>
            </Row>
            <Row className="text-center mt-3">
               <Col>
                  <p>&copy; {new Date().getFullYear()} Online Book Store. All rights reserved.</p>
               </Col>
            </Row>
         </Container>
      </footer>
   );
}

export default Footer;
