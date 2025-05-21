import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import { AuthContext } from '../AuthContext';

const Profile = () => {
  const { token, logout } = useContext(AuthContext);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!token) return;

    axios
      .get('http://${API_BASE_URL}/api/users/profile', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        alert('Session expired. Please login again.');
        logout();
      });
  }, [token, logout]);

  if (!token) return <div>Please login first.</div>;

  if (!user) return <div>Loading...</div>;

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 border rounded shadow">
      <h1 className="text-3xl font-bold mb-4">User Profile</h1>
      <p><strong>ID:</strong> {user._id}</p>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Phone:</strong> {user.phone || '-'}</p>
      <p><strong>Gender:</strong> {user.gender || '-'}</p>
      <p><strong>Joined On:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
    </div>
  );
};

export default Profile;
