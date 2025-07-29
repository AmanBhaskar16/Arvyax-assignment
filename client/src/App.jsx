import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import MySessions from './pages/MySessions';
import SessionEditor from './pages/SessionEditor';
import { getToken } from '../utils/auth.js';
import PublicSessions from './pages/PublicSessions.jsx';

function App() {
  const token = getToken();

  return (
    <Routes>
      <Route path="/" element={token ? <Dashboard /> : <Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/sessions" element={<PublicSessions/>} />
      <Route path="/my-sessions" element={<MySessions />} />
      <Route path="/editor/:id?" element={<SessionEditor />} />
    </Routes>
  );
}

export default App;