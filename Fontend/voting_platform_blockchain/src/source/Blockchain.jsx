import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import Adminnavbar from './Adminnavbar';
import 'bootstrap/dist/css/bootstrap.min.css';

function Blockchain() {
  const [records, setRecords] = useState([]);

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
      console.log('Fetched records:', data); // Check fetched data in console
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <Adminnavbar />
      <div className="container-fluid mt-4"> {/* Use container-fluid for full width */}
        <h2><strong>SHA-256 RECORDS</strong></h2>
        <div className="table-responsive"> {/* Make the table responsive */}
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Hashed Voter Aadhaar Card Number</th>
                <th>Hashed Candidate Aadhaar Card Number</th>
                <th>Hashed Emblem</th>
                <th>Hashed Candidate Name</th>
              </tr>
            </thead>
            <tbody>
              {records.map((record) => (
                <tr key={record.id}>
                  <td>{record.id}</td>
                  <td>{record.hashedVoterAadhaarCardNumber}</td>
                  <td>{record.hashedCandidateAadhaarCardNumber}</td>
                  <td>{record.hashedEmblem}</td>
                  <td>{record.hashedCandidateName}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default Blockchain;
