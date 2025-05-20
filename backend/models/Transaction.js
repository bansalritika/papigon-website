const mongoose = require('mongoose');

const txnSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  coinQty: Number,
  totalAmount: Number,
  method: String, // 'metamask' or 'gpay'
  status: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Transaction', txnSchema);
