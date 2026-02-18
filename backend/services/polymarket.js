const axios = require('axios');

const CLOB_API = process.env.POLYMARKET_API_URL || 'https://clob.polymarket.com';
const GAMMA_API = process.env.GAMMA_API_URL || 'https://gamma-api.polymarket.com';

/**
 * Fetch active markets from Polymarket
 */
const fetchMarkets = async (limit = 20) => {
  try {
    // Using Gamma API for market data
    const response = await axios.get(`${GAMMA_API}/markets`, {
      params: {
        limit,
        closed: false,
        active: true
      }
    });
    
    return response.data;
  } catch (error) {
    console.error('Error fetching markets:', error.message);
    throw error;
  }
};

/**
 * Fetch a specific market by ID
 */
const fetchMarketById = async (marketId) => {
  try {
    const response = await axios.get(`${GAMMA_API}/markets/${marketId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching market ${marketId}:`, error.message);
    throw error;
  }
};

/**
 * Calculate market score based on liquidity, volume, and activity
 * Score = (normalized_liquidity * 0.4) + (normalized_volume * 0.4) + (activity_score * 0.2)
 */
const calculateMarketScore = (market) => {
  const liquidity = parseFloat(market.liquidity || 0);
  const volume = parseFloat(market.volume || 0);
  const volume24hr = parseFloat(market.volume24hr || 0);
  
  // Normalize to 0-100 scale
  const liquidityScore = Math.min((liquidity / 100000) * 100, 100);
  const volumeScore = Math.min((volume / 500000) * 100, 100);
  const activityScore = Math.min((volume24hr / 50000) * 100, 100);
  
  const score = (liquidityScore * 0.4) + (volumeScore * 0.4) + (activityScore * 0.2);
  
  return Math.round(score * 10) / 10; // Round to 1 decimal
};

/**
 * Transform Polymarket data to our internal format
 */
const transformMarketData = (market) => {
  // Extract outcome prices as an array
  let outcomePrices = [];
  if (market.outcomePrices) {
    if (Array.isArray(market.outcomePrices)) {
      outcomePrices = market.outcomePrices.map(p => parseFloat(p));
    } else if (typeof market.outcomePrices === 'string') {
      try {
        const parsed = JSON.parse(market.outcomePrices);
        outcomePrices = Array.isArray(parsed) ? parsed.map(p => parseFloat(p)) : [];
      } catch (e) {
        outcomePrices = [];
      }
    }
  } else if (market.tokens) {
    outcomePrices = market.tokens.map(t => parseFloat(t.price || 0));
  }
  
  // Extract outcomes as an array
  let outcomes = [];
  if (Array.isArray(market.outcomes)) {
    outcomes = market.outcomes;
  } else if (typeof market.outcomes === 'string') {
    try {
      const parsed = JSON.parse(market.outcomes);
      outcomes = Array.isArray(parsed) ? parsed : [market.outcomes];
    } catch (e) {
      outcomes = [market.outcomes];
    }
  } else if (market.tokens) {
    outcomes = market.tokens.map(t => t.outcome);
  }
  
  return {
    id: market.condition_id || market.id,
    question: market.question,
    description: market.description || '',
    category: market.category || market.tags?.[0] || 'Other',
    end_date: market.end_date_iso || market.endDate,
    liquidity: parseFloat(market.liquidity || 0),
    volume: parseFloat(market.volume || 0),
    volume24hr: parseFloat(market.volume24hr || 0),
    outcome_prices: outcomePrices,
    outcomes: outcomes,
    score: calculateMarketScore(market),
    image: market.image || null,
    active: market.active !== false,
    closed: market.closed || false,
    source: 'polymarket'
  };
};

module.exports = {
  fetchMarkets,
  fetchMarketById,
  calculateMarketScore,
  transformMarketData
};
