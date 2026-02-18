import React from 'react';

const MarketCard = ({ market, onAlertClick }) => {
  const formatNumber = (num) => {
    if (num >= 1000000) return `$${(num / 1000000).toFixed(2)}M`;
    if (num >= 1000) return `$${(num / 1000).toFixed(0)}K`;
    return `$${num.toFixed(0)}`;
  };

  const getScoreColor = (score) => {
    if (score >= 70) return 'text-green-600';
    if (score >= 40) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBadge = (score) => {
    if (score >= 70) return 'bg-green-100 text-green-800';
    if (score >= 40) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      {/* Header */}
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-gray-900 flex-1 pr-4">
          {market.question}
        </h3>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getScoreBadge(market.score)}`}>
          Score: {market.score}
        </span>
      </div>

      {/* Category */}
      {market.category && (
        <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mb-3">
          {market.category}
        </span>
      )}

      {/* Description */}
      {market.description && (
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {market.description}
        </p>
      )}

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
        <div>
          <p className="text-gray-500">Liquidity</p>
          <p className="font-semibold text-gray-900">{formatNumber(market.liquidity)}</p>
        </div>
        <div>
          <p className="text-gray-500">Volume</p>
          <p className="font-semibold text-gray-900">{formatNumber(market.volume)}</p>
        </div>
        <div>
          <p className="text-gray-500">24h Volume</p>
          <p className="font-semibold text-gray-900">{formatNumber(market.volume24hr)}</p>
        </div>
      </div>

      {/* Outcomes */}
      {market.outcomes && market.outcomes.length > 0 && (
        <div className="mb-4">
          <p className="text-xs text-gray-500 mb-2">Outcomes:</p>
          <div className="flex gap-2 flex-wrap">
            {market.outcomes.map((outcome, idx) => (
              <span key={idx} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                {outcome}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* End Date */}
      {market.end_date && (
        <p className="text-xs text-gray-500 mb-4">
          Ends: {new Date(market.end_date).toLocaleDateString()}
        </p>
      )}

      {/* Actions */}
      <div className="flex gap-2">
        <button
          onClick={() => onAlertClick(market)}
          className="flex-1 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium py-2 px-4 rounded transition-colors"
        >
          🔔 Set Alert
        </button>
        <a
          href={`https://polymarket.com/event/${market.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium py-2 px-4 rounded text-center transition-colors"
        >
          View on Polymarket →
        </a>
      </div>
    </div>
  );
};

export default MarketCard;
