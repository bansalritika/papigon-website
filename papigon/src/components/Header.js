import React, { useState, useRef, useEffect } from 'react';
import { Menu, X, UserCircle2, Settings, LogIn, LogOut } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext'; 

const Header = () => {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setUserDropdown(false);
      }
    }

    if (userDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [userDropdown]);

  const navLinks = [
    { href: '/about', label: 'About Us' },
    { href: '/industries', label: 'Industries' },
    { href: '/roadmap', label: 'Road Map' },
    { href: '/whitepaper', label: 'Whitepaper' },
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/contact', label: 'Contact' },
  ];

  const handleUserClick = () => {
    setUserDropdown(!userDropdown);
  };

  const handleLinkClick = (href) => {
    navigate(href);
    setMenuOpen(false);
  };

  const isActive = (href) => location.hash === `#${href}`;

  return (
    <header className="bg-teal-900 text-white px-6 py-4 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div
          className="text-2xl font-extrabold tracking-tight cursor-pointer"
          onClick={() => navigate('/')}
        >
          <span className="text-white">papi</span>
          <span className="text-yellow-400">gon</span>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleLinkClick(link.href)}
              className={`hover:text-yellow-300 transition ${
                isActive(link.href) ? 'text-yellow-400' : ''
              }`}
            >
              {link.label}
            </button>
          ))}

          {/* User Dropdown */}
          <div className="relative">
            <button onClick={handleUserClick} title="User Menu">
              <UserCircle2 size={28} />
            </button>
            {userDropdown && (
              <div
                ref={dropdownRef}
                className="absolute right-0 mt-2 bg-white text-gray-800 rounded shadow-lg w-44 z-10"
              >
                {!user ? (
                  <>
                    <button
                      onMouseDown={(e) => {
                        e.stopPropagation();
                        setUserDropdown(false);
                        navigate('/register');
                      }}
                      className="flex items-center w-full px-4 py-2 hover:bg-teal-100"
                    >
                      <LogIn size={18} className="mr-2" /> Register
                    </button>
                    <button
                      onMouseDown={(e) => {
                        e.stopPropagation();
                        setUserDropdown(false);
                        navigate('/login');
                      }}
                      className="flex items-center w-full px-4 py-2 hover:bg-teal-100"
                    >
                      <LogIn size={18} className="mr-2" /> Login
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        setUserDropdown(false);
                        navigate('/profile');
                      }}
                      className="flex items-center w-full px-4 py-2 hover:bg-teal-100"
                    >
                      <UserCircle2 size={18} className="mr-2" /> Profile
                    </button>
                    <button
                      onClick={() => {
                        setUserDropdown(false);
                        navigate('/settings');
                      }}
                      className="flex items-center w-full px-4 py-2 hover:bg-teal-100"
                    >
                      <Settings size={18} className="mr-2" /> Settings
                    </button>
                    <button
                      onClick={() => {
                        logout();
                        navigate('/');
                      }}
                      className="flex items-center w-full px-4 py-2 hover:bg-teal-100"
                    >
                      <LogOut size={18} className="mr-2" /> Logout
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </nav>

        {/* Mobile Icons */}
        <div className="md:hidden flex items-center space-x-3">
          <button
            onClick={handleUserClick}
            className="text-white hover:text-yellow-400"
            title="User Menu"
          >
            <UserCircle2 size={28} />
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white hover:text-yellow-400"
            title="Menu"
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Menu */}
      {menuOpen && (
        <div className="md:hidden bg-teal-800 text-sm px-6 py-4 space-y-3 transition-all duration-300 mt-4">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleLinkClick(link.href)}
              className={`block w-full text-left hover:text-yellow-300 ${
                isActive(link.href) ? 'text-yellow-400' : ''
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>
      )}

      {/* Mobile User Dropdown */}
      {userDropdown && (
        <div
          ref={dropdownRef}
          className="md:hidden bg-white text-gray-800 px-6 py-4 space-y-2 shadow-md rounded mt-4"
        >
          {!user ? (
            <>
              <button
                onClick={() => {
                  setUserDropdown(false);
                  navigate('/register');
                }}
                className="flex items-center w-full px-4 py-2 hover:bg-teal-100"
              >
                <LogIn size={18} className="mr-2" /> Register
              </button>
              <button
                onClick={() => {
                  setUserDropdown(false);
                  navigate('/login');
                }}
                className="flex items-center w-full px-4 py-2 hover:bg-teal-100"
              >
                <LogIn size={18} className="mr-2" /> Login
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  setUserDropdown(false);
                  navigate('/profile');
                }}
                className="flex items-center w-full px-4 py-2 hover:bg-teal-100"
              >
                <UserCircle2 size={18} className="mr-2" /> Profile
              </button>
              <button
                onClick={() => {
                  setUserDropdown(false);
                  navigate('/settings');
                }}
                className="flex items-center w-full px-4 py-2 hover:bg-teal-100"
              >
                <Settings size={18} className="mr-2" /> Settings
              </button>
              <button
                onClick={() => {
                  logout();
                  setUserDropdown(false);
                  navigate('/');
                }}
                className="flex items-center w-full px-4 py-2 hover:bg-teal-100"
              >
                <LogOut size={18} className="mr-2" /> Logout
              </button>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
