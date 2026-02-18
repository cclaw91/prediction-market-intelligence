require('dotenv').config();
const express = require('express');
const cors = require('cors');
const marketRoutes = require('./routes/markets');
const kalshiRoutes = require('./routes/kalshi');
const alertRoutes = require('./routes/alerts');
const db = require('./db/database');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/markets', marketRoutes);
app.use('/api/kalshi', kalshiRoutes);
app.use('/api/alerts', alertRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Initialize database and start server
db.initialize().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📊 API endpoints:`);
    console.log(`   GET  /api/markets - List all markets (Polymarket + Kalshi)`);
    console.log(`   GET  /api/market/:id - Get market details`);
    console.log(`   GET  /api/kalshi/markets - List Kalshi markets only`);
    console.log(`   GET  /api/kalshi/markets/:id - Get Kalshi market details`);
    console.log(`   GET  /api/alerts - List alerts`);
    console.log(`   POST /api/alerts/subscribe - Subscribe to alerts`);
  });
}).catch(err => {
  console.error('Failed to initialize database:', err);
  process.exit(1);
});
