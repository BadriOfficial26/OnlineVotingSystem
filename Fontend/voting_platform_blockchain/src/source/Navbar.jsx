import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

function MyNavbar() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" style={{ height: '70px' }}>
      <Container>
        <Navbar.Brand href="#home"><strong>E-VOTECHAIN</strong></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/voters"><strong>VOTERS</strong></Nav.Link>
            <Nav.Link as={Link} to="/candidatelogin"><strong>CANDIDATES</strong></Nav.Link>
            <Nav.Link as={Link} to="/adminlogin"><strong>ADMIN</strong></Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;
