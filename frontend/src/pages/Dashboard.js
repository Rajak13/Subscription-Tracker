import { motion } from 'framer-motion';
import React, { useState } from 'react';
import {
    FiAlertCircle,
    FiArrowRight,
    FiCalendar,
    FiCreditCard,
    FiDollarSign,
    FiPlus,
    FiTrendingUp,
    FiTrendingDown,
    FiActivity
} from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Dashboard.css';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats] = useState({
    totalSubscriptions: { value: 12, trend: 'up', change: '+2 this month' },
    monthlySpend: { value: 127.50, trend: 'down', change: '-5.2% from last month' },
    nextRenewal: { value: 3, trend: 'up', change: 'days remaining' },
    activeServices: { value: 10, trend: 'up', change: '+2 this month' }
  });

  const [recentSubscriptions] = useState([
    {
      id: 1,
      name: 'Netflix',
      price: 15.99,
      currency: 'USD',
      renewalDate: '2025-02-15',
      status: 'active',
      category: 'entertainment'
    },
    {
      id: 2,
      name: 'Spotify',
      price: 9.99,
      currency: 'USD',
      renewalDate: '2025-02-10',
      status: 'active',
      category: 'entertainment'
    },
    {
      id: 3,
      name: 'Adobe Creative Suite',
      price: 52.99,
      currency: 'USD',
      renewalDate: '2025-02-20',
      status: 'active',
      category: 'productivity'
    }
  ]);

  const [upcomingRenewals] = useState([
    {
      id: 1,
      name: 'Spotify',
      price: 9.99,
      renewalDate: '2025-02-10',
      daysLeft: 3
    },
    {
      id: 2,
      name: 'Netflix',
      price: 15.99,
      renewalDate: '2025-02-15',
      daysLeft: 8
    }
  ]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      className="dashboard"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div 
        className="dashboard-header"
        variants={itemVariants}
      >
        <div>
          <h1 className="dashboard-title">
            Welcome back, <span className="text-gradient">{user?.name}</span>
          </h1>
          <p className="dashboard-subtitle">
            Here's an overview of your subscription spending
          </p>
        </div>
        <Link to="/subscriptions/add" className="btn btn-primary">
          <FiPlus />
          Add Subscription
        </Link>
      </motion.div>

      <motion.div className="stats-grid" variants={itemVariants}>
        <div className="stat-card">
          <div className="stat-icon">
            <FiCreditCard />
          </div>
          <div className="stat-content">
            <h3 className="stat-value">{stats.totalSubscriptions.value}</h3>
            <p className="stat-label">Total Subscriptions</p>
            <div className={`stat-trend ${stats.totalSubscriptions.trend}`}>
              {stats.totalSubscriptions.trend === 'up' ? <FiTrendingUp /> : <FiTrendingDown />}
              <span>{stats.totalSubscriptions.change}</span>
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <FiDollarSign />
          </div>
          <div className="stat-content">
            <h3 className="stat-value">${stats.monthlySpend.value}</h3>
            <p className="stat-label">Monthly Spend</p>
            <div className={`stat-trend ${stats.monthlySpend.trend}`}>
              {stats.monthlySpend.trend === 'up' ? <FiTrendingUp /> : <FiTrendingDown />}
              <span>{stats.monthlySpend.change}</span>
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <FiCalendar />
          </div>
          <div className="stat-content">
            <h3 className="stat-value">{stats.nextRenewal.value} days</h3>
            <p className="stat-label">Next Renewal</p>
            <div className={`stat-trend ${stats.nextRenewal.trend}`}>
              <FiAlertCircle />
              <span>{stats.nextRenewal.change}</span>
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <FiActivity />
          </div>
          <div className="stat-content">
            <h3 className="stat-value">{stats.activeServices.value}</h3>
            <p className="stat-label">Active Services</p>
            <div className={`stat-trend ${stats.activeServices.trend}`}>
              {stats.activeServices.trend === 'up' ? <FiTrendingUp /> : <FiTrendingDown />}
              <span>{stats.activeServices.change}</span>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="dashboard-content">
        <motion.div className="dashboard-section" variants={itemVariants}>
          <div className="section-header">
            <h2 className="section-title">Recent Subscriptions</h2>
            <Link to="/subscriptions" className="section-link">
              View All <FiArrowRight />
            </Link>
          </div>
          
          <div className="subscriptions-list">
            {recentSubscriptions.map((subscription) => (
              <div key={subscription.id} className="subscription-item">
                <div className="subscription-info">
                  <div className="subscription-name">{subscription.name}</div>
                  <div className="subscription-category">{subscription.category}</div>
                </div>
                <div className="subscription-details">
                  <div className="subscription-price">
                    ${subscription.price}/{subscription.frequency || 'month'}
                  </div>
                  <div className={`subscription-status ${subscription.status}`}>
                    {subscription.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div className="dashboard-section" variants={itemVariants}>
          <div className="section-header">
            <h2 className="section-title">
              <FiAlertCircle className="section-icon" />
              Upcoming Renewals
            </h2>
          </div>
          
          <div className="renewals-list">
            {upcomingRenewals.map((renewal) => (
              <div key={renewal.id} className="renewal-item">
                <div className="renewal-info">
                  <div className="renewal-name">{renewal.name}</div>
                  <div className="renewal-date">
                    Renews in {renewal.daysLeft} days
                  </div>
                </div>
                <div className="renewal-price">
                  ${renewal.price}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Dashboard;