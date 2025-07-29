
import React, { useEffect, useState } from 'react';
import axios from '../../utils/axiosInstance.js';
import { toast } from 'react-toastify';

const PublicSessions = () => {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const fetchPublicSessions = async () => {
      try {
        const res = await axios.get('/sessions');
        setSessions(res.data);
      } catch (err) {
        toast.error('Failed to load public sessions');
      }
    };

    fetchPublicSessions();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-indigo-100 p-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Explore Public Sessions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sessions.map((session) => (
            <div key={session._id} className="bg-white rounded-xl shadow-md p-5">
              <h3 className="text-xl font-semibold text-gray-700 mb-2">{session.title}</h3>
              <div className="flex flex-wrap gap-2 mb-3">
                {session.tags.map((tag, index) => (
                  <span key={index} className="bg-indigo-100 text-indigo-700 px-2 py-1 text-xs rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
              <p className="text-sm text-gray-500 mb-2">Published on: {new Date(session.created_at).toLocaleDateString()}</p>
              <a
                href={session.json_file_url}
                target="_blank"
                rel="noreferrer"
                className="block text-sm text-indigo-600 hover:underline"
              >
                View JSON
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PublicSessions;
