import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import '../styles/ContactUs.css';

const ContactUs = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [message, setMessage] = useState('');

  const scriptURL =
    'https://script.google.com/macros/s/AKfycby8fyWM9jy8a4PwYtrXB6VVpEzQlIAPpt3ZDGZg0tvFB9IDBNT8NTK-M60M2a_7K00/exec';

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(scriptURL, {
      method: 'POST',
      body: new FormData(e.target),
    })
      .then((response) => {
        setMessage('Message sent successfully!');
        setTimeout(() => setMessage(''), 5000);
        setFormState({ name: '', email: '', message: '' }); // Reset form
      })
      .catch((error) => {
        console.error('Error!', error.message);
        setMessage('Something went wrong. Please try again later.');
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <Container className="py-5 contact-us">
      <h1 className="text-center text-primary mb-4">Contact Us</h1>
      <Row className="mb-5">
        <Col md={6}>
          <h3 className="text-secondary">Get in Touch</h3>
          <p>
            Have questions, feedback, or need assistance? We'd love to hear from
            you. Fill out the form or reach out using the contact information
            below.
          </p>
          <ul className="list-unstyled">
            <li>
              <strong>Address:</strong> Colombo
            </li>
            <li>
              <strong>Phone:</strong> +740815990
            </li>
            <li>
              <strong>Email:</strong> support@dealmates.com
            </li>
          </ul>
        </Col>
        <Col md={6}>
          <Form onSubmit={handleSubmit} name="submit-to-google-sheet">
            <Form.Group controlId="name" className="mb-3">
              <Form.Label>Your Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                name="name"
                value={formState.name}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="email" className="mb-3">
              <Form.Label>Your Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                name="email"
                value={formState.email}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="message" className="mb-3">
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Enter your message"
                name="message"
                value={formState.message}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Send Message
            </Button>
          </Form>
          {message && <p className="mt-3 text-success">{message}</p>}
        </Col>
      </Row>
    </Container>
  );
};

export default ContactUs;
