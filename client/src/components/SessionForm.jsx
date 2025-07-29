// src/components/sessionEditor/SessionForm.jsx
import React from 'react';

const SessionForm = ({ form, setForm, onSubmit, isEdit }) => {
  return (
    <form
      onSubmit={onSubmit}
      className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-10 border border-gray-100"
    >
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        {isEdit ? 'Edit Session' : 'Create New Session'}
      </h2>

      <div className="space-y-5">
        <label className="block">
          <span className="text-gray-700 font-medium">Title</span>
          <input
            type="text"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
            className="w-full mt-2 p-3 rounded-xl bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            placeholder="Enter session title"
          />
        </label>

        <label className="block">
          <span className="text-gray-700 font-medium">Tags (comma separated)</span>
          <input
            type="text"
            value={form.tags}
            onChange={(e) => setForm({ ...form, tags: e.target.value })}
            className="w-full mt-2 p-3 rounded-xl bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            placeholder="e.g. yoga, morning, fitness"
          />
        </label>

        <label className="block">
          <span className="text-gray-700 font-medium">JSON File URL</span>
          <input
            type="url"
            value={form.json_file_url}
            onChange={(e) => setForm({ ...form, json_file_url: e.target.value })}
            required
            className="w-full mt-2 p-3 rounded-xl bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            placeholder="https://example.com/session.json"
          />
        </label>

        <label className="block">
          <span className="text-gray-700 font-medium">Status</span>
          <select
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
            className="w-full mt-2 p-3 rounded-xl bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </label>
      </div>

      <button
        type="submit"
        className="mt-8 w-full bg-blue-600 cursor-pointer hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition"
      >
        {isEdit ? 'Update Session' : 'Create Session'}
      </button>
    </form>
  );
};

export default SessionForm;
