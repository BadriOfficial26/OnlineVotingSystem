import React, { useEffect, useState } from 'react';
import Votersnavbar from './Votersnavbar';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function Votershomepage() {
  const location = useLocation();
  const { state } = location;
  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [voters, setVoters] = useState([]);
  const [matchedVoter, setMatchedVoter] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:6900/api/voters')
      .then(response => {
        setVoters(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the voters!', error);
      });
  }, []);

  useEffect(() => {
    // Get stored Aadhaar number
    const storedAadhaarNumber = localStorage.getItem('aadhaarNumber');
    if (storedAadhaarNumber) {
      setAadhaarNumber(storedAadhaarNumber);
    }

    // Update localStorage if aadhaarNumber is available in location state
    if (state?.aadhaarNumber) {
      localStorage.setItem('aadhaarNumber', state.aadhaarNumber);
      setAadhaarNumber(state.aadhaarNumber);
    }
  }, [state]);

  useEffect(() => {
    // Find voter whose aadharcardNumber matches the stored Aadhaar number
    if (aadhaarNumber && voters.length > 0) {
      const foundVoter = voters.find(voter => voter.aadharcardNumber === aadhaarNumber);
      setMatchedVoter(foundVoter || null);
    }
  }, [aadhaarNumber, voters]);

  return (
    <div>
      <Votersnavbar />
      <div style={{ margin: '20px', color: 'black' }}>
        <h2>Voter Details</h2>
        {matchedVoter ? (
          <table className="table">
            <tbody>
              <tr><td><strong>Aadhaar Number:</strong></td><td>{matchedVoter.aadharcardNumber}</td></tr>
              <tr><td><strong>First Name:</strong></td><td>{matchedVoter.firstname}</td></tr>
              <tr><td><strong>Last Name:</strong></td><td>{matchedVoter.lastname}</td></tr>
              <tr><td><strong>Email ID:</strong></td><td>{matchedVoter.emailid}</td></tr>
              <tr><td><strong>Phone Number:</strong></td><td>{matchedVoter.phoneNumber}</td></tr>
              <tr><td><strong>Address:</strong></td><td>{matchedVoter.address}</td></tr>
              <tr><td><strong>City:</strong></td><td>{matchedVoter.city}</td></tr>
              <tr><td><strong>State:</strong></td><td>{matchedVoter.state}</td></tr>
            </tbody>
          </table>
        ) : (
          <p>No matching voter found.</p>
        )}
      </div>
    </div>
  );
}

export default Votershomepage;
