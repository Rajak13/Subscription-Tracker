import React from 'react';
import {
  FiBarChart2,
  FiCalendar,
  FiCreditCard,
  FiHome,
  FiLogOut,
  FiMoon,
  FiPlus,
  FiSun,
  FiTrendingUp,
  FiUser
} from 'react-icons/fi';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import './Sidebar.css';

const Sidebar = () => {
  const { logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  
  const navItems = [
    {
      path: '/dashboard',
      icon: FiHome,
      label: 'Dashboard',
      description: 'Overview & stats'
    },
    {
      path: '/subscriptions',
      icon: FiCreditCard,
      label: 'Subscriptions',
      description: 'Manage all subscriptions'
    },
    {
      path: '/subscriptions/add',
      icon: FiPlus,
      label: 'Add Subscription',
      description: 'Track new service'
    },
    {
      path: '/analytics',
      icon: FiBarChart2,
      label: 'Analytics',
      description: 'Spending insights'
    },
    {
      path: '/profile',
      icon: FiUser,
      label: 'Profile',
      description: 'Account settings'
    }
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-content">
        {/* Brand Header */}
        <div className="sidebar-header">
          <div className="brand-section">
            <span className="brand-text">SubTracker</span>
          </div>
          <div className="header-controls">
            <button 
              className="theme-toggle"
              onClick={toggleTheme}
              title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? <FiMoon /> : <FiSun />}
            </button>
          </div>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `nav-item ${isActive ? 'active' : ''}`
                }
              >
                <div className="nav-item-icon">
                  <Icon />
                </div>
                <div className="nav-item-content">
                  <span className="nav-item-label">{item.label}</span>
                  <span className="nav-item-description">{item.description}</span>
                </div>
              </NavLink>
            );
          })}
          
          {/* Logout Button */}
          <button 
            className="nav-item logout-nav-item"
            onClick={logout}
            title="Sign Out"
          >
            <div className="nav-item-icon">
              <FiLogOut />
            </div>
            <div className="nav-item-content">
              <span className="nav-item-label">Sign Out</span>
              <span className="nav-item-description">Logout from account</span>
            </div>
          </button>
        </nav>

        <div className="sidebar-footer">
          <div className="quick-stats">
            <div className="stat-item">
              <FiTrendingUp className="stat-icon" />
              <div className="stat-content">
                <span className="stat-label">Monthly Spend</span>
                <span className="stat-value">$127.50</span>
              </div>
            </div>
            <div className="stat-item">
              <FiCalendar className="stat-icon" />
              <div className="stat-content">
                <span className="stat-label">Next Renewal</span>
                <span className="stat-value">3 days</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;