// src/pages/SessionEditor.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../../utils/axiosInstance';
import { toast } from 'react-toastify';

import SessionForm from '../components/SessionForm';
import Loader from '../components/Loader';
import NotLoggedIn from '../components/NotLoggedIn';

const SessionEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: '',
    tags: '',
    json_file_url: '',
    status: 'draft',
  });
  const [loading, setLoading] = useState(true);
  const [notLoggedIn, setNotLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuthAndFetch = async () => {
      try {
        if (id) {
          const res = await axios.get(`/my-sessions/${id}`);
          setForm({
            title: res.data.title,
            tags: res.data.tags.join(', '),
            json_file_url: res.data.json_file_url,
            status: res.data.status,
          });
        }
      } catch (err) {
        if (err.response?.status === 401) {
          setNotLoggedIn(true);
        } else {
          toast.error('Failed to fetch session');
        }
      } finally {
        setLoading(false);
      }
    };

    checkAuthAndFetch();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...form,
        tags: form.tags.split(',').map((tag) => tag.trim()),
        _id: id || undefined,
      };

      if (form.status === 'published') {
        await axios.post('/my-sessions/publish', payload);
      } else {
        await axios.post('/my-sessions/save-draft', payload);
      }

      toast.success(`Session ${id ? 'updated' : 'created'} successfully`);
      navigate('/my-sessions');
    } catch (err) {
      if (err.response?.status === 401) {
        setNotLoggedIn(true);
      } else {
        toast.error('Failed to save session');
      }
    }
  };

  if (loading) return <Loader message="Loading session..." />;
  if (notLoggedIn) return <NotLoggedIn message="You need to log in to access the session editor." />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-indigo-100 flex items-center justify-center px-4 py-10">
      <SessionForm form={form} setForm={setForm} onSubmit={handleSubmit} isEdit={!!id} />
    </div>
  );
};

export default SessionEditor;
