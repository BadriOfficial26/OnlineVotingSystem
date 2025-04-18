import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import MyNavbar from './Navbar';

const RegisterVoter = () => {
  const navigate = useNavigate();

  const initialFormData = {
    firstname: '',
    lastname: '',
    emailid: '',
    aadharcardNumber: '',
    password: '',
    address: '',
    city: '',
    state: '',
    phoneNumber: ''
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [serverError, setServerError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setServerError(''); // Clear server error when user modifies the form
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (validateForm()) {
  //     try {
  //       const response = await axios.post('http://localhost:6900/api/voters', formData);
  //       console.log(response.data); // Handle success, e.g., redirect to success page
  //       setSuccessMessage('Registered successfully! Redirecting to login page...');
  //       setTimeout(() => {
  //         navigate('/voters'); // Redirect to login page after successful registration
  //       }, 2000); // Redirect after 2 seconds
  //     } catch (error) {
  //       if (error.response && error.response.status === 409) {
  //         setServerError('Aadhar card number is already registered. Please use another Aadhar card number.');
  //       } else {
  //         console.error('Registration failed', error); // Log other errors to console for debugging
  //         setServerError('Aadhar card number is already registered. Please use another Aadhar card number.');
  //       }
  //     }
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post('http://localhost:6900/api/voters', formData);
        console.log(response.data); // Handle success
        setSuccessMessage('Registered successfully! Redirecting to homepage...');
        
        // Store voter details in localStorage
        localStorage.setItem('voterDetails', JSON.stringify(formData));
  
        setTimeout(() => {
          navigate('/voters-homepage', { state: { voterDetails: formData } });
        }, 2000);
      } catch (error) {
        if (error.response && error.response.status === 409) {
          setServerError('Aadhar card number is already registered. Please use another Aadhar card number.');
        } else {
          console.error('Registration failed', error);
          setServerError('Something went wrong. Please try again later.');
        }
      }
    }
  };
  
  const handleClearForm = () => {
    setFormData(initialFormData); // Reset form data to initial empty state
    setErrors({}); // Clear any validation errors
    setSuccessMessage(''); // Clear success message if any
    setServerError(''); // Clear server error if any
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    if (!formData.firstname.trim()) {
      newErrors.firstname = 'First name is required';
      valid = false;
    }

    if (!formData.lastname.trim()) {
      newErrors.lastname = 'Last name is required';
      valid = false;
    }

    if (!formData.emailid.trim()) {
      newErrors.emailid = 'Email is required';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.emailid)) {
      newErrors.emailid = 'Email is invalid';
      valid = false;
    }

    if (!formData.aadharcardNumber.trim()) {
      newErrors.aadharcardNumber = 'Aadhar card number is required';
      valid = false;
    } else if (!/^\d{12}$/.test(formData.aadharcardNumber)) {
      newErrors.aadharcardNumber = 'Aadhar card number must be 12 digits';
      valid = false;
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
      valid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      valid = false;
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
      valid = false;
    }

    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
      valid = false;
    }

    if (!formData.state.trim()) {
      newErrors.state = 'State is required';
      valid = false;
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
      valid = false;
    } else if (!/^\d{10}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Phone number must be 10 digits';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  return (
    <div>
      <MyNavbar />
      <div
        style={{
          backgroundImage: `url('https://t4.ftcdn.net/jpg/05/50/34/75/360_F_550347527_a4E35eFyM3s5KhwaUMoGmqgJQf9Ub48q.jpg')`,
          backgroundSize: 'cover',
          minHeight: '100vh',
        }}
      >
        <Container className="py-5">
          <Row className="justify-content-md-center">
            <Col xs={12} md={6}>
              <div
                style={{
                  border: '1px solid #ccc',
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  padding: '20px',
                  borderRadius: '10px',
                  color:'whitesmoke'
                }}
              >
                <h2 style={{ textAlign: 'center' }}>REGISTER VOTERS</h2>
                <br/>
                {successMessage && (
                  <Alert variant="success" style={{ textAlign: 'center' }}>
                    {successMessage}
                  </Alert>
                )}
                {serverError && (
                  <Alert variant="danger" style={{ textAlign: 'center' }}>
                    {serverError}
                  </Alert>
                )}
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="formFirstName">
                    <Form.Label><strong>FIRST NAME</strong></Form.Label>
                    <Form.Control
                      type="text"
                      name="firstname"
                      value={formData.firstname}
                      onChange={handleChange}
                      isInvalid={errors.firstname}
                      placeholder='Enter the first name'
                    />
                    <Form.Control.Feedback type="invalid">{errors.firstname}</Form.Control.Feedback>
                  </Form.Group>
                  <br/>
                  <Form.Group controlId="formLastName">
                    <Form.Label><strong>LAST NAME</strong></Form.Label>
                    <Form.Control
                      type="text"
                      name="lastname"
                      value={formData.lastname}
                      onChange={handleChange}
                      isInvalid={errors.lastname}
                      placeholder='Enter the last name'
                    />
                    <Form.Control.Feedback type="invalid">{errors.lastname}</Form.Control.Feedback>
                  </Form.Group>
                  <br/>
                  <Form.Group controlId="formEmail">
                    <Form.Label><strong>EMAIL ID</strong></Form.Label>
                    <Form.Control
                      type="email"
                      name="emailid"
                      value={formData.emailid}
                      onChange={handleChange}
                      isInvalid={errors.emailid}
                      placeholder='Enter the EmailId'
                    />
                    <Form.Control.Feedback type="invalid">{errors.emailid}</Form.Control.Feedback>
                  </Form.Group>
                  <br/>
                  <Form.Group controlId="formAadharCardNumber">
                    <Form.Label><strong>AADHARCARD NUMBER</strong></Form.Label>
                    <Form.Control
                      type="text"
                      name="aadharcardNumber"
                      value={formData.aadharcardNumber}
                      onChange={handleChange}
                      isInvalid={errors.aadharcardNumber}
                      placeholder='Enter the aadharcard number'
                    />
                    <Form.Control.Feedback type="invalid">{errors.aadharcardNumber}</Form.Control.Feedback>
                  </Form.Group>
                  <br/>
                  <Form.Group controlId="formPassword">
                    <Form.Label><strong>PASSWORD</strong></Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      isInvalid={errors.password}
                      placeholder='Enter the password'
                    />
                    <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                  </Form.Group>
                  <br/>
                  <Form.Group controlId="formAddress">
                    <Form.Label><strong>ADDRESS</strong></Form.Label>
                    <Form.Control
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      isInvalid={errors.address}
                      placeholder='Enter the address'
                    />
                    <Form.Control.Feedback type="invalid">{errors.address}</Form.Control.Feedback>
                  </Form.Group>
                  <br/>
                  <Form.Group controlId="formCity">
                    <Form.Label><strong>CITY</strong></Form.Label>
                    <Form.Control
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      isInvalid={errors.city}
                      placeholder='Enter the city'
                    />
                    <Form.Control.Feedback type="invalid">{errors.city}</Form.Control.Feedback>
                  </Form.Group>
                  <br/>
                  <Form.Group controlId="formState">
                    <Form.Label><strong>STATE</strong></Form.Label>
                    <Form.Control
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      isInvalid={errors.state}
                      placeholder='Enter the State'
                    />
                    <Form.Control.Feedback type="invalid">{errors.state}</Form.Control.Feedback>
                  </Form.Group>
                  <br/>
                  <Form.Group controlId="formPhoneNumber">
                    <Form.Label><strong>PHONE NUMBER</strong></Form.Label>
                    <Form.Control
                      type="text"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      isInvalid={errors.phoneNumber}
                      placeholder='Enter the phone number'
                    />
                    <Form.Control.Feedback type="invalid">{errors.phoneNumber}</Form.Control.Feedback>
                  </Form.Group>
                  <br/>
                  <Row className="justify-content-center">
                    <Col xs={12} style={{ textAlign: 'center' }}>
                      <Button variant="primary" type="submit" style={{ width: '100%', marginTop: '10px' }}>
                        REGISTER
                      </Button>
                      <Button variant="secondary" type="button" style={{ width: '100%', marginTop: '10px' }} onClick={handleClearForm}>
                        CLEAR
                      </Button>
                      <p style={{ marginTop: '10px', marginBottom: '0px' }}>
                        Already registered? <Link to="/voters">Login here</Link>
                      </p>
                    </Col>
                  </Row>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default RegisterVoter;

