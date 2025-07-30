import React, { useState } from 'react';
import axios from '../../utils/axiosInstance.js';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { setToken } from '../../utils/auth.js';
import { Lock, Mail } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/login', { email, password });
      setToken(res.data.token);
      toast.success('Login successful');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-4">
      <form onSubmit={handleLogin} className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">Login to Your Account</h2>

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
          className="w-full py-3 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition"
        >
          Login
        </button>

        <p className="text-center text-sm text-gray-500 mt-4">
          Don't have an account?{' '}
          <span
            onClick={() => navigate('/register')}
            className="text-blue-600 hover:underline cursor-pointer"
          >
            Register
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
