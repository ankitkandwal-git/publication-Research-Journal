import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FrontPage from './Components/FrontPage';
import Membership from './Components/Membership';
import ConferenceAndSeminars from './Components/ConferenceAndSeminars';
import ResearchAndJournal from './Components/ResearchAndJournal';
import Certification from './Components/Certification';

import './App.css';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<FrontPage />} />
      <Route path="/membership" element={<Membership />} />
      <Route path="/conference-and-seminars" element={<ConferenceAndSeminars />} />
      <Route path="/research-and-journal" element={<ResearchAndJournal />} />
      <Route path="/certification" element={<Certification />} />
    </Routes>
  </Router>
);

export default App;
