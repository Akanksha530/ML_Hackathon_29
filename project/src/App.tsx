import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { InterviewProvider } from './context/InterviewContext';
import Home from './pages/Home';
import Interview from './pages/Interview';
import Results from './pages/Results';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  return (
    <Router>
      <InterviewProvider>
        <div className="min-h-screen flex flex-col bg-gray-50">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/interview" element={<Interview />} />
            <Route path="/results" element={<Results />} />
          </Routes>
        </div>
      </InterviewProvider>
    </Router>
  );
}

export default App;