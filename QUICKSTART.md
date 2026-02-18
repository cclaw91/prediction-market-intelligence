# ⚡ Quick Start Guide

Get the Prediction Market Intelligence Tool running in 2 minutes!

## Prerequisites
- Node.js 16+ installed
- Terminal access

## Step 1: Start Backend (30 seconds)

```bash
cd backend
npm install
npm start
```

✅ Backend running on **http://localhost:5000**

## Step 2: Start Frontend (30 seconds)

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

✅ Frontend running on **http://localhost:3000**

## Step 3: Test the System (30 seconds)

Open a third terminal:

```bash
cd backend
node test-alerts.js
```

This will:
- ✅ Fetch live markets from Polymarket
- ✅ Create 3 test alerts
- ✅ Create a test subscription
- ✅ Trigger alert checks

## Step 4: Open Dashboard

Visit **http://localhost:3000** in your browser!

You should see:
- 📊 Live prediction markets from Polymarket
- 🔍 Search bar to filter markets
- 📈 Market statistics (liquidity, volume, scores)
- 🔔 Active alerts section
- 💳 Market cards with "Set Alert" buttons

## Quick Test Commands

```bash
# Get health status
curl http://localhost:5000/api/health

# Get 5 markets
curl "http://localhost:5000/api/markets?limit=5"

# Create an alert
curl -X POST http://localhost:5000/api/alerts \
  -H "Content-Type: application/json" \
  -d '{"market_id":"517310","alert_type":"volume_spike","threshold":1000000}'

# Subscribe to alerts
curl -X POST http://localhost:5000/api/alerts/subscribe \
  -H "Content-Type: application/json" \
  -d '{"email":"you@example.com","alert_types":["closing_soon"]}'
```

## Troubleshooting

### Port Already in Use
```bash
# Kill process on port 5000 (backend)
lsof -ti:5000 | xargs kill -9

# Kill process on port 3000 (frontend)
lsof -ti:3000 | xargs kill -9
```

### Can't Connect to Backend
- Make sure backend is running on port 5000
- Check `.env` file exists in backend folder
- Try restarting the backend

### No Markets Showing
- Check browser console for errors (F12)
- Verify backend is responding: `curl http://localhost:5000/api/health`
- Check network tab in browser dev tools

### SQLite Errors
- Delete `backend/db/markets.db` and restart backend
- The database will be recreated automatically

## What's Next?

1. **Explore Markets** - Search and filter prediction markets
2. **Set Alerts** - Click "Set Alert" on any market card
3. **Test Alert System** - Run `node test-alerts.js` again
4. **Check API** - Visit http://localhost:5000/api/markets in browser
5. **Read README.md** - Full documentation and API reference

## Need Help?

- Check `README.md` for full documentation
- Review API endpoints in README
- Look at code in `backend/routes/` for API logic
- Check `frontend/src/components/` for UI components

---

**Time to first working dashboard:** ~2 minutes ⚡  
**Status:** Ready for testing! 🚀
