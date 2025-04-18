// import React, { useState } from 'react';
// import { Container, Form, Button, ProgressBar, Alert } from 'react-bootstrap';
// import CandidateNavbar from './CandidateNavbar';
// import axios from 'axios';
// import 'bootstrap/dist/css/bootstrap.min.css';

// function UpdateCandidateDetails() {
//   const [aadharcardNumber, setAadharcardNumber] = useState('');
//   const [fullname, setFullname] = useState('');
//   const [imageFile, setImageFile] = useState(null);
//   const [uploadProgress, setUploadProgress] = useState(0);
//   const [errorMessage, setErrorMessage] = useState('');

//   const handleFormSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append('file', imageFile);
//     formData.append('fullname', fullname);

//     try {
//       const response = await axios.put(
//         `http://localhost:6900/candidates/${aadharcardNumber}/update-fullname-image`,
//         formData,
//         {
//           headers: {
//             'Content-Type': 'multipart/form-data'
//           },
//           onUploadProgress: (progressEvent) => {
//             const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
//             setUploadProgress(progress);
//           }
//         }
//       );

//       console.log('Updated candidate:', response.data);
//     } catch (error) {
//       if (error.response) {
//         setErrorMessage(error.response.data.message);
//       } else {
//         setErrorMessage('Error updating candidate. Please try again later.');
//       }
//       console.error('Error updating candidate:', error);
//     }
//   };

//   return (
//     <div>
//       <CandidateNavbar />
//     <div
//       style={{
//         backgroundImage: 'url("your-background-image-url.jpg")',
//         backgroundSize: 'cover',
//         backgroundRepeat: 'no-repeat',
//         backgroundAttachment: 'fixed',
//         width: '100%',
//         height: '91vh',
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center'
//       }}
//     >
//       <Container
//         style={{
//           background: 'rgba(255, 255, 255, 0.8)',
//           borderRadius: '10px',
//           padding: '2rem',
//           boxShadow: '5px 5px black',
//           maxWidth: '500px',
//           width: '100%'
//         }}
//       >
//         <h2 className="text-center mb-4">Update Candidate Details</h2>
//         <Form onSubmit={handleFormSubmit}>
//           <Form.Group controlId="aadharcardNumber">
//             <Form.Label>Aadhar Card Number</Form.Label>
//             <Form.Control
//               type="text"
//               value={aadharcardNumber}
//               onChange={(e) => setAadharcardNumber(e.target.value)}
//               required
//             />
//           </Form.Group>

//           <Form.Group controlId="fullname">
//             <Form.Label>Full Name</Form.Label>
//             <Form.Control
//               type="text"
//               value={fullname}
//               onChange={(e) => setFullname(e.target.value)}
//               required
//             />
//           </Form.Group>
//           <br/>
//           <Form.Group controlId="imageFile">
//             <Form.Label>Upload Image</Form.Label>
//             <Form.Control
//               type="file"
//               onChange={(e) => setImageFile(e.target.files[0])}
//               required
//             />
//           </Form.Group>

//           {uploadProgress > 0 && (
//             <ProgressBar
//               now={uploadProgress}
//               label={`${uploadProgress}%`}
//               className="mb-3"
//             />
//           )}

//           {errorMessage && (
//             <Alert variant="danger" className="mt-3">
//               {errorMessage}
//             </Alert>
//           )}

//           <Button type="submit" variant="primary" className="w-100">
//             Update Candidate
//           </Button>
//         </Form>
//       </Container>
//     </div>
//     </div>
//   );
// }

// export default UpdateCandidateDetails;
