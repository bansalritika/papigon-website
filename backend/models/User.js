const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  gender: { type: String, required: true },
  password: { type: String, required: true },
  coinsPurchased: { type: Number, default: 0 },
  totalPaid: { type: Number, default: 0 },
  
  // New fields for password reset
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date }

}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
