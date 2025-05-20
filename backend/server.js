require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');

const app = express();
app.use(express.json());

const cors = require('cors');
app.use(cors());

const txnRoutes = require('./routes/transaction');
app.use('/api/txn', txnRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

app.use('/api/auth', authRoutes);
app.use('/api/txn', txnRoutes);

app.listen(5000, () => console.log('Server running on port 5000'));
