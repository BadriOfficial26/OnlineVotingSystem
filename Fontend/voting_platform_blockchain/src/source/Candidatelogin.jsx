import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import MyNavbar from './Navbar';

function CandidateLoginForm() {
  const [aadharcardNumber, setAadharcardNumber] = useState('');
  const [password, setPassword] = useState('');
  const [validated, setValidated] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setValidated(true);

    if (aadharcardNumber === '' || password === '') {
      setMessageType('error');
      setMessage('Please fill in all fields.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:6900/candidates/${aadharcardNumber}`);
      const data = await response.json();

      if (data.password === password) {
        // Store aadharcardNumber in sessionStorage
        sessionStorage.setItem('aadharcardNumber', aadharcardNumber);

        setMessageType('success');
        setMessage('Login successful! Redirecting...');
        setTimeout(() => navigate('/candidatehomepage'), 2000);
      } else {
        setMessageType('error');
        setMessage('Invalid credentials.');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setMessageType('error');
      setMessage('Error logging in. Please try again.');
    }
  };

  return (
    <div>
      <MyNavbar/>
      <div style={{ 
        backgroundImage: 'url("https://erepublic.brightspotcdn.com/dims4/default/e0023c6/2147483647/strip/true/crop/940x490+0+68/resize/840x438!/quality/90/?url=http%3A%2F%2Ferepublic-brightspot.s3.us-west-2.amazonaws.com%2Fa6%2Fbc%2F7db2c50aecb20d48c6919ada555e%2Fshutterstock-1159332313.jpg")', 
        backgroundSize: 'cover', 
        height: '91vh', 
        display: 'flex', 
        flexDirection: 'column' 
      }}>
        <Container className="d-flex align-items-center justify-content-center" style={{ flex: 1 }}>
          <Row>
            <Col md={12}>
              <Form 
                noValidate 
                validated={validated}
                onSubmit={handleLogin} 
                style={{ 
                  padding: '40px', 
                  width: '600px',
                  height: 'auto', // Adjust as needed
                  border: '1px solid #ccc', 
                  borderRadius: '10px', 
                  backgroundColor: 'rgba(0, 0, 0, 0.7)', 
                  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
                  color:'whitesmoke'
                }}
              >
                {message && (
                  <div style={{ 
                    marginTop: '10px', 
                    color: messageType === 'success' ? 'green' : 'rgb(20, 241, 20)' 
                  }}>
                    {message}
                  </div>
                )}
                <h2 style={{textAlign:'center'}}><strong>CANDIDATE LOGIN FORM</strong></h2>
                <br/>
                <Form.Group controlId="formAadharcardNumber">
                  <Form.Label><strong>AADHARCARD NUMBER</strong></Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Aadharcard Number"
                    value={aadharcardNumber}
                    onChange={(e) => setAadharcardNumber(e.target.value)}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid Aadharcard Number.
                  </Form.Control.Feedback>
                </Form.Group>
                <br/>
                <Form.Group controlId="formPassword">
                  <Form.Label><strong>PASSWORD</strong></Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a password.
                  </Form.Control.Feedback>
                </Form.Group>
                <br/>
                <Button variant="primary" type="submit">
                  <strong>LOGIN</strong>
                </Button>
                <div style={{ marginTop: '10px', textAlign: 'center' }}>
                  Not registered yet? <Link to="/candidateregister">Register here</Link>
                </div>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default CandidateLoginForm;
