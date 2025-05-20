const express = require('express');
const router = express.Router();
const User = require('../models/User');
const nodemailer = require('nodemailer');

// Purchase route
router.post('/purchase', async (req, res) => {
  try {
    const { userId, email, coinsPurchased, totalPaid, paymentMethod, transactionHash, walletAddress } = req.body;

    // Update user purchase info
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.coinsPurchased += coinsPurchased;
    user.totalPaid += totalPaid;
    if(walletAddress) user.metaMaskAddress = walletAddress;
    await user.save();

    // Send invoice email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Papigon Purchase Invoice',
      text: `
      Thank you for your purchase!

      Details:
      Coins Purchased: ${coinsPurchased}
      Total Paid: $${totalPaid}
      Payment Method: ${paymentMethod}
      Transaction Hash: ${transactionHash || 'N/A'}

      Regards,
      Papigon Team
      `,
    };

    await transporter.sendMail(mailOptions);

    res.json({ message: 'Purchase saved and invoice sent' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
