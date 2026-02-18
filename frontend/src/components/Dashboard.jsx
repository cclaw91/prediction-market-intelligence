import React, { useState, useEffect } from 'react';
import { marketAPI, alertAPI } from '../services/api';
import MarketCard from './MarketCard';
import AlertModal from './AlertModal';

const Dashboard = () => {
  const [markets, setMarkets] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMarket, setSelectedMarket] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [stats, setStats] = useState({
    totalMarkets: 0,
    avgScore: 0,
    totalVolume: 0,
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    setError('');

    try {
      // Fetch markets
      const marketsData = await marketAPI.getMarkets({ limit: 20 });
      setMarkets(marketsData.markets || []);

      // Calculate stats
      const totalMarkets = marketsData.count || 0;
      const avgScore =
        marketsData.markets?.reduce((sum, m) => sum + m.score, 0) / totalMarkets || 0;
      const totalVolume =
        marketsData.markets?.reduce((sum, m) => sum + m.volume, 0) || 0;

      setStats({
        totalMarkets,
        avgScore: avgScore.toFixed(1),
        totalVolume: totalVolume.toFixed(0),
      });

      // Fetch alerts
      const alertsData = await alertAPI.getAlerts();
      setAlerts(alertsData || []);
    } catch (err) {
      setError('Failed to load data. Make sure the backend is running.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAlertClick = (market) => {
    setSelectedMarket(market);
    setShowModal(true);
  };

  const handleAlertSuccess = () => {
    loadData(); // Reload to show new alert
  };

  const filteredMarkets = markets.filter((market) =>
    market.question?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatVolume = (num) => {
    if (num >= 1000000) return `$${(num / 1000000).toFixed(2)}M`;
    if (num >= 1000) return `$${(num / 1000).toFixed(0)}K`;
    return `$${num}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                📊 Prediction Market Intelligence
              </h1>
              <p className="text-gray-600 mt-1">
                Real-time market data from Polymarket
              </p>
            </div>
            <button
              onClick={loadData}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              disabled={loading}
            >
              {loading ? '⟳ Loading...' : '↻ Refresh'}
            </button>
          </div>
        </div>
      </header>

      {/* Stats Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-sm text-gray-600">Total Markets</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalMarkets}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">Average Score</p>
              <p className="text-2xl font-bold text-gray-900">{stats.avgScore}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">Total Volume</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatVolume(stats.totalVolume)}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search markets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Active Alerts */}
        {alerts.length > 0 && (
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">
              🔔 Active Alerts ({alerts.length})
            </h3>
            <div className="space-y-2">
              {alerts.slice(0, 3).map((alert) => (
                <div key={alert.id} className="text-sm text-blue-800">
                  • {alert.alert_type.replace('_', ' ')} for "{alert.market_question}"
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            <p className="mt-4 text-gray-600">Loading markets...</p>
          </div>
        )}

        {/* Markets Grid */}
        {!loading && filteredMarkets.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMarkets.map((market) => (
              <MarketCard
                key={market.id}
                market={market}
                onAlertClick={handleAlertClick}
              />
            ))}
          </div>
        )}

        {/* No Results */}
        {!loading && filteredMarkets.length === 0 && !error && (
          <div className="text-center py-12">
            <p className="text-gray-600">No markets found</p>
          </div>
        )}
      </div>

      {/* Alert Modal */}
      {showModal && selectedMarket && (
        <AlertModal
          market={selectedMarket}
          onClose={() => setShowModal(false)}
          onSuccess={handleAlertSuccess}
        />
      )}
    </div>
  );
};

export default Dashboard;
