import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

function Header() {
   const navigate = useNavigate();

   const handleLogout = () => {
      console.log("User logged out");
      navigate('/auth'); 
   };

   return (
      <header>
         <Navbar bg="dark" variant="dark" expand="lg" sticky="top" className="shadow-sm">
            <Container>
               <Navbar.Brand as={Link} to="/">Online Book Store</Navbar.Brand>
               <Navbar.Toggle aria-controls="basic-navbar-nav" />
               <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="me-auto">
                     <Nav.Link as={Link} to="/">Home</Nav.Link>
                     <Nav.Link as={Link} to="/Books">Books</Nav.Link>
                     <Nav.Link as={Link} to="/about">About Us</Nav.Link>
                     <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
                     <Nav.Link as={Link} to="/auth">LogIn/Register</Nav.Link>
                  </Nav>
                  <Nav>
                     <NavDropdown title="User" id="user-nav-dropdown" align="end">
                        <NavDropdown.Item as={Link} to="/profile">Profile</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                     </NavDropdown>
                  </Nav>
               </Navbar.Collapse>
            </Container>
         </Navbar>
      </header>
   );
}

export default Header;
