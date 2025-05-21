import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import { useLocation, Link } from 'react-router-dom';
import Lottie from 'lottie-react';
import checkAnimation from './assets/check-animation.json'; // Checkmark animation JSON

const tokenPriceUSD = 2; // price per token
const usdToInrRate = 82; // example INR conversion rate, update as per live rate

const BuyTokens = () => {
  const location = useLocation();
  const { userEmail, userId } = location.state || {};

  const [coins, setCoins] = useState(1);
  const [totalUSD, setTotalUSD] = useState(tokenPriceUSD);
  const [totalINR, setTotalINR] = useState(tokenPriceUSD * usdToInrRate);
  const [paymentMethod, setPaymentMethod] = useState('GPay');
  const [isMetaMaskConnected, setIsMetaMaskConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setTotalUSD(coins * tokenPriceUSD);
    setTotalINR(coins * tokenPriceUSD * usdToInrRate);
  }, [coins]);

  // Connect MetaMask wallet
  const connectMetaMask = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setWalletAddress(accounts[0]);
        setIsMetaMaskConnected(true);
        setError('');
      } catch {
        setError('MetaMask connection failed');
      }
    } else {
      setError('MetaMask not detected. Please install MetaMask.');
    }
  };

  // Confirm payment handler
  const handleConfirmPayment = async () => {
    setError('');

    if (paymentMethod === 'USDT' && !isMetaMaskConnected) {
      setError('Please connect your MetaMask wallet first.');
      return;
    }

    setLoading(true);

    try {
      // Replace with real MetaMask payment integration if USDT, here just simulation
      const postData = {
        userId,
        email: userEmail,
        coinsPurchased: coins,
        totalPaid: paymentMethod === 'GPay' ? totalUSD : totalUSD, // backend expects USD
        paymentMethod,
        walletAddress: paymentMethod === 'USDT' ? walletAddress : '',
        transactionHash: '', // add actual transaction hash for USDT payments if any
      };

      const response = await axios.post(`${API_BASE_URL}/api/txn/purchase`, postData);

      if (response.data.message === 'Purchase saved successfully') {
        setOrderConfirmed(true);
      } else {
        setError('Unexpected response from server.');
      }
    } catch (err) {
      setError('Error recording payment: ' + (err.response?.data?.error || err.message));
    }

    setLoading(false);
  };

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

  if (orderConfirmed) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-green-100 p-6 text-center">
        <Lottie animationData={checkAnimation} loop={false} className="w-40 h-40" />
        <h2 className="text-2xl font-bold text-green-700 mt-4">Order Confirmed!</h2>
        <p className="text-gray-700 mt-2">Invoice will be sent to your email shortly.</p>
        <Link to="/" className="mt-6 inline-block text-teal-700 underline">
          Go to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-400 to-teal-800 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full mx-auto">
        <h2 className="text-2xl font-bold text-teal-800 mb-6 text-center">Buy Papigon Coins</h2>

        {error && (
          <div className="bg-red-200 text-red-700 p-2 mb-4 rounded text-center font-semibold">
            {error}
          </div>
        )}

        <label className="block mb-4 font-semibold text-gray-700">
          Number of Coins:
          <input
            type="number"
            min={1}
            value={coins}
            onChange={(e) => setCoins(Number(e.target.value))}
            className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
            disabled={loading}
          />
        </label>

        <p className="mt-2 text-lg font-medium text-gray-900">
          Total Price:{' '}
          {paymentMethod === 'GPay' ? (
            <>
              ₹{totalINR.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
              {' '}
              <span className="text-sm text-gray-600">(INR)</span>
            </>
          ) : (
            <>
              ${totalUSD.toFixed(2)} <span className="text-sm text-gray-600">(USD)</span>
            </>
          )}
        </p>

        <label className="block mb-4 font-semibold text-gray-700">
          Select Payment Method:
          <select
            value={paymentMethod}
            onChange={(e) => {
              setPaymentMethod(e.target.value);
              setError('');
            }}
            className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
            disabled={loading}
          >
            <option value="GPay">GPay (INR)</option>
            <option value="USDT">MetaMask (USDT)</option>
          </select>
        </label>

        {paymentMethod === 'GPay' ? (
          <div className="mb-4">
            <h3 className="font-semibold text-teal-700 mb-2">Scan & Pay via GPay</h3>
            <img
              src="/path-to-inr-qr.png"
              alt="INR QR Code"
              className="w-40 mx-auto mb-2"
            />
            <p className="text-sm text-gray-600 text-center">
              Scan the QR code above or pay using your bank's UPI app to Papigon's GPay.
            </p>
            <p className="text-sm text-gray-600 text-center mt-2">
              After payment, click "Buy" to confirm.
            </p>
          </div>
        ) : (
          <div className="mb-4">
            <button
              onClick={connectMetaMask}
              disabled={loading || isMetaMaskConnected}
              className={`w-full py-3 rounded-lg font-semibold transition ${
                isMetaMaskConnected ? 'bg-green-600 hover:bg-green-500' : 'bg-orange-600 hover:bg-orange-500'
              } text-white`}
            >
              {isMetaMaskConnected ? 'Wallet Connected' : 'Connect MetaMask'}
            </button>
            {isMetaMaskConnected && (
              <p className="text-green-700 mt-2 text-sm text-center break-all">{walletAddress}</p>
            )}
          </div>
        )}

        <button
          onClick={handleConfirmPayment}
          disabled={loading}
          className="mt-6 w-full bg-teal-800 text-white py-3 rounded-lg hover:bg-teal-700 transition font-semibold disabled:opacity-50"
        >
          {loading ? 'Processing...' : 'Buy'}
        </button>
      </div>
    </div>
  );
};

export default BuyTokens;
