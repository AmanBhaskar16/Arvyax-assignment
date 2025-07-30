import React, { useEffect, useState } from 'react';
import axios from '../../utils/axiosInstance.js';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import NotLoggedIn from '../components/NotLoggedIn';
import Loader from '../components/Loader';
import SessionCard from '../components/SessionCard';

const MySessions = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notLoggedIn, setNotLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const res = await axios.get('/api/my-sessions');
        setSessions(res.data);
      } catch (err) {
        if (err.response?.status === 401) {
          setNotLoggedIn(true);
        } else {
          toast.error('Failed to load sessions');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, [sessions]);

  if (loading) return <Loader message="Loading sessions..." />;
  if (notLoggedIn) return <NotLoggedIn message="You need to log in to access My Sessions." />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-8 text-center text-gray-800">📝 My Sessions </h2>

        {sessions.length === 0 ? (
        <div className="text-center mt-16 p-10 bg-white border border-gray-200 rounded-3xl shadow-xl max-w-xl mx-auto">
          <div className="mb-6 flex justify-center">
            <svg
              className="w-16 h-16 text-blue-400"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </div>

          <h3 className="text-2xl font-semibold text-gray-800 mb-2">No Sessions Found</h3>
          <p className="text-gray-500 mb-6">
            You haven’t created any sessions yet. Start by creating your first session!
          </p>

          <button
            onClick={() => navigate('/editor')}
            className="inline-block bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-semibold px-6 py-3 rounded-xl shadow-md transition-all duration-200 cursor-pointer"
          >
            Create Session
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sessions.map((session) => (
            <SessionCard
              key={session._id}
              session={session}
              showStatus={true}
              showCreatedAt={true}
              showUpdatedAt ={true}
              onEditClick={() => navigate(`/editor/${session._id}`)}
            />
          ))}
        </div>
      )}

      </div>
    </div>
  );
};

export default MySessions;
