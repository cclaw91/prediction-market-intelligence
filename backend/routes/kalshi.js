const express = require('express');
const router = express.Router();
const kalshi = require('../services/kalshi');
const db = require('../db/database');

/**
 * GET /api/kalshi/markets
 * Fetch and cache markets from Kalshi
 */
router.get('/markets', async (req, res) => {
  try {
    const { limit = 20, category, search } = req.query;
    
    // Fetch from Kalshi API
    const markets = await kalshi.fetchMarkets(parseInt(limit));
    
    if (!markets || markets.length === 0) {
      return res.json([]);
    }
    
    // Transform and filter
    let transformedMarkets = markets.map(kalshi.transformMarketData);
    
    // Apply filters
    if (category) {
      transformedMarkets = transformedMarkets.filter(m => 
        m.category?.toLowerCase() === category.toLowerCase()
      );
    }
    
    if (search) {
      const searchLower = search.toLowerCase();
      transformedMarkets = transformedMarkets.filter(m => 
        m.question?.toLowerCase().includes(searchLower) ||
        m.description?.toLowerCase().includes(searchLower)
      );
    }
    
    // Cache in database
    for (const market of transformedMarkets) {
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
      count: transformedMarkets.length,
      markets: transformedMarkets
    });
    
  } catch (error) {
    console.error('Error in /kalshi/markets:', error);
    res.status(500).json({ error: 'Failed to fetch Kalshi markets', message: error.message });
  }
});

/**
 * GET /api/kalshi/markets/:id
 * Get specific Kalshi market details
 */
router.get('/markets/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Try database first
    const cached = await db.query('SELECT * FROM markets WHERE id = ? AND source = ?', [id, 'kalshi']);
    
    if (cached.length > 0) {
      const market = cached[0];
      market.outcome_prices = JSON.parse(market.outcome_prices || '[]');
      return res.json(market);
    }
    
    // Fetch from API if not cached
    const market = await kalshi.fetchMarketById(id);
    const transformed = kalshi.transformMarketData(market);
    
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
    console.error(`Error fetching Kalshi market ${req.params.id}:`, error);
    res.status(500).json({ error: 'Failed to fetch Kalshi market', message: error.message });
  }
});

module.exports = router;
