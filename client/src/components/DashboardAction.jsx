import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, List } from 'lucide-react';

const DashboardActions = () => {
  const navigate = useNavigate();

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
      <div
        onClick={() => navigate('/my-sessions')}
        className="bg-white hover:bg-blue-100 cursor-pointer p-6 rounded-2xl shadow-md flex flex-col items-center justify-center transition group"
      >
        <List size={36} className="text-blue-600 group-hover:scale-110 transition" />
        <h2 className="mt-4 text-xl font-semibold text-gray-700">My Sessions</h2>
        <p className="text-sm text-gray-500 text-center mt-1">View and manage your saved sessions</p>
      </div>

      <div
        onClick={() => navigate('/editor')}
        className="bg-white hover:bg-green-100 cursor-pointer p-6 rounded-2xl shadow-md flex flex-col items-center justify-center transition group"
      >
        <PlusCircle size={36} className="text-green-600 group-hover:scale-110 transition" />
        <h2 className="mt-4 text-xl font-semibold text-gray-700">Create Session</h2>
        <p className="text-sm text-gray-500 text-center mt-1">Design and publish a new session</p>
      </div>
    </section>
  );
};

export default DashboardActions;
