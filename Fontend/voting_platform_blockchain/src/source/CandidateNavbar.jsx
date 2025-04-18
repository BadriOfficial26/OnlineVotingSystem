import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, Link } from 'react-router-dom';
function CandidateNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Add any additional logout logic here (e.g., clearing user session)
    navigate('/');
  };
  return (
    <Navbar bg="dark" variant="dark" expand="lg" style={{ height: '70px' }}>
      <Container>
        <Navbar.Brand href="#home"><strong>E-VOTECHAIN</strong></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          <Nav.Link as={Link} to="/candidatehomepage"><strong>CANDIDATE PROFILE</strong></Nav.Link>
            {/* <Nav.Link as={Link} to="/createemblem"><strong>CREATE PROFILE</strong></Nav.Link> */}
            <Nav.Link as={Link} to="/results"><strong>RESULTS</strong></Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link onClick={handleLogout}><strong>LOGOUT</strong></Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default CandidateNavbar