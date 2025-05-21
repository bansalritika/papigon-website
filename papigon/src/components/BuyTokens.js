import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, Link } from 'react-router-dom';

const tokenPriceUSD = 2; // price per token

const BuyTokens = () => {
  const location = useLocation();
  const { userEmail, userId } = location.state || {};

  // Declare hooks before any return
  const [coins, setCoins] = useState(1);
  const [totalUSD, setTotalUSD] = useState(tokenPriceUSD);
  const [walletAddress, setWalletAddress] = useState('');

  useEffect(() => {
    setTotalUSD(coins * tokenPriceUSD);
  }, [coins]);

  if (!userEmail || !userId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-800 to-yellow-400 pt-5 sm:pt-16">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md mx-auto text-center">
          Please login again.{' '}
          <Link to="/login" className="text-blue-500 underline">
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  const handleConfirmPayment = async () => {
    try {
      await axios.post('http://localhost:5000/api/txn/purchase', {
        userId,
        email: userEmail,
        coinsPurchased: coins,
        totalPaid: totalUSD,
        paymentMethod: 'GPay',
        walletAddress, // optional
      });

      alert('Payment recorded! Invoice will be sent to your email.');
    } catch (err) {
      alert('Error recording payment: ' + err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-400 to-teal-800">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full mx-auto">
        <h2 className="text-2xl font-bold text-teal-800 mb-6 text-center">Buy Papigon Coins</h2>

        <label className="block mb-2 font-semibold text-gray-700">
          Number of Coins:
          <input
            type="number"
            min={1}
            value={coins}
            onChange={(e) => setCoins(Number(e.target.value))}
            className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
          />
        </label>

        <p className="mt-2 text-lg font-medium text-gray-900">Total Price (USD): ${totalUSD.toFixed(2)}</p>

        <div className="mt-6">
          <h3 className="font-semibold text-teal-700 mb-2"> Scan & Pay via GPay</h3>
          <img src="/path-to-inr-qr.png" alt="INR QR Code" className="w-40 mx-auto mb-2" />
          <p className="text-sm text-gray-600 text-center">Scan to pay in INR</p>
        </div>

        <label className="block mt-6 mb-2 font-semibold text-gray-700">
          Optional: Your Wallet Address (for airdrop)
          <input
            type="text"
            value={walletAddress}
            onChange={(e) => setWalletAddress(e.target.value)}
            placeholder="Enter your wallet address (optional)"
            className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
          />
        </label>

        <button
          onClick={handleConfirmPayment}
          className="mt-6 w-full bg-teal-800 text-white py-3 rounded-lg hover:bg-teal-700 transition font-semibold"
        >
          I've Paid – Confirm & Send Invoice
        </button>
      </div>
    </div>
  );
};

export default BuyTokens;
