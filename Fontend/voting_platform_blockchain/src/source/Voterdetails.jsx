import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import Adminnavbar from './Adminnavbar';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function VoterDetails() {
  const [voters, setVoters] = useState([]);
  useEffect(() => {
      console.log("Initial voters1 state:", voters);
    axios.get('http://localhost:6900/api/voters')
      .then(response => {
        console.log("Fetched voters data:", response.data); 
        setVoters(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the voters!', error);
      });
  }, []);
  useEffect(() => {
    console.log("Updated voters state:", voters); // Logs when voters1 updates
  }, [voters]);

  return (
    <div>
      <Adminnavbar />
      <div className="container mt-5">
        <h2><strong>VOTERS DETAILS</strong></h2>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Aadhar Card Number</th>
              <th>Password</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email ID</th>
              <th>Address</th>
              <th>City</th>
              <th>State</th>
              <th>Phone Number</th>
            </tr>
          </thead>
          <tbody>
            {voters.map((voter, index) => (
              <tr key={index}>
                <td>{voter.aadharcardNumber}</td>
                <td>{voter.password}</td>
                <td>{voter.firstname}</td>
                <td>{voter.lastname}</td>
                <td>{voter.emailid}</td>
                <td>{voter.address}</td>
                <td>{voter.city}</td>
                <td>{voter.state}</td>
                <td>{voter.phoneNumber}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default VoterDetails;
