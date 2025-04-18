import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import MyNavbar from './Navbar';

const Login = () => {
  const navigate = useNavigate();
  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [password, setPassword] = useState('');
  const [aadhaarError, setAadhaarError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loginError, setLoginError] = useState('');

  const validateForm = () => {
    let isValid = true;
    // Aadhaar number validation (12 digits)
    if (!/^\d{12}$/.test(aadhaarNumber)) {
      setAadhaarError('Aadhaar number must be 12 digits');
      isValid = false;
    } else {
      setAadhaarError('');
    }

    // Password validation (you can add more validations as needed)
    if (password.trim() === '') {
      setPasswordError('Password is required');
      isValid = false;
    } else {
      setPasswordError('');
    }

    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      try {
        const url = `http://localhost:6900/api/voters/${aadhaarNumber}`;
        const response = await axios.get(url);

        console.log('Response:', response.data); // Log the response data for debugging

        // Check if response data matches entered Aadhaar number
        if (response.status === 200 && response.data.aadharcardNumber === aadhaarNumber) {
          // Check if entered password matches the password from the API response
          if (response.data.password === password) {
            // Redirect to dashboard on successful login
            navigate('/voterhomepage', {
              state: {
                aadhaarNumber,
                address: response.data.address,
                city: response.data.city,
                emailid: response.data.emailid,
                firstname: response.data.firstname,
                lastname: response.data.lastname,
                phoneNumber: response.data.phoneNumber,
                state: response.data.state,
              }
            });
          } else {
            setLoginError('Incorrect password');
          }
        } else {
          setLoginError('Incorrect Aadhaar number');
        }
      } catch (error) {
        console.error('Error:', error);
        setLoginError('An error occurred. Please try again later.');
      }
    }
  };

  return (
    <div>
      <MyNavbar />
      <div
        style={{
          backgroundImage: `url('https://t4.ftcdn.net/jpg/05/50/34/75/360_F_550347527_a4E35eFyM3s5KhwaUMoGmqgJQf9Ub48q.jpg')`,
          backgroundSize: 'cover',
          minHeight: '91vh',
        }}
      >
        <Container className="py-5">
          <Row className="justify-content-md-center">
            <Col xs={12} md={6}>
              <Form
                onSubmit={handleSubmit}
                style={{
                  border: '1px solid #ccc',
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  padding: '20px',
                  borderRadius: '10px',
                  width: '90%',
                  color: 'whitesmoke'
                }}
              >
                <h2 style={{ textAlign: 'center' }}>LOGIN FORM</h2>
                {loginError && <Alert variant="danger">{loginError}</Alert>}
                <Form.Group controlId="formAadhaarNumber">
                  <Form.Label><strong>AADHAAR NUMBER</strong></Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Aadhaar Number"
                    value={aadhaarNumber}
                    onChange={(e) => setAadhaarNumber(e.target.value)}
                    isInvalid={aadhaarError !== ''}
                  />
                  <Form.Control.Feedback type="invalid">{aadhaarError}</Form.Control.Feedback>
                </Form.Group>
                <br />
                <Form.Group controlId="formPassword">
                  <Form.Label><strong>PASSWORD</strong></Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    isInvalid={passwordError !== ''}
                  />
                  <Form.Control.Feedback type="invalid">{passwordError}</Form.Control.Feedback>
                </Form.Group>
                <br />
                <Button variant="primary" type="submit">
                  <strong>LOGIN</strong>
                </Button>
                <div style={{ marginTop: '10px', textAlign: 'center' }}>
                  Not registered yet? <Link to="/register">Register here</Link>
                </div>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Login;
