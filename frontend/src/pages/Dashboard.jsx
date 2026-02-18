import React, { useState, useEffect } from 'react';
import { 
  Search, 
  RefreshCw, 
  Filter, 
  TrendingUp, 
  Activity,
  DollarSign,
  AlertCircle,
  X
} from 'lucide-react';
import { marketAPI, alertAPI } from '../services/api';
import Navigation from '../components/Navigation';
import Sidebar from '../components/Sidebar';
import MarketCard from '../components/MarketCard';
import AlertModal from '../components/AlertModal';

const Dashboard = () => {
  const [markets, setMarkets] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMarket, setSelectedMarket] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    minScore: 0,
    source: 'all',
    category: 'all',
  });

  const [stats, setStats] = useState({
    totalMarkets: 0,
    avgScore: 0,
    totalVolume: 0,
    activeAlerts: 0,
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    setError('');

    try {
      // Fetch markets
      const marketsData = await marketAPI.getMarkets({ limit: 50 });
      setMarkets(marketsData.markets || []);

      // Calculate stats
      const totalMarkets = marketsData.count || 0;
      const avgScore =
        marketsData.markets?.reduce((sum, m) => sum + m.score, 0) / totalMarkets || 0;
      const totalVolume =
        marketsData.markets?.reduce((sum, m) => sum + m.volume, 0) || 0;

      // Fetch alerts
      const alertsData = await alertAPI.getAlerts();
      setAlerts(alertsData || []);

      setStats({
        totalMarkets,
        avgScore: avgScore.toFixed(1),
        totalVolume: totalVolume.toFixed(0),
        activeAlerts: alertsData?.length || 0,
      });
    } catch (err) {
      setError('Failed to load data. Make sure the backend is running on localhost:5000');
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
    loadData();
  };

  const filteredMarkets = markets.filter((market) => {
    const matchesSearch = market.question?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesScore = market.score >= filters.minScore;
    return matchesSearch && matchesScore;
  });

  const formatVolume = (num) => {
    if (num >= 1000000) return `$${(num / 1000000).toFixed(2)}M`;
    if (num >= 1000) return `$${(num / 1000).toFixed(0)}K`;
    return `$${num}`;
  };

  const statsCards = [
    {
      icon: TrendingUp,
      label: 'Total Markets',
      value: stats.totalMarkets,
      color: 'blue',
    },
    {
      icon: Activity,
      label: 'Avg Score',
      value: stats.avgScore,
      color: 'green',
    },
    {
      icon: DollarSign,
      label: 'Total Volume',
      value: formatVolume(stats.totalVolume),
      color: 'purple',
    },
    {
      icon: AlertCircle,
      label: 'Active Alerts',
      value: stats.activeAlerts,
      color: 'orange',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <Sidebar />

      {/* Main Content */}
      <div className="ml-64 pt-16">
        <div className="container-lg py-8">
          {/* Onboarding Banner */}
          {showOnboarding && (
            <div className="mb-6 bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl p-6 text-white relative overflow-hidden animate-fade-in">
              <button
                onClick={() => setShowOnboarding(false)}
                className="absolute top-4 right-4 hover:bg-white/20 rounded-lg p-1 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <h3 className="text-2xl font-bold mb-2">👋 Welcome to MarketIQ!</h3>
              <p className="mb-4 opacity-90">
                Get started by exploring markets below, setting up alerts, or checking out our features.
              </p>
              <div className="flex flex-wrap gap-3">
                <button className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  Take a Tour
                </button>
                <button className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-lg font-semibold transition-colors">
                  View Tutorial
                </button>
              </div>
            </div>
          )}

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {statsCards.map((stat, index) => (
              <div
                key={index}
                className="card p-6 animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 bg-${stat.color}-100 rounded-lg flex items-center justify-center`}>
                    <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Active Alerts Banner */}
          {alerts.length > 0 && (
            <div className="mb-6 card p-6 bg-blue-50 border-blue-200 animate-fade-in">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-blue-900 mb-2 flex items-center">
                    <AlertCircle className="w-5 h-5 mr-2" />
                    Active Alerts ({alerts.length})
                  </h3>
                  <div className="space-y-2">
                    {alerts.slice(0, 3).map((alert) => (
                      <div key={alert.id} className="text-sm text-blue-800">
                        • {alert.alert_type.replace('_', ' ')} for "{alert.market_question?.substring(0, 60)}..."
                      </div>
                    ))}
                    {alerts.length > 3 && (
                      <p className="text-sm text-blue-700 font-medium">
                        + {alerts.length - 3} more alerts
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Search and Filters */}
          <div className="mb-6 flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search markets by question..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="btn-secondary flex items-center justify-center md:w-auto"
            >
              <Filter className="w-5 h-5 mr-2" />
              Filters
            </button>
            <button
              onClick={loadData}
              disabled={loading}
              className="btn-primary flex items-center justify-center md:w-auto"
            >
              <RefreshCw className={`w-5 h-5 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="mb-6 card p-6 animate-fade-in">
              <h3 className="font-semibold text-gray-900 mb-4">Filters</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Minimum Score
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={filters.minScore}
                    onChange={(e) => setFilters({ ...filters, minScore: parseInt(e.target.value) })}
                    className="w-full"
                  />
                  <p className="text-sm text-gray-600 mt-1">{filters.minScore}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Source
                  </label>
                  <select
                    value={filters.source}
                    onChange={(e) => setFilters({ ...filters, source: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Sources</option>
                    <option value="polymarket">Polymarket</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={filters.category}
                    onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Categories</option>
                    <option value="politics">Politics</option>
                    <option value="crypto">Crypto</option>
                    <option value="sports">Sports</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="mb-6 card p-6 bg-red-50 border-red-200">
              <p className="text-red-800 flex items-center">
                <AlertCircle className="w-5 h-5 mr-2" />
                {error}
              </p>
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="text-center py-20">
              <div className="spinner w-16 h-16 mx-auto mb-4"></div>
              <p className="text-gray-600 font-medium">Loading markets...</p>
            </div>
          )}

          {/* Markets Grid */}
          {!loading && filteredMarkets.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Markets ({filteredMarkets.length})
                </h2>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredMarkets.map((market, index) => (
                  <div
                    key={market.id}
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 30}ms` }}
                  >
                    <MarketCard
                      market={market}
                      onAlertClick={handleAlertClick}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* No Results */}
          {!loading && filteredMarkets.length === 0 && !error && (
            <div className="text-center py-20">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-600 font-medium mb-2">No markets found</p>
              <p className="text-gray-500 text-sm">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
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
