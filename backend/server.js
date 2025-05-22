require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const txnRoutes = require('./routes/transaction');
const userRoutes = require('./routes/user');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors({
  origin: 'https://papigon-website.vercel.app', // your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // allowed HTTP methods
  credentials: true, // if your frontend uses credentials like cookies or auth headers
}));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/txn', txnRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Start server
app.listen(5000, () => console.log('Server running on port 5000'));
