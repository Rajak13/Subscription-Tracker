import { motion } from 'framer-motion';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import {
    FiArrowLeft,
    FiCalendar,
    FiCreditCard,
    FiDollarSign,
    FiSave,
    FiTag
} from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import './AddSubscription.css';

const AddSubscription = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    currency: 'USD',
    frequency: 'monthly',
    category: 'entertainment',
    paymentMethod: '',
    startDate: new Date().toISOString().split('T')[0],
    renewalDate: ''
  });

  const [errors, setErrors] = useState({});

  const currencies = ['USD', 'EUR', 'INR', 'NRS'];
  const frequencies = ['daily', 'weekly', 'monthly', 'annually'];
  const categories = ['entertainment', 'productivity', 'finance', 'sports', 'news'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }

    // Auto-calculate renewal date when start date or frequency changes
    if (name === 'startDate' || name === 'frequency') {
      const startDate = name === 'startDate' ? new Date(value) : new Date(formData.startDate);
      const frequency = name === 'frequency' ? value : formData.frequency;
      
      if (startDate && frequency) {
        const renewalDate = new Date(startDate);
        
        switch (frequency) {
          case 'daily':
            renewalDate.setDate(renewalDate.getDate() + 1);
            break;
          case 'weekly':
            renewalDate.setDate(renewalDate.getDate() + 7);
            break;
          case 'monthly':
            renewalDate.setMonth(renewalDate.getMonth() + 1);
            break;
          case 'annually':
            renewalDate.setFullYear(renewalDate.getFullYear() + 1);
            break;
          default:
            break;
        }
        
        setFormData(prev => ({
          ...prev,
          renewalDate: renewalDate.toISOString().split('T')[0]
        }));
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Subscription name is required';
    }

    if (!formData.price || parseFloat(formData.price) <= 0) {
      newErrors.price = 'Please enter a valid price';
    }

    if (!formData.paymentMethod.trim()) {
      newErrors.paymentMethod = 'Payment method is required';
    }

    if (!formData.startDate) {
      newErrors.startDate = 'Start date is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Subscription added successfully!');
      navigate('/subscriptions');
    } catch (error) {
      toast.error('Failed to add subscription. Please try again.');
    } finally {
      setLoading(false);
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
      className="add-subscription-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="page-header">
        <button 
          className="back-btn"
          onClick={() => navigate('/subscriptions')}
        >
          <FiArrowLeft />
          Back to Subscriptions
        </button>
        
        <h1 className="page-title">
          Add New <span className="text-gradient">Subscription</span>
        </h1>
        <p className="page-subtitle">
          Track a new subscription service
        </p>
      </div>

      <div className="form-container">
        <motion.form 
          className="subscription-form"
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="form-section">
            <h3 className="section-title">
              <FiTag className="section-icon" />
              Basic Information
            </h3>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name" className="form-label">
                  Subscription Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`input ${errors.name ? 'error' : ''}`}
                  placeholder="e.g., Netflix, Spotify, Adobe"
                />
                {errors.name && <span className="error-text">{errors.name}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="category" className="form-label">
                  Category
                </label>
                <div className="select-wrapper">
                  <span className="select-icon">
                    {getCategoryIcon(formData.category)}
                  </span>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="select"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3 className="section-title">
              <FiDollarSign className="section-icon" />
              Pricing Details
            </h3>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="price" className="form-label">
                  Price *
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className={`input ${errors.price ? 'error' : ''}`}
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                />
                {errors.price && <span className="error-text">{errors.price}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="currency" className="form-label">
                  Currency
                </label>
                <select
                  id="currency"
                  name="currency"
                  value={formData.currency}
                  onChange={handleChange}
                  className="select"
                >
                  {currencies.map(currency => (
                    <option key={currency} value={currency}>
                      {currency}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="frequency" className="form-label">
                  Billing Frequency
                </label>
                <select
                  id="frequency"
                  name="frequency"
                  value={formData.frequency}
                  onChange={handleChange}
                  className="select"
                >
                  {frequencies.map(frequency => (
                    <option key={frequency} value={frequency}>
                      {frequency.charAt(0).toUpperCase() + frequency.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3 className="section-title">
              <FiCreditCard className="section-icon" />
              Payment & Billing
            </h3>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="paymentMethod" className="form-label">
                  Payment Method *
                </label>
                <input
                  type="text"
                  id="paymentMethod"
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleChange}
                  className={`input ${errors.paymentMethod ? 'error' : ''}`}
                  placeholder="e.g., Credit Card, PayPal, Bank Transfer"
                />
                {errors.paymentMethod && <span className="error-text">{errors.paymentMethod}</span>}
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3 className="section-title">
              <FiCalendar className="section-icon" />
              Billing Dates
            </h3>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="startDate" className="form-label">
                  Start Date *
                </label>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  className={`input ${errors.startDate ? 'error' : ''}`}
                />
                {errors.startDate && <span className="error-text">{errors.startDate}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="renewalDate" className="form-label">
                  Next Renewal Date
                </label>
                <input
                  type="date"
                  id="renewalDate"
                  name="renewalDate"
                  value={formData.renewalDate}
                  onChange={handleChange}
                  className="input"
                />
                <small className="form-help">
                  Automatically calculated based on start date and frequency
                </small>
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button 
              type="button" 
              className="btn btn-secondary"
              onClick={() => navigate('/subscriptions')}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className="loading-spinner"></div>
                  Adding...
                </>
              ) : (
                <>
                  <FiSave />
                  Add Subscription
                </>
              )}
            </button>
          </div>
        </motion.form>

        <motion.div 
          className="form-preview"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h3 className="preview-title">Preview</h3>
          <div className="preview-card">
            <div className="preview-header">
              <div className="preview-icon">
                {getCategoryIcon(formData.category)}
              </div>
              <div className="preview-status">Active</div>
            </div>
            
            <div className="preview-content">
              <h4 className="preview-name">
                {formData.name || 'Subscription Name'}
              </h4>
              <div className="preview-category">
                {formData.category}
              </div>
              
              <div className="preview-price">
                {formData.currency} {formData.price || '0.00'}
                <span className="preview-frequency">/{formData.frequency}</span>
              </div>

              <div className="preview-details">
                <div className="preview-detail">
                  <span>Payment:</span>
                  <span>{formData.paymentMethod || 'Not specified'}</span>
                </div>
                {formData.renewalDate && (
                  <div className="preview-detail">
                    <span>Next Renewal:</span>
                    <span>{new Date(formData.renewalDate).toLocaleDateString()}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AddSubscription;