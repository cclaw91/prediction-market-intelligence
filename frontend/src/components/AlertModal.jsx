import React, { useState } from 'react';
import { X, Bell, AlertCircle } from 'lucide-react';
import { alertAPI } from '../services/api';

const AlertModal = ({ market, onClose, onSuccess }) => {
  const [alertType, setAlertType] = useState('price_change');
  const [threshold, setThreshold] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const alertTypes = [
    { value: 'price_change', label: 'Price Change', description: 'Alert when price moves significantly', icon: '📈' },
    { value: 'volume_spike', label: 'Volume Spike', description: 'Alert when volume exceeds threshold', icon: '📊' },
    { value: 'liquidity_low', label: 'Low Liquidity', description: 'Alert when liquidity drops below threshold', icon: '💧' },
    { value: 'closing_soon', label: 'Closing Soon', description: 'Alert when market closes within 24 hours', icon: '⏰' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Create alert
      await alertAPI.createAlert({
        market_id: market.id,
        alert_type: alertType,
        threshold: parseFloat(threshold) || 0,
        message: `Alert for ${market.question}`,
      });

      // Subscribe if email provided
      if (email) {
        await alertAPI.subscribe({
          email,
          market_id: market.id,
          alert_types: [alertType],
        });
      }

      onSuccess();
      onClose();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create alert');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-400 rounded-lg flex items-center justify-center">
              <Bell className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Set Alert</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Market Info */}
        <div className="p-6 pb-4">
          <div className="card p-4 bg-gradient-to-br from-blue-50 to-purple-50 border-blue-100">
            <p className="font-semibold text-gray-900 mb-2 line-clamp-2">{market.question}</p>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Score: <span className="font-semibold text-gray-900">{market.score}</span></span>
              <span className="badge badge-primary">{market.category || 'Market'}</span>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 pb-6 space-y-5">
          {/* Alert Type */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-3">
              Alert Type
            </label>
            <div className="space-y-2">
              {alertTypes.map((type) => (
                <label
                  key={type.value}
                  className={`flex items-start p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                    alertType === type.value
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  <input
                    type="radio"
                    name="alertType"
                    value={type.value}
                    checked={alertType === type.value}
                    onChange={(e) => setAlertType(e.target.value)}
                    className="mt-1 mr-3"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-lg">{type.icon}</span>
                      <span className="font-semibold text-gray-900">{type.label}</span>
                    </div>
                    <p className="text-sm text-gray-600">{type.description}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Threshold (conditional) */}
          {(alertType === 'volume_spike' || alertType === 'liquidity_low') && (
            <div className="animate-fade-in">
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Threshold Amount
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">$</span>
                <input
                  type="number"
                  value={threshold}
                  onChange={(e) => setThreshold(e.target.value)}
                  placeholder="Enter amount"
                  className="input pl-8"
                  required
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">
                {alertType === 'volume_spike' ? 'Trigger alert when volume exceeds this amount' : 'Trigger alert when liquidity drops below this amount'}
              </p>
            </div>
          )}

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Email Notifications <span className="text-gray-400 font-normal">(Optional)</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="input"
            />
            <p className="text-xs text-gray-500 mt-2 flex items-start">
              <AlertCircle className="w-3.5 h-3.5 mr-1.5 mt-0.5 flex-shrink-0" />
              Get notified via email when this alert triggers (coming soon)
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="card p-4 bg-red-50 border-red-200 animate-fade-in">
              <div className="flex items-start">
                <AlertCircle className="w-5 h-5 text-red-600 mr-2 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-800">{error}</p>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 btn-secondary"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <div className="spinner w-5 h-5 border-2 mr-2"></div>
                  Creating...
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  <Bell className="w-5 h-5 mr-2" />
                  Create Alert
                </span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AlertModal;
