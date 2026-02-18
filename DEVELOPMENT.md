# 🛠️ Development Guide

Quick reference for common development tasks.

## Project Structure Overview

```
prediction-market-tool/
├── backend/              # Node.js + Express API
│   ├── db/              # Database files & setup
│   ├── routes/          # API route handlers
│   ├── services/        # External API integrations
│   └── index.js         # Main server file
│
└── frontend/            # React + Vite app
    └── src/
        ├── components/  # React components
        └── services/    # API client
```

## Common Commands

### Backend
```bash
cd backend

# Development (with auto-reload)
npm run dev

# Production
npm start

# Test alerts system
node test-alerts.js

# Database operations
sqlite3 db/markets.db
# > .tables          # List tables
# > .schema markets  # Show schema
# > SELECT * FROM alerts LIMIT 5;
# > .quit
```

### Frontend
```bash
cd frontend

# Development server (hot reload)
npm run dev

# Production build
npm run build
npm run preview

# Lint
npm run lint
```

## Adding New Features

### Add New API Endpoint

1. **Create route handler** in `backend/routes/`
2. **Import in** `backend/index.js`
3. **Add to README** API documentation

Example:
```javascript
// backend/routes/markets.js
router.get('/trending', async (req, res) => {
  try {
    const trending = await db.query(
      'SELECT * FROM markets ORDER BY volume24hr DESC LIMIT 10'
    );
    res.json(trending);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

### Add New React Component

1. **Create component** in `frontend/src/components/`
2. **Import in parent** component
3. **Add styling** with Tailwind classes

Example:
```javascript
// frontend/src/components/TrendingMarkets.jsx
import React from 'react';

const TrendingMarkets = ({ markets }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-xl font-bold mb-4">🔥 Trending Markets</h3>
      {markets.map(m => (
        <div key={m.id}>{m.question}</div>
      ))}
    </div>
  );
};

export default TrendingMarkets;
```

### Add New Alert Type

1. **Update backend** `routes/alerts.js` - add case in `checkAlerts()`
2. **Update frontend** `components/AlertModal.jsx` - add to `alertTypes` array
3. **Test** with `test-alerts.js`

## Database Schema

### Markets Table
```sql
CREATE TABLE markets (
  id TEXT PRIMARY KEY,
  question TEXT NOT NULL,
  description TEXT,
  category TEXT,
  end_date TEXT,
  liquidity REAL,
  volume REAL,
  outcome_prices TEXT,
  score REAL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Alerts Table
```sql
CREATE TABLE alerts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  market_id TEXT,
  alert_type TEXT,
  threshold REAL,
  message TEXT,
  triggered_at DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (market_id) REFERENCES markets(id)
);
```

### Subscriptions Table
```sql
CREATE TABLE subscriptions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT,
  market_id TEXT,
  alert_types TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## API Testing with curl

```bash
# Variables for convenience
API="http://localhost:5000/api"

# Get markets
curl "$API/markets?limit=10"

# Get single market
curl "$API/markets/517310"

# Create alert
curl -X POST "$API/alerts" \
  -H "Content-Type: application/json" \
  -d '{
    "market_id": "517310",
    "alert_type": "volume_spike",
    "threshold": 1000000
  }'

# Get all alerts
curl "$API/alerts"

# Subscribe
curl -X POST "$API/alerts/subscribe" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "alert_types": ["price_change"]
  }'

# Check alerts
curl -X POST "$API/alerts/check"

# Delete alert
curl -X DELETE "$API/alerts/1"
```

## Environment Variables

### Backend `.env`
```bash
PORT=5000
NODE_ENV=development
POLYMARKET_API_URL=https://clob.polymarket.com
GAMMA_API_URL=https://gamma-api.polymarket.com

# For future email notifications
# SENDGRID_API_KEY=your_key_here
# EMAIL_FROM=alerts@yourapp.com
```

### Frontend `.env`
```bash
VITE_API_URL=http://localhost:5000/api
```

## Debugging Tips

### Backend Not Starting
```bash
# Check port is free
lsof -i :5000

# Kill process if needed
lsof -ti:5000 | xargs kill -9

# Check logs
npm start 2>&1 | tee server.log
```

### Frontend Build Errors
```bash
# Clear cache
rm -rf node_modules package-lock.json
npm install

# Check for TypeScript errors
npm run build
```

### Database Issues
```bash
# Reset database
rm backend/db/markets.db
cd backend && npm start  # Will recreate

# Backup database
cp backend/db/markets.db backend/db/markets.backup.db

# Inspect database
sqlite3 backend/db/markets.db
```

### CORS Errors
Check `backend/index.js`:
```javascript
app.use(cors({
  origin: 'http://localhost:3001',
  credentials: true
}));
```

## Git Workflow

```bash
# Create feature branch
git checkout -b feature/add-charts

# Make changes, then commit
git add .
git commit -m "Add price history charts"

# Push to remote
git push origin feature/add-charts

# Merge to main (after review)
git checkout main
git merge feature/add-charts
git push origin main
```

## Performance Tips

1. **Backend**
   - Cache Polymarket responses (5-10 min)
   - Use database indexes
   - Implement pagination
   - Add Redis for session storage

2. **Frontend**
   - Use React.memo for MarketCard
   - Implement virtual scrolling for large lists
   - Lazy load images
   - Code split with React.lazy()

## Security Checklist

- [ ] Validate all inputs
- [ ] Sanitize database queries
- [ ] Add rate limiting
- [ ] Use HTTPS in production
- [ ] Implement authentication
- [ ] Secure environment variables
- [ ] Run `npm audit` regularly
- [ ] Add CORS whitelist

## Deployment (Future)

### Backend
- Deploy to Heroku, Railway, or Render
- Use PostgreSQL instead of SQLite
- Set up Redis for caching
- Configure environment variables

### Frontend
- Deploy to Vercel, Netlify, or Cloudflare Pages
- Set `VITE_API_URL` to production backend URL
- Configure custom domain

---

**Need Help?** Check README.md or create an issue on GitHub!
