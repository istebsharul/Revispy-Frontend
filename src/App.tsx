import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import VerifyEmail from './pages/VerifyEmail';
import Login from './pages/Login';
import HomePage from './pages/HomePage';
import ProtectedRoute from './components/ProtectedRoute'; // Import the ProtectedRoute

const App: React.FC = () => (
  <Router>
    <Routes>
      <Route 
        path="/" 
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        } 
      />
      <Route path="/register" element={<Register />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  </Router>
);

export default App;
