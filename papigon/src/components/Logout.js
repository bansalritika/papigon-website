import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext'; 

const Logout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

   useEffect(() => {
    logout(); // Clears localStorage and user state
    navigate('/login');
  }, [logout, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <p className="text-lg font-semibold text-gray-700">Logging out...</p>
    </div>
  );
};

export default Logout;
