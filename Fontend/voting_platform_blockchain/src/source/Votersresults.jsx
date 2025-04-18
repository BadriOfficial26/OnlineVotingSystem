import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import Votersnavbar from './Votersnavbar';
import 'bootstrap/dist/css/bootstrap.min.css';

function Votersresults({ onPublish }) {
  const [records, setRecords] = useState([]);
  const [candidatesWithMaxVotes, setCandidatesWithMaxVotes] = useState([]);
  const [candidateVoteCounts, setCandidateVoteCounts] = useState({});
  const [isPublished, setIsPublished] = useState(false);
  const [imageError, setImageError] = useState(false); // State to track image loading errors

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    try {
      const response = await fetch('http://localhost:6900/api/voter-records');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setRecords(data);

      // Calculate candidate counts
      const voteCounts = data.reduce((acc, record) => {
        acc[record.candidateAadhaarCardNumber] = (acc[record.candidateAadhaarCardNumber] || 0) + 1;
        return acc;
      }, {});

      setCandidateVoteCounts(voteCounts);

      // Find candidates with the most votes
      let maxVotes = 0;
      let candidatesWithMax = [];

      Object.keys(voteCounts).forEach(candidateId => {
        if (voteCounts[candidateId] > maxVotes) {
          maxVotes = voteCounts[candidateId];
          candidatesWithMax = [data.find(record => record.candidateAadhaarCardNumber === candidateId)];
        } else if (voteCounts[candidateId] === maxVotes) {
          candidatesWithMax.push(data.find(record => record.candidateAadhaarCardNumber === candidateId));
        }
      });

      // Fetch candidate details including image for each candidate in candidatesWithMax
      const candidatesWithMaxDetailed = await Promise.all(
        candidatesWithMax.map(async candidate => {
          if (candidate) {
            const candidateResponse = await fetch(`http://localhost:6900/candidates/${candidate.candidateAadhaarCardNumber}`);
            if (!candidateResponse.ok) {
              throw new Error('Failed to fetch candidate details');
            }
            const candidateData = await candidateResponse.json();
            return {
              ...candidate,
              imagePath: candidateData.imagePath // Assuming imagePath is a property in the candidateData response
            };
          }
          return null;
        })
      );

      setCandidatesWithMaxVotes(candidatesWithMaxDetailed);

      // Publish results for the first candidate with most votes if exists
      if (candidatesWithMaxDetailed.length > 0) {
        const candidateData = {
          candidateName: candidatesWithMaxDetailed[0].candidateName,
          emblem: candidatesWithMaxDetailed[0].emblem,
          totalVotes: voteCounts[candidatesWithMaxDetailed[0].candidateAadhaarCardNumber],
          imagePath: candidatesWithMaxDetailed[0].imagePath // Use imagePath from candidateData
        };
        onPublish(candidateData);
        setIsPublished(true);
      } else {
        setIsPublished(false);
      }

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    if (candidatesWithMaxVotes.length > 0) {
      console.log('Candidates with most votes:', candidatesWithMaxVotes);
    }
  }, [candidatesWithMaxVotes]);

  const handleImageError = () => {
    setImageError(true);
  };

  const defaultImage = 'http://localhost:6900/default-image.jpg'; // Replace with your default image URL

  return (
    <div>
      <Votersnavbar />
      <div style={{
        backgroundImage: `url('https://t3.ftcdn.net/jpg/03/90/65/92/360_F_390659218_dFoSBGTlw84lte8E6vxgRc6W863dBVne.jpg')`, // Replace with your background image URL
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '91vh', // Ensure the background covers the entire viewport height
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center', // Center content horizontally
        justifyContent: 'center', // Center content vertically
      }}>
        <Container className="mt-4" style={{ padding: '20px', position: 'relative' }}>
          <h2 style={{ marginBottom: '20px', color: 'whitesmoke', textAlign: 'center' }}><strong>VOTING RESULTS</strong></h2>
          {candidatesWithMaxVotes.map((candidate, index) => (
            <Row key={index} className="mt-4" style={{ width: '60%', boxShadow: '4px 5px black', borderRadius: '10px', color: 'whitesmoke', backgroundColor: 'rgba(48, 47, 47, 0.26)', minHeight: '45vh', position: 'relative' }}>
              <Col>
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', width: '100%' }}>
                  <h3>Candidate with Highest Votes:</h3>
                  <p><strong>Name:</strong> {candidate.candidateName}</p>
                  <p><strong>Emblem:</strong> {candidate.emblem}</p>
                  <p><strong>Total Votes:</strong> {candidateVoteCounts[candidate.candidateAadhaarCardNumber]}</p>
                  {/* Display image if imagePath is available */}
                  {candidate.imagePath ? (
                    <div style={{ position: 'relative', width: '150px', height: '150px', borderRadius: '50%', overflow: 'hidden', margin: '0 auto' }}>
                      {imageError ? (
                        <p>Failed to load image</p>
                      ) : (
                        <Image
                          src={`http://localhost:6900/candidates/image/${candidate.imagePath}`}
                          alt="Candidate Image"
                          style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                          roundedCircle
                        />
                      )}
                    </div>
                  ) : (
                    <div style={{ position: 'relative', width: '150px', height: '150px', borderRadius: '50%', overflow: 'hidden', margin: '0 auto' }}>
                      <Image
                        src={defaultImage}
                        alt="Default"
                        style={{
                          width: '100%', // Adjust the width as needed
                          height: '100%', // Ensure height matches width for a perfect circle
                          objectFit: 'cover', // Ensure the image covers the entire circle
                        }}
                        onError={handleImageError} // Handle default image load errors
                      />
                    </div>
                  )}
                </div>
              </Col>
            </Row>
          ))}
        </Container>
      </div>
    </div>
  );
}

export default Votersresults;
