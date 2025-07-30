import React, { useState } from 'react';
import axios from '../../utils/axiosInstance.js';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail } from 'lucide-react';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/auth/register', { email, password });
      toast.success('Registration successful');
      navigate('/login');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 p-4">
      <form onSubmit={handleRegister} className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">Create an Account</h2>

        <div className="mb-5">
          <label className="block text-sm font-medium mb-1 text-gray-700">Email</label>
          <div className="flex items-center border rounded-xl p-2 bg-gray-50">
            <Mail className="text-gray-400 mr-2" size={20} />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="w-full bg-transparent outline-none"
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-1 text-gray-700">Password</label>
          <div className="flex items-center border rounded-xl p-2 bg-gray-50">
            <Lock className="text-gray-400 mr-2" size={20} />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full bg-transparent outline-none"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full cursor-pointer py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-medium transition"
        >
          Register
        </button>

        <p className="text-center text-sm text-gray-500 mt-4">
          Already have an account?{' '}
          <span
            onClick={() => navigate('/login')}
            className="text-green-600 hover:underline cursor-pointer"
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default Register;
