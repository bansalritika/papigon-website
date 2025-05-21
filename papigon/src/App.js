import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Industries from './pages/Industries';
import Roadmap from './pages/Roadmap';
import Register from './components/Register'; 
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import BuyTokens from './components/BuyTokens';
import Logout from './components/Logout';

function App() {
  return (
    <Router>
      <Header />
      <div className="mt-4">
        <Routes>
          {/* <Route path="/" element={<About />} /> */}
          <Route path="/register" element={<Register />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/industries" element={<Industries />} />
          <Route path="/roadmap" element={<Roadmap />} />
          <Route path="/buy" element={<BuyTokens />} />
          {/*<Route path="/whitepaper" element={<Whitepaper />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/contact" element={<Contact />} /> */}
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
