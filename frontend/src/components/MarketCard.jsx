import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, TrendingDown, Volume2, Calendar, ExternalLink } from 'lucide-react';

const MarketCard = ({ market, onAlertClick }) => {
  const formatNumber = (num) => {
    if (num >= 1000000) return `$${(num / 1000000).toFixed(2)}M`;
    if (num >= 1000) return `$${(num / 1000).toFixed(0)}K`;
    return `$${num?.toFixed(0) || 0}`;
  };

  const getScoreBadge = (score) => {
    if (score >= 70) return { class: 'badge-success', icon: TrendingUp, label: 'High' };
    if (score >= 40) return { class: 'badge-warning', icon: TrendingDown, label: 'Medium' };
    return { class: 'badge-error', icon: TrendingDown, label: 'Low' };
  };

  const scoreBadge = getScoreBadge(market.score);

  return (
    <div className="card card-hover group">
      {/* Card Header */}
      <div className="p-6 pb-4">
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1 pr-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
              {market.question}
            </h3>
          </div>
          <span className={`badge ${scoreBadge.class} flex items-center space-x-1 flex-shrink-0`}>
            <scoreBadge.icon className="w-3.5 h-3.5" />
            <span>{market.score}</span>
          </span>
        </div>

        {/* Category */}
        {market.category && (
          <span className="badge badge-primary text-xs mb-3 inline-block">
            {market.category}
          </span>
        )}

        {/* Description */}
        {market.description && (
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">
            {market.description}
          </p>
        )}
      </div>

      {/* Stats Grid */}
      <div className="px-6 pb-4">
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="flex items-center justify-center text-gray-400 mb-1">
              <Volume2 className="w-4 h-4" />
            </div>
            <p className="text-xs text-gray-500">Liquidity</p>
            <p className="font-semibold text-gray-900 text-sm">{formatNumber(market.liquidity)}</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center text-gray-400 mb-1">
              <TrendingUp className="w-4 h-4" />
            </div>
            <p className="text-xs text-gray-500">Volume</p>
            <p className="font-semibold text-gray-900 text-sm">{formatNumber(market.volume)}</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center text-gray-400 mb-1">
              <TrendingUp className="w-4 h-4" />
            </div>
            <p className="text-xs text-gray-500">24h Vol</p>
            <p className="font-semibold text-gray-900 text-sm">{formatNumber(market.volume24hr)}</p>
          </div>
        </div>
      </div>

      {/* Outcomes */}
      {market.outcomes && market.outcomes.length > 0 && (
        <div className="px-6 pb-4">
          <p className="text-xs text-gray-500 mb-2 font-medium">Outcomes:</p>
          <div className="flex gap-2 flex-wrap">
            {market.outcomes.slice(0, 3).map((outcome, idx) => (
              <span key={idx} className="text-xs bg-gray-100 text-gray-700 px-2.5 py-1 rounded-md">
                {outcome}
              </span>
            ))}
            {market.outcomes.length > 3 && (
              <span className="text-xs text-gray-500 px-2.5 py-1">
                +{market.outcomes.length - 3} more
              </span>
            )}
          </div>
        </div>
      )}

      {/* End Date */}
      {market.end_date && (
        <div className="px-6 pb-4">
          <div className="flex items-center text-xs text-gray-500">
            <Calendar className="w-4 h-4 mr-1.5" />
            <span>Ends: {new Date(market.end_date).toLocaleDateString()}</span>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="px-6 pb-6 pt-2 flex gap-3 border-t border-gray-100">
        <button
          onClick={() => onAlertClick(market)}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2.5 px-4 rounded-lg transition-all duration-200 hover:shadow-md flex items-center justify-center"
        >
          <Volume2 className="w-4 h-4 mr-2" />
          Set Alert
        </button>
        <Link
          to={`/market/${market.id}`}
          className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium py-2.5 px-4 rounded-lg text-center transition-all duration-200 flex items-center justify-center"
        >
          View
          <ExternalLink className="w-4 h-4 ml-2" />
        </Link>
      </div>
    </div>
  );
};

export default MarketCard;
