import './App.css';
import Adminlogin from './source/Adminlogin';
import Candidatelogin from './source/Candidatelogin';
import Voters from './source/Voters';
import Home from './source/Home';
import { Route, Routes } from 'react-router-dom'
import Adminhomepage from './source/Adminhomepage';
import RegisterVoter from './source/RegisterVoter';
import Votershomepage from './source/Votershomepage';
import CandidateRegister from './source/CandidateRegister';
import Candidatehomepage from './source/Candidatehomepage';
import CreateEmblem from './source/CreateEmblem';
import Results from './source/Results';
import Voterdetails from './source/Voterdetails';
import Candidatedetails from './source/Candidatedetails';
import Adminresults from './source/Adminresults';
import VotingSection from './source/VotingSection';
import Votersresults from './source/Votersresults';
import Blockchain from './source/Blockchain';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="adminlogin" element={<Adminlogin />} />
        <Route path="voters" element={<Voters />} />
        <Route path="candidatelogin" element={<Candidatelogin />} />
        <Route path="adminhomepage" element={<Adminhomepage />} />
        <Route path="register" element={<RegisterVoter />} />
        <Route path="voterhomepage" element={<Votershomepage />} />
        <Route path="candidateregister" element={<CandidateRegister />} />
        <Route path="candidatehomepage" element={<Candidatehomepage />} />
        {/* <Route path="createemblem" element={<CreateEmblem />} /> */}
        <Route path="results" element={<Results />} />
        <Route path="voterdetails" element={<Voterdetails />} />
        <Route path="candidatedetails" element={<Candidatedetails />} />
        <Route path="adminresults" element={<Votersresults />} />
        <Route path="votingsection" element={<VotingSection />} />
        <Route path="votersresults" element={<Votersresults />} />
        <Route path="blockchain" element={<Blockchain />} />
      </Routes>
    </div>
  );
}

export default App;
