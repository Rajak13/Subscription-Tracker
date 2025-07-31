import { motion } from 'framer-motion';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import {
    FiBell,
    FiEdit,
    FiEye,
    FiEyeOff,
    FiLock,
    FiLogOut,
    FiSave,
    FiSettings,
    FiShield,
    FiTrash2,
    FiUser
} from 'react-icons/fi';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import './Profile.css';

const Profile = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    timezone: 'UTC',
    currency: 'USD'
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    renewalReminders: true,
    weeklyReports: false,
    priceChanges: true
  });

  const [loading, setLoading] = useState(false);

  const tabs = [
    { id: 'profile', label: 'Profile', icon: FiUser },
    { id: 'security', label: 'Security', icon: FiShield },
    { id: 'notifications', label: 'Notifications', icon: FiBell },
    { id: 'preferences', label: 'Preferences', icon: FiSettings },
    { id: 'logout', label: 'Sign Out', icon: FiLogOut, isAction: true }
  ];

  const handleProfileChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value
    });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value
    });
  };

  const handleNotificationChange = (key) => {
    setNotifications({
      ...notifications,
      [key]: !notifications[key]
    });
  };

  const handleProfileSave = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Profile updated successfully!');
      setIsEditing(false);
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSave = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Password updated successfully!');
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      setShowPasswordForm(false);
    } catch (error) {
      toast.error('Failed to update password');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      toast.error('Account deletion is not implemented in this demo');
    }
  };

  const renderProfileTab = () => (
    <div className="tab-content">
      <div className="profile-header">
        <div className="profile-avatar">
          <FiUser />
        </div>
        <div className="profile-info">
          <h3>{user?.name}</h3>
          <p>{user?.email}</p>
        </div>
        <button 
          className="btn btn-secondary"
          onClick={() => setIsEditing(!isEditing)}
        >
          <FiEdit />
          {isEditing ? 'Cancel' : 'Edit Profile'}
        </button>
      </div>

      <div className="form-section">
        <h4 className="section-title">Personal Information</h4>
        
        <div className="form-grid">
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              name="name"
              value={profileData.name}
              onChange={handleProfileChange}
              className="input"
              disabled={!isEditing}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              name="email"
              value={profileData.email}
              onChange={handleProfileChange}
              className="input"
              disabled={!isEditing}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={profileData.phone}
              onChange={handleProfileChange}
              className="input"
              placeholder="Enter phone number"
              disabled={!isEditing}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Timezone</label>
            <select
              name="timezone"
              value={profileData.timezone}
              onChange={handleProfileChange}
              className="select"
              disabled={!isEditing}
            >
              <option value="UTC">UTC</option>
              <option value="EST">Eastern Time</option>
              <option value="PST">Pacific Time</option>
              <option value="GMT">Greenwich Mean Time</option>
            </select>
          </div>
        </div>

        {isEditing && (
          <div className="form-actions">
            <button 
              className="btn btn-primary"
              onClick={handleProfileSave}
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className="loading-spinner"></div>
                  Saving...
                </>
              ) : (
                <>
                  <FiSave />
                  Save Changes
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );

  const renderSecurityTab = () => (
    <div className="tab-content">
      <div className="form-section">
        <h4 className="section-title">Password</h4>
        <p className="section-description">
          Keep your account secure with a strong password
        </p>
        
        {!showPasswordForm ? (
          <button 
            className="btn btn-secondary"
            onClick={() => setShowPasswordForm(true)}
          >
            <FiLock />
            Change Password
          </button>
        ) : (
          <div className="password-form">
            <div className="form-group">
              <label className="form-label">Current Password</label>
              <div className="input-wrapper">
                <input
                  type={showCurrentPassword ? 'text' : 'password'}
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  className="input"
                  placeholder="Enter current password"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                >
                  {showCurrentPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">New Password</label>
              <div className="input-wrapper">
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  className="input"
                  placeholder="Enter new password"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Confirm New Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                className="input"
                placeholder="Confirm new password"
              />
            </div>

            <div className="form-actions">
              <button 
                className="btn btn-secondary"
                onClick={() => setShowPasswordForm(false)}
              >
                Cancel
              </button>
              <button 
                className="btn btn-primary"
                onClick={handlePasswordSave}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div className="loading-spinner"></div>
                    Updating...
                  </>
                ) : (
                  <>
                    <FiSave />
                    Update Password
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="form-section danger-zone">
        <h4 className="section-title">Danger Zone</h4>
        <p className="section-description">
          Permanently delete your account and all associated data
        </p>
        
        <button 
          className="btn btn-danger"
          onClick={handleDeleteAccount}
        >
          <FiTrash2 />
          Delete Account
        </button>
      </div>
    </div>
  );

  const renderNotificationsTab = () => (
    <div className="tab-content">
      <div className="form-section">
        <h4 className="section-title">Email Notifications</h4>
        <p className="section-description">
          Choose what notifications you'd like to receive
        </p>
        
        <div className="notification-settings">
          {Object.entries(notifications).map(([key, value]) => (
            <div key={key} className="notification-item">
              <div className="notification-info">
                <h5 className="notification-title">
                  {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </h5>
                <p className="notification-description">
                  {getNotificationDescription(key)}
                </p>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={value}
                  onChange={() => handleNotificationChange(key)}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderPreferencesTab = () => (
    <div className="tab-content">
      <div className="form-section">
        <h4 className="section-title">Appearance</h4>
        <p className="section-description">
          Customize how the app looks and feels
        </p>
        
        <div className="preference-item">
          <div className="preference-info">
            <h5 className="preference-title">Theme</h5>
            <p className="preference-description">
              Choose between light and dark mode
            </p>
          </div>
          <button 
            className="btn btn-secondary"
            onClick={toggleTheme}
          >
            {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
          </button>
        </div>

        <div className="preference-item">
          <div className="preference-info">
            <h5 className="preference-title">Default Currency</h5>
            <p className="preference-description">
              Set your preferred currency for new subscriptions
            </p>
          </div>
          <select
            name="currency"
            value={profileData.currency}
            onChange={handleProfileChange}
            className="select"
          >
            <option value="USD">USD ($)</option>
            <option value="EUR">EUR (€)</option>
            <option value="INR">INR (₹)</option>
            <option value="NRS">NRS (Rs)</option>
          </select>
        </div>
      </div>
    </div>
  );

  const getNotificationDescription = (key) => {
    const descriptions = {
      emailNotifications: 'Receive general email notifications',
      renewalReminders: 'Get notified before subscriptions renew',
      weeklyReports: 'Weekly spending summary reports',
      priceChanges: 'Alerts when subscription prices change'
    };
    return descriptions[key] || '';
  };

  return (
    <motion.div 
      className="profile-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="profile-header-main">
        <h1 className="page-title">
          Account <span className="text-gradient">Settings</span>
        </h1>
        <p className="page-subtitle">
          Manage your account preferences and security settings
        </p>
      </div>

      <div className="profile-container">
        <div className="profile-sidebar">
          <nav className="profile-nav">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  className={`nav-tab ${activeTab === tab.id ? 'active' : ''} ${tab.isAction ? 'action-tab' : ''}`}
                  onClick={() => {
                    if (tab.id === 'logout') {
                      logout();
                    } else {
                      setActiveTab(tab.id);
                    }
                  }}
                >
                  <Icon />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="profile-content">
          {activeTab === 'profile' && renderProfileTab()}
          {activeTab === 'security' && renderSecurityTab()}
          {activeTab === 'notifications' && renderNotificationsTab()}
          {activeTab === 'preferences' && renderPreferencesTab()}
        </div>
      </div>
    </motion.div>
  );
};

export default Profile;