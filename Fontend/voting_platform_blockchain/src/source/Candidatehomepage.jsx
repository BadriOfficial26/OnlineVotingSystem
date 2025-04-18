import React, { useState, useEffect } from 'react';
import CandidateNavbar from './CandidateNavbar';
import { Container, Row, Col } from 'react-bootstrap';

function Candidatehomepage() {
  const [candidateData, setCandidateData] = useState(null);
  const aadharcardNumber = sessionStorage.getItem('aadharcardNumber');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:6900/candidates/laks/${aadharcardNumber}`);
        if (!response.ok) {
          throw new Error('Failed to fetch candidate data');
        }
        const data = await response.json();
        setCandidateData(data); // Use full response data
      } catch (error) {
        console.error('Error fetching candidate data:', error);
      }
    };

    fetchData();
  }, [aadharcardNumber]);

  useEffect(() => {
    if (candidateData) {
      console.log('Candidate Data:', candidateData);
    }
  }, [candidateData]);

  return (
    <div>
      <div style={{ backgroundImage: `url('https://wallpaperaccess.com/full/459724.png')`, backgroundSize: 'cover', minHeight: '100vh', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
        <CandidateNavbar />
        <Container>
          {candidateData && candidateData.candidate && (
            <Row className="mt-4" style={{ width: '60%', boxShadow: '4px 5px black', borderRadius: '10px', color: 'whitesmoke', backgroundColor: 'rgba(48, 47, 47, 0.26)', padding: '20px', position: 'relative' }}>
              <Col>
                <div>
                  <h3>CANDIDATE DETAILS</h3>
                  <p><strong>AADHARCARD NUMBER:</strong> {candidateData.candidate.aadharcardNumber}</p>
                  <p><strong>NAME:</strong> {candidateData.candidate.candidateName}</p>
                  <p><strong>EMAIL ID:</strong> {candidateData.candidate.emailid}</p>
                  <p><strong>PHONE NUMBER:</strong> {candidateData.candidate.phoneNumber}</p>
                  <p><strong>ADDRESS:</strong> {candidateData.candidate.address}</p>
                  <p><strong>CITY:</strong> {candidateData.candidate.city}</p>
                  <p><strong>STATE:</strong> {candidateData.candidate.state}</p>
                  
                  {/* Display image if base64 image data is available */}
                  <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    {candidateData.image ? (
                      <img
                        src={`data:image/png;base64,${candidateData.image}`}
                        alt="Candidate"
                        style={{
                          width: '150px',
                          height: '150px',
                          borderRadius: '50%',
                          objectFit: 'cover',
                          border: '2px solid #fff',
                          boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)'
                        }}
                        onError={(e) => { e.target.src = 'path_to_fallback_image.jpg'; }}
                      />
                    ) : (
                      <p>Image not found or not available</p>
                    )}
                  </div>
                </div>
                <h5 style={{ textAlign: 'center', marginTop: '20px' }}><strong>EMBLEM NAME: {candidateData.candidate.emblemName || 'Not Available'}</strong></h5>
              </Col>
            </Row>
          )}
        </Container>
      </div>
    </div>
  );
}

export default Candidatehomepage;
