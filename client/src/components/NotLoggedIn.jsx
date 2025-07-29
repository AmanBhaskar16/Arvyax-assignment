import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';

const NotLoggedIn = ({ message = "You need to log in to access this page." }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-100 to-red-200">
      <div className="text-center p-8 bg-white shadow-xl rounded-2xl border border-red-300 max-w-md">
        <AlertTriangle size={48} className="text-red-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-red-600 mb-2">401 - Not Logged In</h1>
        <p className="text-gray-700 mb-6">{message}</p>
        <button
          onClick={() => navigate('/login')}
          className="bg-red-600 cursor-pointer hover:bg-red-700 text-white font-semibold px-6 py-2 rounded-xl transition"
        >
          Go to Login
        </button>
      </div>
    </div>
  );
};

export default NotLoggedIn;
