const express = require('express');
const router = express.Router();
const db = require('../db/database');

// In-memory alert store (can upgrade to Redis later)
const activeAlerts = new Map();

/**
 * GET /api/alerts
 * Get all alerts
 */
router.get('/', async (req, res) => {
  try {
    const alerts = await db.query(`
      SELECT a.*, m.question as market_question 
      FROM alerts a 
      LEFT JOIN markets m ON a.market_id = m.id 
      ORDER BY a.created_at DESC
    `);
    res.json(alerts);
  } catch (error) {
    console.error('Error fetching alerts:', error);
    res.status(500).json({ error: 'Failed to fetch alerts' });
  }
});

/**
 * POST /api/alerts
 * Create a new alert
 */
router.post('/', async (req, res) => {
  try {
    const { market_id, alert_type, threshold, message } = req.body;
    
    if (!market_id || !alert_type) {
      return res.status(400).json({ error: 'market_id and alert_type are required' });
    }
    
    const result = await db.run(`
      INSERT INTO alerts (market_id, alert_type, threshold, message)
      VALUES (?, ?, ?, ?)
    `, [market_id, alert_type, threshold || 0, message || '']);
    
    const alert = {
      id: result.id,
      market_id,
      alert_type,
      threshold,
      message,
      created_at: new Date().toISOString()
    };
    
    // Add to active alerts
    if (!activeAlerts.has(market_id)) {
      activeAlerts.set(market_id, []);
    }
    activeAlerts.get(market_id).push(alert);
    
    res.status(201).json(alert);
  } catch (error) {
    console.error('Error creating alert:', error);
    res.status(500).json({ error: 'Failed to create alert' });
  }
});

/**
 * POST /api/alerts/subscribe
 * Subscribe to alert notifications
 */
router.post('/subscribe', async (req, res) => {
  try {
    const { email, market_id, alert_types } = req.body;
    
    if (!email) {
      return res.status(400).json({ error: 'email is required' });
    }
    
    const result = await db.run(`
      INSERT INTO subscriptions (email, market_id, alert_types)
      VALUES (?, ?, ?)
    `, [
      email,
      market_id || null,
      JSON.stringify(alert_types || ['price_change', 'volume_spike', 'closing_soon'])
    ]);
    
    res.status(201).json({
      id: result.id,
      email,
      market_id,
      alert_types,
      message: 'Subscription created successfully'
    });
  } catch (error) {
    console.error('Error creating subscription:', error);
    res.status(500).json({ error: 'Failed to create subscription' });
  }
});

/**
 * GET /api/alerts/subscriptions
 * Get all subscriptions
 */
router.get('/subscriptions', async (req, res) => {
  try {
    const { email } = req.query;
    
    let query = 'SELECT * FROM subscriptions ORDER BY created_at DESC';
    let params = [];
    
    if (email) {
      query = 'SELECT * FROM subscriptions WHERE email = ? ORDER BY created_at DESC';
      params = [email];
    }
    
    const subscriptions = await db.query(query, params);
    
    // Parse alert_types JSON
    subscriptions.forEach(sub => {
      sub.alert_types = JSON.parse(sub.alert_types || '[]');
    });
    
    res.json(subscriptions);
  } catch (error) {
    console.error('Error fetching subscriptions:', error);
    res.status(500).json({ error: 'Failed to fetch subscriptions' });
  }
});

/**
 * DELETE /api/alerts/:id
 * Delete an alert
 */
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await db.run('DELETE FROM alerts WHERE id = ?', [id]);
    res.json({ message: 'Alert deleted' });
  } catch (error) {
    console.error('Error deleting alert:', error);
    res.status(500).json({ error: 'Failed to delete alert' });
  }
});

/**
 * POST /api/alerts/check
 * Manually trigger alert checking (for testing)
 */
router.post('/check', async (req, res) => {
  try {
    const triggeredAlerts = await checkAlerts();
    res.json({
      message: 'Alert check completed',
      triggered: triggeredAlerts
    });
  } catch (error) {
    console.error('Error checking alerts:', error);
    res.status(500).json({ error: 'Failed to check alerts' });
  }
});

/**
 * Alert checking logic
 * This should run periodically (cron job)
 */
async function checkAlerts() {
  const triggered = [];
  
  try {
    // Get all active alerts
    const alerts = await db.query('SELECT * FROM alerts WHERE triggered_at IS NULL');
    
    for (const alert of alerts) {
      // Get current market data
      const markets = await db.query('SELECT * FROM markets WHERE id = ?', [alert.market_id]);
      
      if (markets.length === 0) continue;
      
      const market = markets[0];
      let shouldTrigger = false;
      
      // Check alert conditions
      switch (alert.alert_type) {
        case 'price_change':
          // Trigger if price moved more than threshold
          shouldTrigger = Math.abs(market.score - alert.threshold) > 10;
          break;
          
        case 'volume_spike':
          // Trigger if volume > threshold
          shouldTrigger = market.volume > alert.threshold;
          break;
          
        case 'liquidity_low':
          // Trigger if liquidity < threshold
          shouldTrigger = market.liquidity < alert.threshold;
          break;
          
        case 'closing_soon':
          // Trigger if market closes within 24 hours
          const endDate = new Date(market.end_date);
          const hoursUntilClose = (endDate - Date.now()) / (1000 * 60 * 60);
          shouldTrigger = hoursUntilClose < 24 && hoursUntilClose > 0;
          break;
      }
      
      if (shouldTrigger) {
        await db.run(
          'UPDATE alerts SET triggered_at = CURRENT_TIMESTAMP WHERE id = ?',
          [alert.id]
        );
        
        triggered.push({
          ...alert,
          market_question: market.question
        });
        
        console.log(`🔔 Alert triggered: ${alert.alert_type} for "${market.question}"`);
      }
    }
  } catch (error) {
    console.error('Error in checkAlerts:', error);
  }
  
  return triggered;
}

// Export for use in cron job
module.exports = router;
module.exports.checkAlerts = checkAlerts;
