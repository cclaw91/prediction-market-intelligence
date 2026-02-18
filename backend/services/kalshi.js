const axios = require('axios');

const KALSHI_BASE_URL = process.env.KALSHI_BASE_URL || 'https://api.elections.kalshi.com/trade-api/v2';
const KALSHI_API_KEY = process.env.KALSHI_API_KEY;

/**
 * Fetch active markets from Kalshi
 */
const fetchMarkets = async (limit = 20) => {
  try {
    if (!KALSHI_API_KEY) {
      throw new Error('KALSHI_API_KEY not configured');
    }

    const response = await axios.get(`${KALSHI_BASE_URL}/markets`, {
      headers: {
        'Authorization': `Bearer ${KALSHI_API_KEY}`
      },
      params: {
        limit
      }
    });
    
    return response.data.markets || response.data;
  } catch (error) {
    console.error('Error fetching Kalshi markets:', error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
    throw error;
  }
};

/**
 * Fetch a specific market by ID
 */
const fetchMarketById = async (marketId) => {
  try {
    if (!KALSHI_API_KEY) {
      throw new Error('KALSHI_API_KEY not configured');
    }

    const response = await axios.get(`${KALSHI_BASE_URL}/markets/${marketId}`, {
      headers: {
        'Authorization': `Bearer ${KALSHI_API_KEY}`
      }
    });
    
    return response.data.market || response.data;
  } catch (error) {
    console.error(`Error fetching Kalshi market ${marketId}:`, error.message);
    throw error;
  }
};

/**
 * Calculate market score based on liquidity, volume, and activity
 * Score = (normalized_liquidity * 0.4) + (normalized_volume * 0.4) + (activity_score * 0.2)
 */
const calculateMarketScore = (market) => {
  const volume = parseFloat(market.volume || 0);
  const openInterest = parseFloat(market.open_interest || 0);
  const liquidity = parseFloat(market.liquidity || openInterest);
  
  // Normalize to 0-100 scale (Kalshi typically has lower volumes than Polymarket)
  const liquidityScore = Math.min((liquidity / 10000) * 100, 100);
  const volumeScore = Math.min((volume / 50000) * 100, 100);
  const activityScore = Math.min((volume / 5000) * 100, 100);
  
  const score = (liquidityScore * 0.4) + (volumeScore * 0.4) + (activityScore * 0.2);
  
  return Math.round(score * 10) / 10; // Round to 1 decimal
};

/**
 * Transform Kalshi data to our internal format
 */
const transformMarketData = (market) => {
  // Extract yes/no prices from market data (Kalshi uses cents, so divide by 100)
  const lastPrice = parseFloat(market.last_price || 0) / 100;
  const yesAsk = parseFloat(market.yes_ask || 0) / 100;
  const yesBid = parseFloat(market.yes_bid || 0) / 100;
  const yesPrice = yesAsk > 0 || yesBid > 0 ? (yesAsk + yesBid) / 2 : lastPrice || 0.5;
  const noPrice = 1 - yesPrice;
  
  // Volume and liquidity are in fractional cents (e.g., "0.00" = 0 cents)
  const volume = parseFloat(market.volume_fp || market.volume || 0);
  const volume24h = parseFloat(market.volume_24h_fp || market.volume_24h || 0);
  const openInterest = parseFloat(market.open_interest_fp || market.open_interest || 0);
  
  return {
    id: market.ticker || market.id,
    question: market.title || market.question,
    description: market.subtitle || market.description || '',
    category: 'Sports', // Kalshi doesn't provide category in API, defaulting to Sports
    end_date: market.expiration_time || market.close_time || market.expiration_date,
    liquidity: openInterest,
    volume: volume,
    volume24hr: volume24h,
    outcome_prices: [yesPrice, noPrice],
    outcomes: ['Yes', 'No'],
    score: calculateMarketScore({ volume, open_interest: openInterest, volume24hr: volume24h }),
    image: null,
    active: market.status === 'active',
    closed: market.status === 'closed',
    source: 'kalshi'
  };
};

module.exports = {
  fetchMarkets,
  fetchMarketById,
  calculateMarketScore,
  transformMarketData
};
