import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../utils/axiosInstance.js';
import { clearToken } from '../../utils/auth.js';
import { toast } from 'react-toastify';

import NotLoggedIn from '../components/NotLoggedIn.jsx';
import Loader from '../components/Loader.jsx';
import DashboardActions from '../components/DashboardAction.jsx';
import PublishedSessions from '../components/PublishedSessions.jsx';

const Dashboard = () => {
  const [publicSessions, setPublicSessions] = useState([]);
  const [notLoggedIn, setNotLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    clearToken();
    navigate('/login');
  };

  useEffect(() => {
    axios
      .get('/sessions')
      .then((res) => setPublicSessions(res.data))
      .catch((err) => {
        if (err.response?.status === 401) {
          setNotLoggedIn(true);
        } else {
          toast.error('Failed to load public sessions');
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (notLoggedIn) {
    return <NotLoggedIn message="You need to log in to access the Dashboard." />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-100 p-6">
      <header className="flex justify-between items-center mb-10 border-b border-gray-400 py-2">
        <h1 className="text-3xl font-bold text-gray-800">👋 Welcome to Arvyax</h1>
        <button
          onClick={handleLogout}
          className="flex cursor-pointer items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl shadow transition"
        >
          Logout
        </button>
      </header>

      <DashboardActions />

      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">🌐 Published Sessions</h2>
        <p className="text-sm text-gray-600">Explore sessions published by All users</p>
      </div>

      <PublishedSessions sessions={publicSessions} loading={loading} />

    </div>
  );
};

export default Dashboard;
