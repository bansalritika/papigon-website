const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Purchase route (without email)
router.post('/purchase', async (req, res) => {
  try {
    const { userId, email, coinsPurchased, totalPaid, paymentMethod, transactionHash, walletAddress } = req.body;

    // Update user purchase info
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.coinsPurchased += coinsPurchased;
    user.totalPaid += totalPaid;
    if (walletAddress) user.metaMaskAddress = walletAddress;
    await user.save();

    res.json({ message: 'Purchase saved successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
