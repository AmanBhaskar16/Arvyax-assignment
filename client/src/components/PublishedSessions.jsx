import React from 'react';
import SessionCard from './SessionCard';
import Loader from './Loader';

// Publishedsessions component is for rendering all the published posts by users
const PublishedSessions = ({ sessions = [], loading = false }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <Loader message="Loading published sessions..." />
      </div>
    );
  }

  if (sessions.length === 0) {
    return (
      <p className="text-gray-500 text-center col-span-full">
        No published sessions available.
      </p>
    );
  }

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {sessions.map((session) => (
        <SessionCard
          key={session._id}
          session={session}
          showStatus={false}
          showCreatedAt={true}
          showUpdatedAt={true}
        />
      ))}
    </section>
  );
};

export default PublishedSessions;
