import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../styles/Header.css';

const Header = () => {
  return (
    <Navbar expand="lg" bg="dark" variant="dark" className="py-3 shadow-sm w-100">
      <Container>
        {/* Logo */}
        <Navbar.Brand as={Link} to="/" className="fw-bold fs-4 text-primary logo">
          DealMates
        </Navbar.Brand>

        {/* Navbar Toggle for Mobile View */}
        <Navbar.Toggle aria-controls="navbar-nav" />

        {/* Collapsible Navbar */}
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto align-items-center">
            {/* Navbar Links */}
            <Nav.Link as={Link} to="/" className="text-light mx-3 nav-link">
              Home
            </Nav.Link>

            <Nav.Link as={Link} to="/products" className="text-light mx-3 nav-link">
              Products
            </Nav.Link>

            <Nav.Link as={Link} to="/about" className="text-light mx-3 nav-link">
              About Us
            </Nav.Link>

            <Nav.Link as={Link} to="/contact" className="text-light mx-3 nav-link">
              Contact
            </Nav.Link>

            {/* Custom Button for Promotions */}
            <Button variant="primary" className="fw-bold mx-3">
              Explore Deals
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
