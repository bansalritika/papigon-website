import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const location = useLocation();
  const navigate = useNavigate();

  const { userId, userName, userEmail } = location.state || {};

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const { email, password } = form;
    const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });

    console.log('Login response:', response.data);

    if (response.data && response.data.userId) {
      alert('Login Successful');
      navigate('/buy', {
        state: {
          userId: response.data.userId,
          userName: response.data.name,
          userEmail: email,  // we use email from input as you don’t get it from response
        },
      });
    } else {
      alert('Login failed: Invalid response from server');
    }
  } catch (err) {
    alert(err.response?.data?.message || 'Login failed');
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
            className="w-full bg-teal-800 text-white py-2 rounded-lg hover:bg-teal-700 transition"
          >
            Login
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
