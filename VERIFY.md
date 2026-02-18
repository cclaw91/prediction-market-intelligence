# ✅ Verification Checklist

Run these commands to verify everything works after the urgent fixes.

## Port Configuration (FIXED ✅)

```bash
# Backend should be on 5000
curl http://localhost:5000/api/health
# Expected: {"status":"ok","timestamp":"..."}

# Frontend should be on 3001 (NOT 3000)
curl -I http://localhost:3001/
# Expected: HTTP/1.1 200 OK

# Port 3000 should be free for OpenClaw Control Center
lsof -i :3000
# Expected: OpenClaw process (NOT our frontend)
```

## Services Status

```bash
# Check both services are running
lsof -i :5000  # Backend (Node.js)
lsof -i :3001  # Frontend (Vite)
```

## Full Integration Test

```bash
cd /Users/christian/.openclaw/workspace/prediction-market-tool/backend
node test-alerts.js
```

Expected output:
```
🧪 Testing Prediction Market Intelligence Tool
1️⃣ Checking API health... ✅
2️⃣ Fetching markets... ✅
3️⃣ Creating test alerts... ✅
4️⃣ Creating test subscription... ✅
5️⃣ Listing all alerts... ✅
6️⃣ Triggering alert check... ✅
🎉 All tests completed successfully!

📊 Dashboard: http://localhost:3001
🔌 API: http://localhost:5000/api
```

## Browser Test

Open in browser:
- http://localhost:3001 ← **Prediction Market Dashboard**
- http://localhost:3000 ← **OpenClaw Control Center**

You should see:
1. Dashboard loads without errors
2. Markets display with data from Polymarket
3. Search bar works
4. "Set Alert" buttons are clickable
5. No console errors (F12 DevTools)

## Tailwind CSS Fix (FIXED ✅)

Check that Tailwind styles are working:
1. Open http://localhost:3001
2. Market cards should have:
   - White backgrounds with shadows
   - Blue buttons with hover effects
   - Proper spacing and typography
   - Responsive grid layout

If styles are missing:
```bash
# Check PostCSS config
cat frontend/postcss.config.js
# Should show: '@tailwindcss/postcss': {},

# Check package is installed
cd frontend && npm list @tailwindcss/postcss
# Should show: @tailwindcss/postcss@...
```

## Quick Restart (if needed)

```bash
# Kill both processes
lsof -ti:5000 | xargs kill -9
lsof -ti:3001 | xargs kill -9

# Restart backend
cd backend && npm start &

# Restart frontend
cd frontend && npm run dev &
```

---

**All checks passed?** ✅ You're ready to go!  
**Dashboard:** http://localhost:3001  
**API:** http://localhost:5000/api
