# 📊 Prediction Market Intelligence Tool

Real-time dashboard and API for aggregating prediction market data from Polymarket and Kalshi, with intelligent scoring and alert systems.

## 🚀 Features

### MVP Features (Implemented)
- ✅ **Backend API** (Node.js + Express)
  - REST endpoints for markets, alerts, and subscriptions
  - Live data fetching from Polymarket API
  - Intelligent market scoring algorithm
  - SQLite database for caching and alerts
  - CORS-enabled for frontend integration

- ✅ **Frontend Dashboard** (React + Vite + Tailwind)
  - Real-time market cards with live data
  - Search and filter capabilities
  - Alert setup modal
  - Responsive design
  - Clean, modern UI

- ✅ **Alert System**
  - Multiple alert types (price change, volume spike, liquidity, closing soon)
  - Email subscription placeholder
  - In-memory alert storage (upgradeable to Redis)

### Scoring Algorithm
Markets are scored 0-100 based on:
- **Liquidity (40%)**: Market depth and trading capacity
- **Volume (40%)**: Total trading volume
- **24h Activity (20%)**: Recent trading activity

## 🛠️ Tech Stack

**Backend:**
- Node.js & Express
- Axios for API calls
- SQLite3 for database
- dotenv for configuration
- node-cron for scheduled tasks

**Frontend:**
- React 18
- Vite (build tool)
- Tailwind CSS
- Axios for API calls
- Recharts (ready for charts)

## 📦 Installation

### Prerequisites
- Node.js v16+ 
- npm or yarn

### Backend Setup

```bash
cd backend
npm install
npm start
```

Backend runs on `http://localhost:5000`

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:3001`

## 🔌 API Endpoints

### Markets
- `GET /api/markets` - List all markets
  - Query params: `limit`, `category`, `search`
- `GET /api/markets/:id` - Get specific market
- `GET /api/markets/meta/categories` - Get available categories

### Alerts
- `GET /api/alerts` - List all alerts
- `POST /api/alerts` - Create new alert
  ```json
  {
    "market_id": "string",
    "alert_type": "price_change|volume_spike|liquidity_low|closing_soon",
    "threshold": 0,
    "message": "string"
  }
  ```
- `POST /api/alerts/subscribe` - Subscribe to alerts
  ```json
  {
    "email": "user@example.com",
    "market_id": "string",
    "alert_types": ["price_change", "volume_spike"]
  }
  ```
- `GET /api/alerts/subscriptions` - List subscriptions
- `DELETE /api/alerts/:id` - Delete alert
- `POST /api/alerts/check` - Manually trigger alert check

### Health
- `GET /api/health` - API health check

## 🧪 Testing

### Test with curl

```bash
# Health check
curl http://localhost:5000/api/health

# Get markets
curl "http://localhost:5000/api/markets?limit=5"

# Create alert
curl -X POST http://localhost:5000/api/alerts \
  -H "Content-Type: application/json" \
  -d '{
    "market_id": "517310",
    "alert_type": "volume_spike",
    "threshold": 1000000,
    "message": "High volume alert"
  }'

# Subscribe to alerts
curl -X POST http://localhost:5000/api/alerts/subscribe \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "alert_types": ["price_change", "closing_soon"]
  }'
```

## 📁 Project Structure

```
prediction-market-tool/
├── backend/
│   ├── db/
│   │   ├── database.js          # SQLite setup & queries
│   │   └── markets.db           # SQLite database (created on first run)
│   ├── routes/
│   │   ├── markets.js           # Market endpoints
│   │   └── alerts.js            # Alert endpoints
│   ├── services/
│   │   └── polymarket.js        # Polymarket API integration
│   ├── index.js                 # Main server file
│   ├── .env                     # Environment variables
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Dashboard.jsx    # Main dashboard
    │   │   ├── MarketCard.jsx   # Market card component
    │   │   └── AlertModal.jsx   # Alert setup modal
    │   ├── services/
    │   │   └── api.js           # API service
    │   ├── App.jsx              # Root component
    │   ├── main.jsx             # Entry point
    │   └── index.css            # Tailwind imports
    ├── .env                     # Frontend env vars
    ├── vite.config.js
    └── package.json
```

## 🔮 Future Enhancements (TODO)

### High Priority
- [ ] Add Kalshi API integration
- [ ] Implement real email notifications (SendGrid/AWS SES)
- [ ] Add chart visualizations (Recharts)
- [ ] Redis for alert caching
- [ ] WebSocket for real-time updates
- [ ] Market detail page with historical data

### Medium Priority
- [ ] User authentication
- [ ] Saved searches & favorites
- [ ] Advanced filtering (date range, score range)
- [ ] Export data to CSV
- [ ] Dark mode
- [ ] Mobile app (React Native)

### Nice to Have
- [ ] Sentiment analysis integration
- [ ] Portfolio tracking
- [ ] Social features (share predictions)
- [ ] Browser extension
- [ ] Slack/Discord bot integration

## 🐛 Known Issues

- [ ] Polymarket API rate limiting not implemented
- [ ] Alert checking currently manual (needs cron job)
- [ ] Email notifications are placeholder only
- [ ] No error retry logic for API calls
- [ ] SQLite vulnerabilities in dependencies (audit fix needed)

## 📝 Notes

- **Backend Port:** 5000 (configurable via `.env`)
- **Frontend Port:** 3001 (configured in `vite.config.js`)
  - Note: Port 3000 is reserved for OpenClaw Control Center
- **Database:** SQLite file at `backend/db/markets.db`
- **Polymarket API:** Public endpoints, no auth required for MVP

## 🤝 Contributing

1. Fork the repo
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

MIT

## 👨‍💻 Author

Built by Christian - Prediction Market Intelligence MVP

---

**Status:** 🟢 MVP Complete (~80%)  
**Last Updated:** 2026-02-17  
**Feedback Welcome!** 🚀
