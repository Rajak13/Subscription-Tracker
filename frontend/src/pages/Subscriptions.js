import { motion } from 'framer-motion';
import React, { useState } from 'react';
import {
    FiEdit,
    FiMoreVertical,
    FiPause,
    FiPlay,
    FiPlus,
    FiSearch,
    FiTrash2
} from 'react-icons/fi';
import { Link } from 'react-router-dom';
import './Subscriptions.css';

const Subscriptions = () => {
  const [subscriptions, setSubscriptions] = useState([
    {
      id: 1,
      name: 'Netflix',
      price: 15.99,
      currency: 'USD',
      frequency: 'monthly',
      category: 'entertainment',
      paymentMethod: 'Credit Card',
      status: 'active',
      startDate: '2024-01-15',
      renewalDate: '2025-02-15'
    },
    {
      id: 2,
      name: 'Spotify Premium',
      price: 9.99,
      currency: 'USD',
      frequency: 'monthly',
      category: 'entertainment',
      paymentMethod: 'PayPal',
      status: 'active',
      startDate: '2024-02-10',
      renewalDate: '2025-02-10'
    },
    {
      id: 3,
      name: 'Adobe Creative Suite',
      price: 52.99,
      currency: 'USD',
      frequency: 'monthly',
      category: 'productivity',
      paymentMethod: 'Credit Card',
      status: 'active',
      startDate: '2024-01-20',
      renewalDate: '2025-02-20'
    },
    {
      id: 4,
      name: 'GitHub Pro',
      price: 4.00,
      currency: 'USD',
      frequency: 'monthly',
      category: 'productivity',
      paymentMethod: 'Credit Card',
      status: 'cancelled',
      startDate: '2024-03-01',
      renewalDate: '2025-03-01'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showDropdown, setShowDropdown] = useState(null);

  const categories = ['all', 'entertainment', 'productivity', 'finance', 'sports', 'news'];
  const statuses = ['all', 'active', 'cancelled', 'expired'];

  const filteredSubscriptions = subscriptions.filter(sub => {
    const matchesSearch = sub.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || sub.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || sub.status === filterStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const totalMonthlySpend = subscriptions
    .filter(sub => sub.status === 'active')
    .reduce((total, sub) => total + sub.price, 0);

  const handleStatusChange = (id, newStatus) => {
    setSubscriptions(prev => 
      prev.map(sub => 
        sub.id === id ? { ...sub, status: newStatus } : sub
      )
    );
    setShowDropdown(null);
  };

  const handleDelete = (id) => {
    setSubscriptions(prev => prev.filter(sub => sub.id !== id));
    setShowDropdown(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'var(--success)';
      case 'cancelled': return 'var(--error)';
      case 'expired': return 'var(--warning)';
      default: return 'var(--text-secondary)';
    }
  };

  const getCategoryIcon = (category) => {
    const icons = {
      entertainment: '🎬',
      productivity: '💼',
      finance: '💰',
      sports: '⚽',
      news: '📰'
    };
    return icons[category] || '📱';
  };

  return (
    <motion.div 
      className="subscriptions-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="subscriptions-header">
        <div>
          <h1 className="page-title">
            My <span className="text-gradient">Subscriptions</span>
          </h1>
          <p className="page-subtitle">
            Manage all your subscriptions in one place
          </p>
        </div>
        <Link to="/subscriptions/add" className="btn btn-primary">
          <FiPlus />
          Add Subscription
        </Link>
      </div>

      <div className="subscriptions-summary">
        <div className="summary-card">
          <div className="summary-value">{subscriptions.length}</div>
          <div className="summary-label">Total Subscriptions</div>
        </div>
        <div className="summary-card">
          <div className="summary-value">
            {subscriptions.filter(s => s.status === 'active').length}
          </div>
          <div className="summary-label">Active</div>
        </div>
        <div className="summary-card">
          <div className="summary-value">${totalMonthlySpend.toFixed(2)}</div>
          <div className="summary-label">Monthly Spend</div>
        </div>
      </div>

      <div className="subscriptions-controls">
        <div className="search-bar">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search subscriptions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filters">
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="filter-select"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="filter-select"
          >
            {statuses.map(status => (
              <option key={status} value={status}>
                {status === 'all' ? 'All Status' : status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="subscriptions-grid">
        {filteredSubscriptions.map((subscription) => (
          <motion.div
            key={subscription.id}
            className="subscription-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="subscription-header">
              <div className="subscription-icon">
                {getCategoryIcon(subscription.category)}
              </div>
              <div className="subscription-actions">
                <button
                  className="action-btn"
                  onClick={() => setShowDropdown(showDropdown === subscription.id ? null : subscription.id)}
                >
                  <FiMoreVertical />
                </button>
                {showDropdown === subscription.id && (
                  <div className="dropdown-menu">
                    <button className="dropdown-item">
                      <FiEdit />
                      Edit
                    </button>
                    <button 
                      className="dropdown-item"
                      onClick={() => handleStatusChange(
                        subscription.id, 
                        subscription.status === 'active' ? 'cancelled' : 'active'
                      )}
                    >
                      {subscription.status === 'active' ? <FiPause /> : <FiPlay />}
                      {subscription.status === 'active' ? 'Pause' : 'Resume'}
                    </button>
                    <button 
                      className="dropdown-item danger"
                      onClick={() => handleDelete(subscription.id)}
                    >
                      <FiTrash2 />
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="subscription-content">
              <h3 className="subscription-name">{subscription.name}</h3>
              <div className="subscription-category">
                {subscription.category}
              </div>
              
              <div className="subscription-price">
                ${subscription.price}
                <span className="price-frequency">/{subscription.frequency}</span>
              </div>

              <div className="subscription-details">
                <div className="detail-item">
                  <span className="detail-label">Payment:</span>
                  <span className="detail-value">{subscription.paymentMethod}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Next Renewal:</span>
                  <span className="detail-value">
                    {new Date(subscription.renewalDate).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div 
                className="subscription-status"
                style={{ color: getStatusColor(subscription.status) }}
              >
                <div 
                  className="status-dot"
                  style={{ backgroundColor: getStatusColor(subscription.status) }}
                ></div>
                {subscription.status.charAt(0).toUpperCase() + subscription.status.slice(1)}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredSubscriptions.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">📱</div>
          <h3>No subscriptions found</h3>
          <p>Try adjusting your search or filters, or add a new subscription.</p>
          <Link to="/subscriptions/add" className="btn btn-primary">
            <FiPlus />
            Add Your First Subscription
          </Link>
        </div>
      )}
    </motion.div>
  );
};

export default Subscriptions;