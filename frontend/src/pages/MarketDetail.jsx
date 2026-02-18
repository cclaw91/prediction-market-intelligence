import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  Volume2,
  Calendar,
  AlertCircle,
  ExternalLink,
  DollarSign,
  BarChart3,
  Clock,
  Target,
} from 'lucide-react';
import { marketAPI, alertAPI } from '../services/api';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import AlertModal from '../components/AlertModal';

const MarketDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [market, setMarket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [relatedAlerts, setRelatedAlerts] = useState([]);

  useEffect(() => {
    loadMarketDetail();
  }, [id]);

  const loadMarketDetail = async () => {
    setLoading(true);
    setError('');

    try {
      // Fetch the specific market
      const marketData = await marketAPI.getMarket(id);
      setMarket(marketData);

      // Fetch related alerts for this market
      try {
        const allAlerts = await alertAPI.getAlerts();
        const related = allAlerts?.filter(
          (alert) => alert.market_id === id || alert.market_question?.includes(market?.question)
        ) || [];
        setRelatedAlerts(related);
      } catch (err) {
        // Alerts are optional, don't fail if they're not available
        console.warn('Could not load alerts:', err);
      }
    } catch (err) {
      console.error('Failed to load market:', err);
      setError('Failed to load market details. This market may not exist.');
    } finally {
      setLoading(false);
    }
  };

  const formatNumber = (num) => {
    if (num === null || num === undefined) return '$0';
    if (num >= 1000000) return `$${(num / 1000000).toFixed(2)}M`;
    if (num >= 1000) return `$${(num / 1000).toFixed(0)}K`;
    return `$${num?.toFixed(2) || 0}`;
  };

  const getScoreBadge = (score) => {
    if (score >= 70) return { class: 'badge-success', icon: TrendingUp, label: 'High Confidence' };
    if (score >= 40) return { class: 'badge-warning', icon: TrendingDown, label: 'Medium Confidence' };
    return { class: 'badge-error', icon: TrendingDown, label: 'Low Confidence' };
  };

  const getMarketStatus = (endDate) => {
    const now = new Date();
    const end = new Date(endDate);
    if (end < now) return { label: 'Resolved', color: 'gray' };
    if (end - now < 24 * 60 * 60 * 1000) return { label: 'Ending Soon', color: 'red' };
    return { label: 'Active', color: 'green' };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navigation />
        <div className="flex-1 flex items-center justify-center pt-16">
          <div className="text-center">
            <div className="spinner w-16 h-16 mx-auto mb-4"></div>
            <p className="text-gray-600 font-medium">Loading market details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !market) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navigation />
        <div className="flex-1 flex items-center justify-center pt-16 px-4">
          <div className="text-center max-w-2xl">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Market Not Found</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={() => navigate('/dashboard')}
              className="btn-primary inline-flex items-center"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  const scoreBadge = getScoreBadge(market.score);
  const status = getMarketStatus(market.end_date);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navigation />

      {/* Main Content */}
      <div className="flex-1 pt-16">
        <div className="container-lg py-8">
          {/* Back Button */}
          <button
            onClick={() => navigate('/dashboard')}
            className="mb-6 flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Dashboard
          </button>

          {/* Main Card */}
          <div className="card p-8 mb-8">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-8 pb-8 border-b border-gray-200">
              <div className="flex-1">
                {/* Badges */}
                <div className="flex flex-wrap gap-3 mb-4">
                  {market.category && (
                    <span className="badge badge-primary text-sm">
                      {market.category}
                    </span>
                  )}
                  <span className={`badge badge-${status.color} text-sm`}>
                    {status.label}
                  </span>
                </div>

                {/* Title */}
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  {market.question}
                </h1>

                {/* Description */}
                {market.description && (
                  <p className="text-lg text-gray-600 mb-4">
                    {market.description}
                  </p>
                )}
              </div>

              {/* Score Badge - Right Side */}
              <div className="md:text-right flex flex-col items-start md:items-end gap-2">
                <div className="flex items-center space-x-2">
                  <span className={`badge ${scoreBadge.class} text-lg px-4 py-2 flex items-center space-x-2`}>
                    <scoreBadge.icon className="w-5 h-5" />
                    <span>{scoreBadge.label}</span>
                  </span>
                </div>
                <p className="text-sm text-gray-600">Confidence Score: <span className="font-bold text-gray-900">{market.score}</span></p>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 pb-8 border-b border-gray-200">
              <div>
                <div className="flex items-center text-gray-500 mb-2">
                  <Volume2 className="w-4 h-4 mr-2" />
                  <p className="text-xs font-medium uppercase tracking-wide">Liquidity</p>
                </div>
                <p className="text-2xl font-bold text-gray-900">{formatNumber(market.liquidity)}</p>
              </div>
              <div>
                <div className="flex items-center text-gray-500 mb-2">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  <p className="text-xs font-medium uppercase tracking-wide">Volume</p>
                </div>
                <p className="text-2xl font-bold text-gray-900">{formatNumber(market.volume)}</p>
              </div>
              <div>
                <div className="flex items-center text-gray-500 mb-2">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  <p className="text-xs font-medium uppercase tracking-wide">24h Volume</p>
                </div>
                <p className="text-2xl font-bold text-gray-900">{formatNumber(market.volume24hr)}</p>
              </div>
              <div>
                <div className="flex items-center text-gray-500 mb-2">
                  <DollarSign className="w-4 h-4 mr-2" />
                  <p className="text-xs font-medium uppercase tracking-wide">Price</p>
                </div>
                <p className="text-2xl font-bold text-gray-900">${(market.current_price || 0).toFixed(2)}</p>
              </div>
            </div>

            {/* Outcomes Section */}
            {market.outcomes && market.outcomes.length > 0 && (
              <div className="mb-8 pb-8 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <Target className="w-5 h-5 mr-2" />
                  Outcomes
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {market.outcomes.map((outcome, idx) => (
                    <div key={idx} className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:border-blue-300 transition-colors">
                      <p className="text-sm text-gray-600 mb-2">Option {idx + 1}</p>
                      <p className="font-semibold text-gray-900 mb-2">{outcome.name || outcome}</p>
                      {outcome.probability && (
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Probability:</span>
                          <span className="font-bold text-blue-600">{(outcome.probability * 100).toFixed(1)}%</span>
                        </div>
                      )}
                      {outcome.price && (
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-sm text-gray-600">Price:</span>
                          <span className="font-bold text-gray-900">${outcome.price.toFixed(2)}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Timeline */}
            {market.end_date && (
              <div className="mb-8 pb-8 border-b border-gray-200">
                <div className="flex items-center justify-between bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 text-gray-600 mr-3" />
                    <div>
                      <p className="text-sm text-gray-600">Resolves On</p>
                      <p className="font-semibold text-gray-900">
                        {new Date(market.end_date).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
                  </div>
                  {new Date(market.end_date) > new Date() && (
                    <div className="text-right">
                      <p className="text-xs text-gray-500 mb-1">Time remaining</p>
                      <p className="font-semibold text-gray-900">
                        {Math.ceil((new Date(market.end_date) - new Date()) / (1000 * 60 * 60 * 24))} days
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Source Info */}
            {market.source && (
              <div className="mb-8">
                <p className="text-sm text-gray-600 mb-2">Source</p>
                <div className="flex items-center justify-between bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <span className="font-semibold text-gray-900 capitalize">
                    {market.source}
                  </span>
                  {market.source_url || market.id && (
                    <a
                      href={market.source_url || `https://polymarket.com/event/${market.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors"
                    >
                      View on {market.source}
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setShowAlert(true)}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 hover:shadow-lg flex items-center justify-center"
              >
                <AlertCircle className="w-5 h-5 mr-2" />
                Set Alert
              </button>
              {market.source_url || market.id && (
                <a
                  href={market.source_url || `https://polymarket.com/event/${market.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-6 rounded-lg text-center transition-all duration-200 flex items-center justify-center"
                >
                  View on {market.source || 'Polymarket'}
                  <ExternalLink className="w-4 h-4 ml-2" />
                </a>
              )}
            </div>
          </div>

          {/* Related Alerts */}
          {relatedAlerts.length > 0 && (
            <div className="card p-6 bg-blue-50 border-blue-200">
              <h3 className="font-semibold text-blue-900 mb-4 flex items-center">
                <AlertCircle className="w-5 h-5 mr-2" />
                Related Alerts ({relatedAlerts.length})
              </h3>
              <div className="space-y-2">
                {relatedAlerts.map((alert) => (
                  <div key={alert.id} className="text-sm text-blue-800 bg-white rounded px-3 py-2">
                    • {alert.alert_type?.replace(/_/g, ' ').toLowerCase()} — {alert.condition_value}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Alert Modal */}
      {showAlert && market && (
        <AlertModal
          market={market}
          onClose={() => setShowAlert(false)}
          onSuccess={() => {
            setShowAlert(false);
            loadMarketDetail();
          }}
        />
      )}

      <Footer />
    </div>
  );
};

export default MarketDetail;
