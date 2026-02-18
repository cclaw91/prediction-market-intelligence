const express = require('express');
const router = express.Router();
const polymarket = require('../services/polymarket');
const db = require('../db/database');

/**
 * GET /api/markets
 * Fetch and cache markets from Polymarket
 */
router.get('/', async (req, res) => {
  try {
    const { limit = 20, category, search } = req.query;
    
    // Fetch from Polymarket API
    const markets = await polymarket.fetchMarkets(parseInt(limit));
    
    if (!markets || markets.length === 0) {
      return res.json([]);
    }
    
    // Transform and filter
    let transformedMarkets = markets.map(polymarket.transformMarketData);
    
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
        (id, question, description, category, end_date, liquidity, volume, outcome_prices, score, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
      `, [
        market.id,
        market.question,
        market.description,
        market.category,
        market.end_date,
        market.liquidity,
        market.volume,
        market.outcome_prices,
        market.score
      ]);
    }
    
    res.json({
      count: transformedMarkets.length,
      markets: transformedMarkets
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
      (id, question, description, category, end_date, liquidity, volume, outcome_prices, score, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
    `, [
      transformed.id,
      transformed.question,
      transformed.description,
      transformed.category,
      transformed.end_date,
      transformed.liquidity,
      transformed.volume,
      transformed.outcome_prices,
      transformed.score
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
