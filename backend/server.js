require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const txnRoutes = require('./routes/transaction');
const userRoutes = require('./routes/user');

const app = express();

const allowedOrigins = [
  'https://papigon-website.vercel.app',
  'https://papigon-website-git-main-ritikas-projects-e21caa4f.vercel.app'
];

const vercelPreviewPattern = /^https:\/\/papigon-website-[a-z0-9\-]+-ritikas-projects-e21caa4f\.vercel\.app$/;

app.use(cors({
  origin: function(origin, callback) {
    console.log('Request origin:', origin);
    if (!origin || allowedOrigins.includes(origin) || vercelPreviewPattern.test(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));


// ✅ Middleware after CORS
app.use(express.json());

// ✅ Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/txn', txnRoutes);

// ✅ DB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// ✅ Start server
app.listen(5000, () => console.log('Server running on port 5000'));
