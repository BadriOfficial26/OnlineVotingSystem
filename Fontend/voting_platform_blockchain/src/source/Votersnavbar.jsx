import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';

function Votersnavbar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Add any additional logout logic here (e.g., clearing user session)
        navigate('/');
      };
  return (
    <div>
        <Navbar bg="dark" variant="dark" expand="lg" style={{ height: '70px' }}>
      <Container>
        <Navbar.Brand as={Link} to="/"><strong>E-VOTECHAIN</strong></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          <Nav.Link as={Link} to="/voterhomepage"><strong>HOME PAGE</strong></Nav.Link>
            <Nav.Link as={Link} to="/votingsection"><strong>VOTING SECTION</strong></Nav.Link>
            <Nav.Link as={Link} to="/votersresults"><strong>RESULTS</strong></Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link onClick={handleLogout}><strong>LOGOUT</strong></Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  )
}

export default Votersnavbar