import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import { useAuth } from '../AuthContext'; // ✅ Correct usage

const Profile = () => {
  const { user: authUser, logout } = useAuth(); // ✅ Destructure from useAuth()
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!authUser?.token) return;

    axios
      .get(`http://${API_BASE_URL}/api/users/profile`, {
        headers: { Authorization: `Bearer ${authUser.token}` },
      })
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        alert('Session expired. Please login again.');
        logout();
      });
  }, [authUser?.token, logout]);

  if (!authUser?.token) return <div>Please login first.</div>;
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
