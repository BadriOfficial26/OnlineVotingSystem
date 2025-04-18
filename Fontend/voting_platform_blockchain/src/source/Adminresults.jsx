import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import Adminnavbar from "./Adminnavbar";
import "bootstrap/dist/css/bootstrap.min.css";

function Adminresults({ onPublish }) {
  const [records, setRecords] = useState([]);
  const [candidateWithMostVotes, setCandidateWithMostVotes] = useState(null);
  const [candidateVoteCounts, setCandidateVoteCounts] = useState({});
  const [isPublished, setIsPublished] = useState(false);
  const [isVotingStarted, setIsVotingStarted] = useState(false);
  const [isVotingEnded, setIsVotingEnded] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  useEffect(() => {
    if (isVotingEnded) {
      fetchRecords();
    }
  }, [isVotingEnded]);

  const fetchRecords = async () => {
    try {
      const response = await fetch("http://localhost:6900/api/voter-records");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setRecords(data);

      // Calculate candidate vote counts
      const voteCounts = data.reduce((acc, record) => {
        acc[record.candidateAadhaarCardNumber] =
          (acc[record.candidateAadhaarCardNumber] || 0) + 1;
        return acc;
      }, {});

      setCandidateVoteCounts(voteCounts);

      // Find candidate with the most votes
      let maxVotes = 0;
      let candidateWithMaxVotes = null;

      Object.keys(voteCounts).forEach((candidateId) => {
        if (voteCounts[candidateId] > maxVotes) {
          maxVotes = voteCounts[candidateId];
          candidateWithMaxVotes = data.find(
            (record) => record.candidateAadhaarCardNumber === candidateId
          );
        }
      });

      setCandidateWithMostVotes(candidateWithMaxVotes);

      // Publish results if available
      if (candidateWithMaxVotes) {
        const candidateData = {
          candidateName: candidateWithMaxVotes.candidateName,
          emblem: candidateWithMaxVotes.emblem,
          totalVotes: voteCounts[candidateWithMaxVotes.candidateAadhaarCardNumber],
        };
        onPublish(candidateData);
        setIsPublished(true);
      } else {
        setIsPublished(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const formatTime = (date) => {
    if (!date) return "--:--:--";
    return date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true });
  };

  const handleStartVoting = () => {
    setIsVotingStarted(true);
    setIsVotingEnded(false);
    setStartTime(new Date());
    setEndTime(null); // Reset end time
  };

  const handleEndVoting = () => {
    setIsVotingEnded(true);
    setEndTime(new Date());
  };

  return (
    <div>
      <Adminnavbar />
      <div className="container mt-4">
        <h2><strong>VOTING RESULT DETAILS</strong></h2>
        
        {/* Voting Controls */}
        <div className="mb-3">
          <Button 
            variant="success" 
            onClick={handleStartVoting} 
            disabled={isVotingStarted}
            className="me-2"
          >
            Start Voting
          </Button>
          <Button 
            variant="danger" 
            onClick={handleEndVoting} 
            disabled={!isVotingStarted || isVotingEnded}
          >
            End Voting
          </Button>
        </div>

        {/* Display start and end times */}
        <div className="mb-3">
          <h5>Voting Start Time: <span className="text-primary">{formatTime(startTime)}</span></h5>
          <h5>Voting End Time: <span className="text-danger">{formatTime(endTime)}</span></h5>
        </div>

        {/* Show results only after voting has ended */}
        {isVotingEnded && candidateWithMostVotes && (
          <div className="mt-3 p-3 border rounded bg-light">
            <h4>Candidate with Highest Votes:</h4>
            <p><strong>Name:</strong> {candidateWithMostVotes.candidateName}</p>
            <p><strong>Emblem:</strong> {candidateWithMostVotes.emblem}</p>
            <p><strong>Total Votes:</strong> {candidateVoteCounts[candidateWithMostVotes.candidateAadhaarCardNumber]}</p>
          </div>
        )}

        {/* Voting Records Table */}
        {isVotingEnded && (
          <Table striped bordered hover responsive className="mt-4">
            <thead>
              <tr>
                <th>ID</th>
                <th>Voter Aadhaar Card Number</th>
                <th>Candidate Aadhaar Card Number</th>
                <th>Emblem</th>
                <th>Candidate Name</th>
              </tr>
            </thead>
            <tbody>
              {records.map((record) => (
                <tr key={record.id}>
                  <td>{record.id}</td>
                  <td>{record.voterAadhaarCardNumber}</td>
                  <td>{record.candidateAadhaarCardNumber}</td>
                  <td>{record.emblem}</td>
                  <td>{record.candidateName}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div>
    </div>
  );
}

export default Adminresults;
