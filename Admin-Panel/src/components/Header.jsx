// src/components/Header.jsx
import React from 'react';
import { Navbar, Nav, Container, Button, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../styles/Header.css'; // Updated path

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
          <Nav className="ms-auto">
            {/* Navbar Links */}
            <Nav.Link as={Link} to="/" className="text-light mx-2 nav-link">
              Home
            </Nav.Link>

            {/* Categories Dropdown */}
            <Dropdown as={Nav.Item} className="mx-2">
              <Dropdown.Toggle variant="link" className="text-light nav-link" id="dropdown-categories">
                Categories
              </Dropdown.Toggle>

              <Dropdown.Menu className="dropdown-menu-dark">
                {/* Add category links */}
                <Dropdown.Item as={Link} to="/category/1">Electronics</Dropdown.Item>
                <Dropdown.Item as={Link} to="/category/2">Clothing</Dropdown.Item>
                <Dropdown.Item as={Link} to="/category/3">Home Appliances</Dropdown.Item>
                <Dropdown.Item as={Link} to="/category/4">Books</Dropdown.Item>
                <Dropdown.Item as={Link} to="/category/5">Beauty Products</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Nav.Link as={Link} to="/products" className="text-light mx-2 nav-link">
              All Products
            </Nav.Link>

            <Nav.Link as={Link} to="/about" className="text-light mx-2 nav-link">
              About Us
            </Nav.Link>
            <Nav.Link as={Link} to="/add-product" className="text-light mx-2 nav-link">
              Add Product
            </Nav.Link>

            <Nav.Link as={Link} to="/all-product" className="text-light mx-2 nav-link">
              All Product details
            </Nav.Link>
          </Nav>

          {/* Admin Dashboard Link and Shop Button */}
          <Nav className="ms-auto d-flex align-items-center">
            <Button variant="outline-light" className="fw-bold mx-2 shop-button">
              Shop Now
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
