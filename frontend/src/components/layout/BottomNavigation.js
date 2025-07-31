import React from 'react';
import {
  FiBarChart2,
  FiCreditCard,
  FiHome,
  FiPlus,
  FiUser
} from 'react-icons/fi';
import { NavLink } from 'react-router-dom';
import './BottomNavigation.css';

const BottomNavigation = () => {
  const navItems = [
    {
      path: '/dashboard',
      icon: FiHome,
      label: 'Home'
    },
    {
      path: '/subscriptions',
      icon: FiCreditCard,
      label: 'Subs'
    },
    {
      path: '/subscriptions/add',
      icon: FiPlus,
      label: 'Add',
      isSpecial: true
    },
    {
      path: '/analytics',
      icon: FiBarChart2,
      label: 'Stats'
    },
    {
      path: '/profile',
      icon: FiUser,
      label: 'Profile'
    }
  ];

  return (
    <nav className="bottom-navigation">
      <div className="bottom-nav-container">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `bottom-nav-item ${isActive ? 'active' : ''} ${item.isSpecial ? 'special' : ''}`
              }
            >
              <div className="bottom-nav-icon">
                <Icon />
              </div>
              <span className="bottom-nav-label">{item.label}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNavigation;