import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';

function Adminnavbar() {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isVotingAllowed, setIsVotingAllowed] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);
      
      const currentHour = now.getHours();
      if (currentHour >= 7 && currentHour < 19) {
        setIsVotingAllowed(true);
      } else {
        setIsVotingAllowed(false);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" style={{ height: '70px' }}>
      <Container>
        <Navbar.Brand as={Link} to="/">
          <strong>E-VOTECHAIN ADMIN DASHBOARD</strong>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/voterdetails"><strong>VOTER DETAILS</strong></Nav.Link>
            <Nav.Link as={Link} to="/candidatedetails"><strong>CANDIDATE DETAILS</strong></Nav.Link>
            <Nav.Link as={Link} to="/adminresults"><strong>RESULTS</strong></Nav.Link>
            <Nav.Link as={Link} to="/blockchain"><strong>HASHED DATA</strong></Nav.Link>
          </Nav>
          <Nav className="d-flex align-items-center">
            {/* <span style={{ color: 'white', marginRight: '20px', fontWeight: 'bold' }}>
              {currentTime.toLocaleTimeString()}
            </span> */}
            <Nav.Link onClick={handleLogout}><strong>LOGOUT</strong></Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>

      {/* Error Message for Invalid Voting Hours */}
      {/* {!isVotingAllowed && (
        <Container className="mt-3" style={{justifyContent: 'end',display: 'contents'}}>
          <Alert variant="danger" className="text-center"style={{margintop: '5px'}}>
            Voting is only allowed between <strong>7:00 AM</strong> and <strong>7:00 PM</strong>.
          </Alert>
        </Container>
      )} */}
    </Navbar>
  );
}

export default Adminnavbar;
