import './App.css';
import Home from './components/Home'
import Profile from './components/Profile'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import {useState} from 'react'

function App() {

  const [visitedProfiles, setVisitedProfiles] = useState([]);
  sessionStorage.setItem('visitedProfiles', JSON.stringify(visitedProfiles));

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home setVisitedProfiles={setVisitedProfiles}/>} />
          <Route path='/user/:idNum' element={<Profile setVisitedProfiles={setVisitedProfiles} visitedProfiles={visitedProfiles}/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
