import React, { useEffect, useState } from 'react';
import { Table, Image, Button, Alert } from 'react-bootstrap';
import Votersnavbar from './Votersnavbar';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function VotingSection() {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;
  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [candidates, setCandidates] = useState([]);
  const [votedCandidate, setVotedCandidate] = useState(null);
  const [canSubmit, setCanSubmit] = useState(false);
  const [successAlert, setSuccessAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);

  useEffect(() => {
    const storedAadhaarNumber = localStorage.getItem('aadhaarNumber');
    if (storedAadhaarNumber) {
      setAadhaarNumber(storedAadhaarNumber);
    }

    if (state?.aadhaarNumber) {
      localStorage.setItem('aadhaarNumber', state.aadhaarNumber);
      setAadhaarNumber(state.aadhaarNumber);
    }

    axios.get('http://localhost:6900/candidates')
      .then(response => {
        const initialCandidates = response.data.map(candidate => ({
          ...candidate,
          voted: false
        }));
        setCandidates(initialCandidates);
      })
      .catch(error => {
        console.error('Error fetching candidates:', error);
      });
  }, [state]);

  const handleVote = (candidateId) => {
    const candidateToVote = candidates.find(candidate => candidate.aadharcardNumber === candidateId);

    if (!candidateToVote.voted) {
      const updatedCandidates = candidates.map(candidate => ({
        ...candidate,
        voted: candidate.aadharcardNumber === candidateId
      }));
      setCandidates(updatedCandidates);

      // ✅ FIX: Changed fullname → emblemName
      setVotedCandidate({
        candidateAadhaarCardNumber: candidateToVote.aadharcardNumber,
        emblem: candidateToVote.emblemName,
        candidateName: candidateToVote.candidateName
      });

      setCanSubmit(true);
      console.log(`Voted for candidate:`, candidateToVote);
    } else {
      const resetCandidates = candidates.map(candidate => ({
        ...candidate,
        voted: false
      }));
      setCandidates(resetCandidates);
      setVotedCandidate(null);
      setCanSubmit(false);
    }
  };

  const handleSubmit = () => {
    if (!votedCandidate) {
      console.log('No candidate has been voted.');
      return;
    }

    if (!aadhaarNumber) {
      console.log('Voter Aadhaar Number is missing.');
      return;
    }

    const { candidateAadhaarCardNumber, emblem, candidateName } = votedCandidate;
    const postData = {
      voterAadhaarCardNumber: aadhaarNumber,
      candidateAadhaarCardNumber,
      emblem,
      candidateName
    };

    // Debug print
    console.log('Submitting vote with data:', postData);
    // Optional: Temporary alert
    // alert(JSON.stringify(postData, null, 2));

    axios.post('http://localhost:6900/api/voter-records', postData)
      .then(response => {
        console.log('Vote submitted successfully!', response.data);
        setSuccessAlert(true);
        setVotedCandidate(null);
        setCanSubmit(false);
      })
      .catch(error => {
        console.error('Error submitting vote:', error);
        setErrorAlert(true);
        if (error.response) {
          console.error('Server responded with:', error.response.data);
        } else if (error.request) {
          console.error('No response received:', error.request);
        } else {
          console.error('Error setting up request:', error.message);
        }
      });
  };

  return (
    <div>
      <Votersnavbar />
      <div className="container mt-5">
        <h2><strong>VOTING SECTION</strong></h2>

        {successAlert && (
          <Alert variant="success" onClose={() => setSuccessAlert(false)} dismissible>
            Vote submitted successfully!
          </Alert>
        )}
        {errorAlert && (
          <Alert variant="danger" onClose={() => setErrorAlert(false)} dismissible>
            Already voted. No duplicate vote is allowed.
          </Alert>
        )}

        <div style={{ margin: '20px', color: 'black' }}>
          <table className="table">
            <tbody>
              <tr>
                <td><strong>Voter Aadhaar Number:</strong></td>
                <td>{aadhaarNumber}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>IMAGE</th>
              <th>EMBLEM NAME</th>
              <th>AADHAR CARD NUMBER</th>
              <th>CANDIDATE NAME</th>
              <th>ACTION</th>
              <th>STATUS</th>
            </tr>
          </thead>
          <tbody>
            {candidates.map((candidate, index) => (
              <tr key={index}>
                <td>
                  <Image 
                    src={`http://localhost:6900/candidates/image/${candidate.imagePath}`} 
                    alt="Candidate" 
                    style={{ width: '100px', height: '100px', objectFit: 'cover' }} 
                    roundedCircle 
                  />
                </td>
                <td>{candidate.emblemName}</td>
                <td>{candidate.aadharcardNumber}</td>
                <td>{candidate.candidateName}</td>
                <td>
                  <Button 
                    variant={candidate.voted ? 'success' : 'primary'} 
                    onClick={() => handleVote(candidate.aadharcardNumber)} 
                    disabled={candidate.voted}
                  >
                    {candidate.voted ? 'VOTED' : 'VOTE'}
                  </Button>
                </td>
                <td>
                  <span 
                    style={{
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      backgroundColor: candidate.voted ? 'rgb(10, 255, 10)' : 'red',
                      display: 'inline-block',
                      marginLeft: '5px'
                    }}
                  ></span>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <div style={{ textAlign: 'center' }}>
          <Button 
            variant="primary" 
            onClick={handleSubmit} 
            disabled={!canSubmit}
          >
            <strong>SUBMIT</strong>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default VotingSection;
