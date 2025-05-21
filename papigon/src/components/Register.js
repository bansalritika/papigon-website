import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    gender: 'male',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/register', form);
      alert('Registration Successful');
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.message || 'Registration Failed');
    }
  };

  return (
    <div className="min-h-screen items-start flex justify-center bg-gradient-to-br from-teal-800 to-yellow-400 px-4 pt-5 sm:pt-16">
      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl w-full max-w-sm sm:max-w-md">
        <h2 className="text-xl sm:text-2xl font-bold text-teal-800 mb-6 text-center">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg text-sm"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg text-sm"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg text-sm"
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg text-sm"
            required
          />

          {/* Gender Radio Buttons */}
          <div className="text-sm">
            <div className="flex space-x-4">
              <label className="flex items-center space-x-1">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={form.gender === 'male'}
                  onChange={handleChange}
                  className="accent-teal-700"
                />
                <span>Male</span>
              </label>
              <label className="flex items-center space-x-1">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={form.gender === 'female'}
                  onChange={handleChange}
                  className="accent-teal-700"
                />
                <span>Female</span>
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-teal-800 text-white py-2 rounded-lg hover:bg-teal-700 transition text-sm"
          >
            Register
          </button>
        </form>

        {/* Links */}
        <div className="text-center text-sm mt-4 text-gray-600">
          Already a user?{' '}
          <span
            onClick={() => navigate('/login')}
            className="text-teal-700 hover:underline cursor-pointer"
          >
            Login
          </span>
        </div>
        <div className="text-center text-sm mt-1 text-gray-600">
          <span
            onClick={() => navigate('/forgot-password')}
            className="text-yellow-600 hover:underline cursor-pointer"
          >
            Forgot Password?
          </span>
        </div>
      </div>
    </div>
  );
};

export default Register;
