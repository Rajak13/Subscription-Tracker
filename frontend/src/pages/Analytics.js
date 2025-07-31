import { motion } from 'framer-motion';
import React, { useState } from 'react';
import {
    FiBarChart2,
    FiCalendar,
    FiDollarSign,
    FiPieChart,
    FiTrendingDown,
    FiTrendingUp
} from 'react-icons/fi';
import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from 'recharts';
import './Analytics.css';

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('6months');

  const monthlyData = [
    { month: 'Aug', amount: 89.50 },
    { month: 'Sep', amount: 127.30 },
    { month: 'Oct', amount: 145.20 },
    { month: 'Nov', amount: 132.80 },
    { month: 'Dec', amount: 156.90 },
    { month: 'Jan', amount: 127.50 }
  ];

  const categoryData = [
    { name: 'Entertainment', value: 45.97, count: 3, color: '#ec4899' },
    { name: 'Productivity', value: 56.99, count: 2, color: '#8b5cf6' },
    { name: 'Finance', value: 15.99, count: 1, color: '#06b6d4' },
    { name: 'Sports', value: 8.55, count: 1, color: '#10b981' }
  ];

  const upcomingExpenses = [
    { name: 'Netflix', amount: 15.99, date: '2025-02-15', category: 'Entertainment' },
    { name: 'Spotify', amount: 9.99, date: '2025-02-10', category: 'Entertainment' },
    { name: 'Adobe Creative', amount: 52.99, date: '2025-02-20', category: 'Productivity' },
    { name: 'GitHub Pro', amount: 4.00, date: '2025-02-25', category: 'Productivity' }
  ];

  const stats = {
    totalSpent: 1247.80,
    monthlyAverage: 127.50,
    activeSubscriptions: 12,
    savedThisMonth: 23.50,
    trend: 'up'
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="chart-tooltip">
          <p className="tooltip-label">{label}</p>
          <p className="tooltip-value">
            ${payload[0].value.toFixed(2)}
          </p>
        </div>
      );
    }
    return null;
  };

  const PieTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="chart-tooltip">
          <p className="tooltip-label">{data.name}</p>
          <p className="tooltip-value">${data.value.toFixed(2)}</p>
          <p className="tooltip-count">{data.count} subscription{data.count > 1 ? 's' : ''}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div 
      className="analytics-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="analytics-header">
        <div>
          <h1 className="page-title">
            <span className="text-gradient">Analytics</span> & Insights
          </h1>
          <p className="page-subtitle">
            Track your subscription spending patterns and trends
          </p>
        </div>
        
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="time-range-select"
        >
          <option value="3months">Last 3 Months</option>
          <option value="6months">Last 6 Months</option>
          <option value="1year">Last Year</option>
        </select>
      </div>

      <div className="analytics-stats">
        <motion.div 
          className="stat-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="stat-icon">
            <FiDollarSign />
          </div>
          <div className="stat-content">
            <h3 className="stat-value">${stats.totalSpent}</h3>
            <p className="stat-label">Total Spent</p>
            <div className={`stat-trend ${stats.trend}`}>
              {stats.trend === 'up' ? <FiTrendingUp /> : <FiTrendingDown />}
              <span>+12.5% from last period</span>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="stat-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="stat-icon">
            <FiCalendar />
          </div>
          <div className="stat-content">
            <h3 className="stat-value">${stats.monthlyAverage}</h3>
            <p className="stat-label">Monthly Average</p>
            <div className="stat-trend down">
              <FiTrendingDown />
              <span>-5.2% from last month</span>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="stat-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="stat-icon">
            <FiBarChart2 />
          </div>
          <div className="stat-content">
            <h3 className="stat-value">{stats.activeSubscriptions}</h3>
            <p className="stat-label">Active Subscriptions</p>
            <div className="stat-trend up">
              <FiTrendingUp />
              <span>+2 this month</span>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="stat-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="stat-icon">
            <FiPieChart />
          </div>
          <div className="stat-content">
            <h3 className="stat-value">${stats.savedThisMonth}</h3>
            <p className="stat-label">Saved This Month</p>
            <div className="stat-trend up">
              <FiTrendingUp />
              <span>Cancelled 2 services</span>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="analytics-charts">
        <motion.div 
          className="chart-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="chart-header">
            <h3 className="chart-title">Monthly Spending Trend</h3>
            <p className="chart-subtitle">Your subscription costs over time</p>
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                <XAxis 
                  dataKey="month" 
                  stroke="var(--text-secondary)"
                  fontSize={12}
                />
                <YAxis 
                  stroke="var(--text-secondary)"
                  fontSize={12}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey="amount" 
                  fill="url(#barGradient)"
                  radius={[4, 4, 0, 0]}
                />
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ec4899" />
                    <stop offset="100%" stopColor="#f472b6" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div 
          className="chart-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="chart-header">
            <h3 className="chart-title">Spending by Category</h3>
            <p className="chart-subtitle">Where your money goes</p>
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<PieTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            <div className="pie-legend">
              {categoryData.map((item, index) => (
                <div key={index} className="legend-item">
                  <div 
                    className="legend-color"
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="legend-label">{item.name}</span>
                  <span className="legend-value">${item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div 
        className="upcoming-expenses"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <div className="section-header">
          <h3 className="section-title">Upcoming Expenses</h3>
          <p className="section-subtitle">Next 30 days</p>
        </div>
        
        <div className="expenses-list">
          {upcomingExpenses.map((expense, index) => (
            <div key={index} className="expense-item">
              <div className="expense-info">
                <div className="expense-name">{expense.name}</div>
                <div className="expense-category">{expense.category}</div>
              </div>
              <div className="expense-details">
                <div className="expense-amount">${expense.amount}</div>
                <div className="expense-date">
                  {new Date(expense.date).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="expenses-total">
          <strong>
            Total upcoming: ${upcomingExpenses.reduce((sum, exp) => sum + exp.amount, 0).toFixed(2)}
          </strong>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Analytics;