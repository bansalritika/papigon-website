import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../config';


const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const { token } = useParams();
  const navigate = useNavigate();
 const [loading, setLoading] = useState(false);
  const handleReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${API_BASE_URL}/api/auth/reset-password/${token}`, { password });
      alert('Password reset successfully');
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to reset password');
    }finally {
    setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-teal-900 to-yellow-400 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-teal-800 mb-4">Reset Password</h2>
        <form onSubmit={handleReset}>
          <input
            type="password"
            placeholder="New password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-4 px-4 py-2 border rounded"
            required
          />
          <button type="submit" className="w-full bg-teal-800 text-white py-2 rounded hover:bg-teal-700" disabled={loading}>{loading ? (
             <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
    </svg>
  ) : (
    "Reset Password"
  )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
