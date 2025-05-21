import React, { createContext, useContext, useState, useEffect } from 'react';

// Create context
const AuthContext = createContext();

// Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const email = localStorage.getItem('userEmail');
    const id = localStorage.getItem('userId');

    if (token && email && id) {
      setUser({ id, email, token });
    }
  }, []);

  const login = (userData) => {
    localStorage.setItem('authToken', userData.token);
    localStorage.setItem('userEmail', userData.email);
    localStorage.setItem('userId', userData.id);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userId');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use context easily
export const useAuth = () => {
  return useContext(AuthContext);
};
