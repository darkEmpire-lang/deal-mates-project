import React from 'react';
import { Container, Row, Col, Card, Image } from 'react-bootstrap';
import '../styles/AboutUs.css';
import myImage from '../assets/my.jpg'; // Adjust the path if necessary

const AboutUs = () => {
  return (
    <Container className="py-5 about-us">
      <h1 className="text-center text-primary mb-4">About Me</h1>
      <Row className="mb-5">
        <Col md={6} className="text-center">
          <Image
            src={myImage}
            roundedCircle
            fluid
            className="mb-4 profile-image"
          />
        </Col>
        <Col md={6}>
          <h3 className="text-secondary">Who I Am</h3>
          <p>
            I am a <strong>Software Engineering Undergraduate</strong> with a passion for creating dynamic and engaging web platforms. My interest lies in building user-friendly websites like <strong>DealMates</strong>, designed to enhance online shopping experiences.
          </p>
          <p>
            An enthusiastic learner, I love exploring new technologies and solving challenges. I enjoy delving into the unknown, constantly seeking opportunities to grow and innovate in the tech world.
          </p>
        </Col>
      </Row>
      <Row className="text-center">
        <h2 className="text-secondary mb-4">My Core Values</h2>
        <Col md={4}>
          <Card className="mb-4 shadow-sm">
            <Card.Body>
              <h4>Quality</h4>
              <p>Delivering top-notch quality in every project I undertake.</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-4 shadow-sm">
            <Card.Body>
              <h4>Innovation</h4>
              <p>Always looking for creative solutions and staying ahead in technology trends.</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-4 shadow-sm">
            <Card.Body>
              <h4>Passion</h4>
              <p>Driven by enthusiasm for learning and growing in the software field.</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AboutUs;
