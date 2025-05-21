import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear user session info (e.g. token, user data)
    localStorage.removeItem('authToken');  // Agar token stored hai
    localStorage.removeItem('userId');
    localStorage.removeItem('userEmail');

    // You can clear all storage if you want
    // localStorage.clear();

    // Redirect user to login page after logout
    navigate('/login');
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <p className="text-lg font-semibold text-gray-700">Logging out...</p>
    </div>
  );
};

export default Logout;
