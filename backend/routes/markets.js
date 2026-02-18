const express = require('express');
const router = express.Router();
const polymarket = require('../services/polymarket');
const kalshi = require('../services/kalshi');
const db = require('../db/database');

/**
 * GET /api/markets
 * Fetch and cache markets from BOTH Polymarket AND Kalshi
 */
router.get('/', async (req, res) => {
  try {
    const { limit = 20, category, search, source } = req.query;
    const limitPerSource = Math.ceil(parseInt(limit) / 2);
    
    // Fetch from both APIs in parallel
    const [polymarketResults, kalshiResults] = await Promise.allSettled([
      polymarket.fetchMarkets(limitPerSource),
      kalshi.fetchMarkets(limitPerSource)
    ]);
    
    let allMarkets = [];
    
    // Process Polymarket results
    if (polymarketResults.status === 'fulfilled' && polymarketResults.value?.length > 0) {
      const polymarketTransformed = polymarketResults.value.map(m => ({
        ...polymarket.transformMarketData(m),
        source: 'polymarket'
      }));
      allMarkets.push(...polymarketTransformed);
    } else if (polymarketResults.status === 'rejected') {
      console.error('Polymarket fetch failed:', polymarketResults.reason?.message);
    }
    
    // Process Kalshi results
    if (kalshiResults.status === 'fulfilled' && kalshiResults.value?.length > 0) {
      const kalshiTransformed = kalshiResults.value.map(kalshi.transformMarketData);
      allMarkets.push(...kalshiTransformed);
    } else if (kalshiResults.status === 'rejected') {
      console.error('Kalshi fetch failed:', kalshiResults.reason?.message);
    }
    
    // Apply filters
    if (source) {
      allMarkets = allMarkets.filter(m => m.source === source);
    }
    
    if (category) {
      allMarkets = allMarkets.filter(m => 
        m.category?.toLowerCase() === category.toLowerCase()
      );
    }
    
    if (search) {
      const searchLower = search.toLowerCase();
      allMarkets = allMarkets.filter(m => 
        m.question?.toLowerCase().includes(searchLower) ||
        m.description?.toLowerCase().includes(searchLower)
      );
    }
    
    // Sort by score (liquidity + volume)
    allMarkets.sort((a, b) => (b.score || 0) - (a.score || 0));
    
    // Limit results
    allMarkets = allMarkets.slice(0, parseInt(limit));
    
    // Cache in database
    for (const market of allMarkets) {
      await db.run(`
        INSERT OR REPLACE INTO markets 
        (id, question, description, category, end_date, liquidity, volume, outcome_prices, score, source, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
      `, [
        market.id,
        market.question,
        market.description,
        market.category,
        market.end_date,
        market.liquidity,
        market.volume,
        JSON.stringify(market.outcome_prices),
        market.score,
        market.source
      ]);
    }
    
    res.json({
      count: allMarkets.length,
      markets: allMarkets,
      sources: {
        polymarket: allMarkets.filter(m => m.source === 'polymarket').length,
        kalshi: allMarkets.filter(m => m.source === 'kalshi').length
      }
    });
    
  } catch (error) {
    console.error('Error in /markets:', error);
    res.status(500).json({ error: 'Failed to fetch markets', message: error.message });
  }
});

/**
 * GET /api/markets/:id
 * Get specific market details
 */
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Try database first
    const cached = await db.query('SELECT * FROM markets WHERE id = ?', [id]);
    
    if (cached.length > 0) {
      const market = cached[0];
      market.outcome_prices = JSON.parse(market.outcome_prices || '[]');
      return res.json(market);
    }
    
    // Fetch from API if not cached
    const market = await polymarket.fetchMarketById(id);
    const transformed = polymarket.transformMarketData(market);
    
    // Cache it
    await db.run(`
      INSERT OR REPLACE INTO markets 
      (id, question, description, category, end_date, liquidity, volume, outcome_prices, score, source, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
    `, [
      transformed.id,
      transformed.question,
      transformed.description,
      transformed.category,
      transformed.end_date,
      transformed.liquidity,
      transformed.volume,
      JSON.stringify(transformed.outcome_prices),
      transformed.score,
      transformed.source
    ]);
    
    res.json(transformed);
    
  } catch (error) {
    console.error(`Error fetching market ${req.params.id}:`, error);
    res.status(500).json({ error: 'Failed to fetch market', message: error.message });
  }
});

/**
 * GET /api/markets/categories
 * Get available categories
 */
router.get('/meta/categories', async (req, res) => {
  try {
    const categories = await db.query(`
      SELECT DISTINCT category, COUNT(*) as count 
      FROM markets 
      GROUP BY category 
      ORDER BY count DESC
    `);
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

module.exports = router;
