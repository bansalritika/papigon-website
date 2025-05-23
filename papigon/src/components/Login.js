import React, { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  const { email, password } = form;

  try {
    const response = await axios.post(`${API_BASE_URL}/api/auth/login`, { email, password });
    console.log('Login response:', response.data);

    if (response.data && response.data.token) {
      alert('Login Successful');

      // Save to context
      login({
        token: response.data.token,
        email: response.data.email,
        id: response.data.userId,
      });

      // Optional: Also store in localStorage for persistence
      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem('userEmail', response.data.email);
      localStorage.setItem('userId', response.data.userId);

      navigate('/buy');
    }
  } catch (err) {
    console.error(err);
    alert('Login failed');
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen flex items-start justify-center bg-gradient-to-br from-teal-800 to-yellow-400 pt-5 sm:pt-16">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-teal-800 mb-6">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg"
          />
          <button
            type="submit"
            className="w-full bg-teal-800 text-white py-2 rounded-lg hover:bg-teal-700 transition" disabled={loading}
          > {loading ? (
    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
    </svg>
  ) : (
    "Login"
  )}
          </button>
        </form>
        <div className="text-sm text-center mt-4">
          <p>
            Forgot your password?{' '}
            <button onClick={() => navigate('/forgot-password')} className="text-teal-700 underline">
              Reset it
            </button>
          </p>
          <p>
            New user?{' '}
            <button onClick={() => navigate('/register')} className="text-teal-700 underline">
              Register here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
