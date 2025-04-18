import React, { useEffect, useState } from 'react';
import { Table, Image } from 'react-bootstrap';
import Adminnavbar from './Adminnavbar';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function CandidateDetails() {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:6900/candidates')
      .then(response => {
        console.log(response)
        setCandidates(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the candidates!', error);
      });
  }, []);

  return (
    <div>
      <Adminnavbar />
      <div className="container mt-5">
        <h2><strong>CANDIDATE DETAILS</strong></h2>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th className="text-center">IMAGES</th>
              <th className="text-center">AADHAR CARD NUMBER</th>
              <th className="text-center">CANDIDATE NAME</th>
              <th className="text-center">EMBLEM NAME</th>
              <th className="text-center">EMAIL ID</th>
              <th className="text-center">EMAIL ID</th>
              <th className="text-center">PASSWORD</th>
              <th className="text-center">ADDRESS</th>
              <th className="text-center">CITY</th>
              <th className="text-center">STATE</th>
              <th className="text-center">PHONE NUMBER</th>
            </tr>
          </thead>
          <tbody>
            {candidates.map((candidate, index) => (
              <tr key={index}>
                <td className="text-center">
                  <Image 
                    src={`http://localhost:6900/candidates/image/${candidate.imagePath}`} 
                    alt="Candidate Image"
                    style={{ width: '100px', height: '100px', objectFit: 'cover' }} 
                    roundedCircle
                  />
                </td>
                <td className="text-center">{candidate.aadharcardNumber}</td>
                <td className="text-center">{candidate.candidateName}</td>
                <td className="text-center">{candidate.emblemName}</td>
                <td className="text-center">{candidate.fullname}</td>
                <td className="text-center">{candidate.emailid}</td>
                <td className="text-center">{candidate.password}</td>
                <td className="text-center">{candidate.address}</td>
                <td className="text-center">{candidate.city}</td>
                <td className="text-center">{candidate.state}</td>
                <td className="text-center">{candidate.phoneNumber}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default CandidateDetails;
