require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const txnRoutes = require('./routes/transaction');
const userRoutes = require('./routes/user');
const cors = require('cors');

const app = express();
app.use(express.json());
const allowedOrigins = [
  'https://papigon-website.vercel.app',
  'https://papigon-website-git-main-ritikas-projects-e21caa4f.vercel.app'
];
app.use(cors({
  origin: function(origin, callback) {
    console.log('Request origin:', origin);
    if (!origin) return callback(null, true); // Postman/curl ke liye allow karna

    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true // Agar cookies/auth headers chahiye toh
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
