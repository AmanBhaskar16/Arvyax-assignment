
import React from 'react';
import { FileText, Edit2, Save, Upload } from 'lucide-react';
import axios from '../../utils/axiosInstance';
import { toast } from 'react-toastify';

// Session card component used for showing sessions in published sessions and my-sessions
const SessionCard = ({
  session,
  showStatus = false,
  showCreatedAt = false,
  showUpdatedAt = false,
  onEditClick = null,
  onStatusChange = null, // callback to refresh data in parent
}) => {
  // function to save drafted session
  const handleSaveDraft = async () => {
    try {
      await axios.post('/api/my-sessions/save-draft', {
        _id: session._id,
        ...session,
      });
      toast.success('Draft saved successfully!');
      onStatusChange?.(); // Trigger refresh
    } catch (err) {
      toast.error('Failed to save draft.');
    }
  };

  // function to publish a drafted session
  const handlePublish = async () => {
    try {
      await axios.post('/api/my-sessions/publish', {
        _id: session._id,
        ...session,
      });
      toast.success('Session published!');
      onStatusChange?.(); // Trigger refresh
    } catch (err) {
      toast.error('Failed to publish session.');
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition border border-gray-100 flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-2">
          <FileText className="text-blue-500" size={22} />
          <h3 className="text-lg font-semibold text-gray-800 break-words">{session.title}</h3>
        </div>
        {showStatus && (
          <span
            className={`text-xs px-3 py-1 rounded-full font-medium ${
              session.status === 'published'
                ? 'bg-green-100 text-green-700'
                : 'bg-yellow-100 text-yellow-700'
            }`}
          >
            {session.status}
          </span>
        )}
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-3">
        {session.tags?.map((tag, i) => (
          <span
            key={i}
            className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full font-medium"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Timestamps */}
      {showCreatedAt && session.created_at && (
        <p className="text-xs text-gray-500 mt-1">
          Created at:{' '}
          {new Date(session.created_at).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}
        </p>
      )}
      {showUpdatedAt && session.updated_at && (
        <p className="text-xs text-gray-500 mt-1">
          Updated at:{' '}
          {new Date(session.updated_at).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}
        </p>
      )}

      <div className="flex-grow" />

      {/* Footer Actions */}
      <div className="mt-4 flex flex-wrap gap-2 items-center justify-between">
        <div className="flex flex-wrap gap-2">
          {onEditClick && (
            <button
              onClick={onEditClick}
              className="flex items-center gap-2 cursor-pointer text-sm bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition"
            >
              <Edit2 size={16} />
              Edit
            </button>
          )}

          {session.status === 'draft' && (
            <>
              <button
                onClick={handleSaveDraft}
                className="flex items-center gap-2 cursor-pointer text-sm bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md transition"
              >
                <Save size={16} />
                Save Draft
              </button>
              <button
                onClick={handlePublish}
                className="flex items-center gap-2 cursor-pointer text-sm bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition"
              >
                <Upload size={16} />
                Publish
              </button>
            </>
          )}
        </div>

        {session.json_file_url && (
          <a
            href={session.json_file_url}
            target="_blank"
            rel="noreferrer"
            className="text-sm cursor-pointer bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-md transition"
          >
            View JSON
          </a>
        )}
      </div>
    </div>
  );
};

export default SessionCard;
