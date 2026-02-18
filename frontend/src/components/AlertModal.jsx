import React, { useState } from 'react';
import { alertAPI } from '../services/api';

const AlertModal = ({ market, onClose, onSuccess }) => {
  const [alertType, setAlertType] = useState('price_change');
  const [threshold, setThreshold] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const alertTypes = [
    { value: 'price_change', label: 'Price Change', description: 'Alert when price moves significantly' },
    { value: 'volume_spike', label: 'Volume Spike', description: 'Alert when volume exceeds threshold' },
    { value: 'liquidity_low', label: 'Low Liquidity', description: 'Alert when liquidity drops below threshold' },
    { value: 'closing_soon', label: 'Closing Soon', description: 'Alert when market closes within 24 hours' },
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-xl font-bold text-gray-900">Set Alert</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>

        <div className="mb-4 p-3 bg-gray-50 rounded">
          <p className="text-sm font-medium text-gray-900">{market.question}</p>
          <p className="text-xs text-gray-500 mt-1">Score: {market.score}</p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Alert Type */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Alert Type
            </label>
            <select
              value={alertType}
              onChange={(e) => setAlertType(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {alertTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
            <p className="text-xs text-gray-500 mt-1">
              {alertTypes.find((t) => t.value === alertType)?.description}
            </p>
          </div>

          {/* Threshold (optional for some alert types) */}
          {(alertType === 'volume_spike' || alertType === 'liquidity_low') && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Threshold ($)
              </label>
              <input
                type="number"
                value={threshold}
                onChange={(e) => setThreshold(e.target.value)}
                placeholder="Enter threshold amount"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}

          {/* Email (optional) */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email (Optional)
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-xs text-gray-500 mt-1">
              Receive email notifications when alert triggers (feature placeholder)
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors disabled:opacity-50"
              disabled={loading}
            >
              {loading ? 'Creating...' : 'Create Alert'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AlertModal;
