import React from 'react';
import { Toaster } from 'react-hot-toast';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import { useTheme } from './contexts/ThemeContext';

// Components
import BottomNavigation from './components/layout/BottomNavigation';
import Sidebar from './components/layout/Sidebar';
import LoadingSpinner from './components/ui/LoadingSpinner';

// Pages
import AddSubscription from './pages/AddSubscription';
import Analytics from './pages/Analytics';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Subscriptions from './pages/Subscriptions';

function App() {
  const { user, loading } = useAuth();
  const { theme } = useTheme();

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="App" data-theme={theme}>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: theme === 'dark' ? '#1a1a1a' : '#ffffff',
            color: theme === 'dark' ? '#ffffff' : '#1a1a1a',
            border: `1px solid ${theme === 'dark' ? '#374151' : '#e5e7eb'}`,
          },
        }}
      />

      {!user ? (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      ) : (
        <div className="app-layout">
          <div className="main-content">
            <Sidebar />
            <div className="content-area">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/subscriptions" element={<Subscriptions />} />
                <Route path="/subscriptions/add" element={<AddSubscription />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
              </Routes>
            </div>
          </div>
          <BottomNavigation />
        </div>
      )}
    </div>
  );
}

export default App;