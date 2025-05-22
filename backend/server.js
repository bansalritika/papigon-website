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
  'https://papigon-website-etl6gz60t-ritikas-projects-e21caa4f.vercel.app',
  'http://localhost:3000'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS: ' + origin));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
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
