import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, ProgressBar } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import MyNavbar from './Navbar';
import axios from 'axios';

function CandidateRegister() {
  const [aadharcardNumber, setAadharcardNumber] = useState('');
  const [emailid, setEmailid] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [candidateName, setCandidateName] = useState('');
  const [emblemName, setEmblemName] = useState(''); // New state for emblem name
  const [imageFile, setImageFile] = useState(null);
  const [validated, setValidated] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setValidated(true);

    if (
      aadharcardNumber.length !== 12 ||
      phoneNumber.length !== 10 ||
      !emailid ||
      !password ||
      !address ||
      !city ||
      !state ||
      !candidateName ||
      !emblemName // Add emblemName to the validation check
    ) {
      setMessageType("error");
      setMessage("Please fill in all fields correctly.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("aadharcardNumber", aadharcardNumber);
      formData.append("emailid", emailid);
      formData.append("password", password);
      formData.append("address", address);
      formData.append("city", city);
      formData.append("state", state);
      formData.append("phoneNumber", phoneNumber);
      formData.append("candidateName", candidateName);
      formData.append("emblemName", emblemName); // Add emblemName to the form data
      
      // Only append image if it's selected
      if (imageFile) {
        formData.append("file", imageFile);
      }

      const response = await axios.post(
        "http://localhost:6900/candidates/laks/basic",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          onUploadProgress: (progressEvent) => {
            const progress = Math.round(
              (progressEvent.loaded / progressEvent.total) * 100
            );
            setUploadProgress(progress);
          },
        }
      );

      if (response.status === 201) {
        setMessageType("success");
        setMessage("Registration successful! Redirecting to login...");
        setTimeout(() => navigate("/candidatelogin"), 5000);
      }
    } catch (error) {
      console.error("Error registering:", error);
      setMessageType("error");
      setMessage(
        error.response?.data?.message || "Error during registration. Please try again."
      );
    }
  };

  return (
    <div>
      <MyNavbar/>
      <div style={{ 
        backgroundImage: 'url("https://erepublic.brightspotcdn.com/dims4/default/e0023c6/2147483647/strip/true/crop/940x490+0+68/resize/840x438!/quality/90/?url=http%3A%2F%2Ferepublic-brightspot.s3.us-west-2.amazonaws.com%2Fa6%2Fbc%2F7db2c50aecb20d48c6919ada555e%2Fshutterstock-1159332313.jpg")', 
        backgroundSize: 'cover', 
        height: 'auto', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center'
      }}>
        <br/>
        <Container className="d-flex align-items-center justify-content-center" style={{ flex: 1 }}>
          <Row>
            <Col md={12}>
              <Form 
                noValidate 
                validated={validated}
                onSubmit={handleRegister} 
                style={{ 
                  padding: '40px', 
                  border: '1px solid rgba(0, 0, 0, 0.7)', 
                  borderRadius: '10px', 
                  backgroundColor: 'rgba(0, 0, 0, 0.7)', 
                  color:'whitesmoke',
                  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.7)',
                  width:'900px',
                  height:'100%'
                }}
              >
                 {message && (
                  <div style={{ 
                    marginTop: '10px', 
                    color: messageType === 'success' ? 'green' : 'red' 
                  }}>
                    {message}
                  </div>
                )}
                <h2><strong>CANDIDATE REGISTER FORM</strong></h2>
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
                <Form.Group controlId="formEmailid">
                  <Form.Label><strong>EMAIL ID</strong></Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter Email ID"
                    value={emailid}
                    onChange={(e) => setEmailid(e.target.value)}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid Email ID.
                  </Form.Control.Feedback>
                </Form.Group>
                <br/>
                <Form.Group controlId="formCandidateName">
                  <Form.Label><strong>CANDIDATE NAME</strong></Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Candidate Name"
                    value={candidateName}
                    onChange={(e) => setCandidateName(e.target.value)}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a candidate name.
                  </Form.Control.Feedback>
                </Form.Group>
                <br/>
                <Form.Group controlId="formEmblemName">
                  <Form.Label><strong>EMBLEM NAME</strong></Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Emblem Name"
                    value={emblemName}
                    onChange={(e) => setEmblemName(e.target.value)}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide an emblem name.
                  </Form.Control.Feedback>
                </Form.Group>
                <br/>
                <Form.Group controlId="imageFile">
                  <Form.Label>Upload Image</Form.Label>
                  <Form.Control
                    type="file"
                    onChange={(e) => setImageFile(e.target.files[0])}
                    required
                  />
                </Form.Group>
                {uploadProgress > 0 && (
                  <ProgressBar now={uploadProgress} label={`${uploadProgress}%`} className="mb-3" />
                )}
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
                <Form.Group controlId="formAddress">
                  <Form.Label><strong>ADDRESS</strong></Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide an address.
                  </Form.Control.Feedback>
                </Form.Group>
                <br/>
                <Form.Group controlId="formCity">
                  <Form.Label><strong>CITY</strong></Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a city.
                  </Form.Control.Feedback>
                </Form.Group>
                <br/>
                <Form.Group controlId="formState">
                  <Form.Label><strong>STATE</strong></Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter State"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a state.
                  </Form.Control.Feedback>
                </Form.Group>
                <br/>
                <Form.Group controlId="formPhoneNumber">
                  <Form.Label><strong>PHONE NUMBER</strong></Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Phone Number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid phone number.
                  </Form.Control.Feedback>
                </Form.Group>
                <br/>
                <Button variant="primary" type="submit">
                  <strong>REGISTER</strong>
                </Button>
                <p style={{ marginTop: '10px', marginBottom: '0px',textAlign:'center'}}>
                  Already registered? <Link to="/candidatelogin">Login here</Link>
                </p>
              </Form>
            </Col>
          </Row>
        </Container>
        <br/>
      </div>
    </div>
  );
}

export default CandidateRegister;