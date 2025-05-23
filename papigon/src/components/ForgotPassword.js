import React, { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const [loading, setLoading] = useState(false);

 const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  try {
    const res = await axios.post(`${API_BASE_URL}/api/auth/forgot-password`, { email });
    setMessage(res.data.message);
  } catch (err) {
    setMessage(err.response?.data?.message || 'Error occurred');
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-yellow-400 to-teal-700 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-teal-800 mb-4">Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-4 px-4 py-2 border rounded"
            required
          />
          <button
  type="submit"
  className="w-full bg-teal-800 text-white py-2 rounded hover:bg-teal-700 flex justify-center items-center"
  disabled={loading}
>
  {loading ? (
    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
    </svg>
  ) : (
    "Send Reset Link"
  )}
</button>

        </form>
        {message && <p className="mt-4 text-sm text-teal-700">{message}</p>}
      </div>
    </div>
  );
};

export default ForgotPassword;
