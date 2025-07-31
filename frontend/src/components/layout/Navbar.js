import React, { useState } from 'react';
import { FiLogOut, FiMenu, FiMoon, FiSun, FiUser, FiX } from 'react-icons/fi';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-left">
          <button 
            className="mobile-menu-btn"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            {showMobileMenu ? <FiX /> : <FiMenu />}
          </button>
          
          <div className="navbar-brand">
            <span className="brand-text text-gradient">SubTracker</span>
          </div>
        </div>

        <div className="navbar-right">
          <button 
            className="theme-toggle btn-ghost"
            onClick={toggleTheme}
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? <FiMoon /> : <FiSun />}
          </button>

          <div className="user-menu">
            <button 
              className="user-avatar"
              onClick={() => setShowUserMenu(!showUserMenu)}
            >
              <FiUser />
              <span className="user-name">{user?.name}</span>
            </button>

            {showUserMenu && (
              <div className="user-dropdown">
                <div className="user-info">
                  <div className="user-name-full">{user?.name}</div>
                  <div className="user-email">{user?.email}</div>
                </div>
                <hr />
                <button className="dropdown-item" onClick={logout}>
                  <FiLogOut />
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;