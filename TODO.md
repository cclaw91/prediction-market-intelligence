# 📝 TODO List - Prediction Market Intelligence Tool

## 🔴 Critical (Before Production)

- [ ] **Security**
  - [ ] Add rate limiting (express-rate-limit)
  - [ ] Input validation and sanitization
  - [ ] Fix npm audit vulnerabilities
  - [ ] Add API authentication (JWT)
  - [ ] CORS whitelist configuration

- [ ] **Error Handling**
  - [ ] Better error messages in API responses
  - [ ] Retry logic for Polymarket API calls
  - [ ] Graceful degradation when API is down
  - [ ] Frontend error boundaries

## 🟡 High Priority (MVP Completion)

- [ ] **Alert System**
  - [ ] Set up cron job for periodic alert checks (every 5 min)
  - [ ] Add email notifications (SendGrid/AWS SES)
  - [ ] Add webhook support for alerts
  - [ ] Alert history and logs

- [ ] **Kalshi Integration**
  - [ ] Research Kalshi API endpoints
  - [ ] Create Kalshi service similar to Polymarket
  - [ ] Merge data from both sources
  - [ ] Handle different market formats

- [ ] **Charts & Visualizations**
  - [ ] Price history charts (Recharts)
  - [ ] Volume over time
  - [ ] Score trends
  - [ ] Market comparison charts

- [ ] **Testing**
  - [ ] Write Jest tests for API endpoints
  - [ ] Frontend component tests
  - [ ] Integration tests
  - [ ] API documentation (Swagger/OpenAPI)

## 🟢 Medium Priority (Next Sprint)

- [ ] **Features**
  - [ ] Market detail page
  - [ ] Advanced filtering (date range, score, volume)
  - [ ] Sort markets (by score, volume, date)
  - [ ] Favorites/watchlist
  - [ ] Export to CSV
  - [ ] Market categories page

- [ ] **Performance**
  - [ ] Add Redis for caching
  - [ ] Implement pagination for markets
  - [ ] Lazy loading for market cards
  - [ ] WebSocket for real-time updates
  - [ ] Database indexing

- [ ] **UI/UX**
  - [ ] Dark mode toggle
  - [ ] Loading skeletons
  - [ ] Toast notifications
  - [ ] Better mobile responsiveness
  - [ ] Keyboard shortcuts

## 🔵 Nice to Have (Future)

- [ ] **Advanced Features**
  - [ ] User accounts & authentication
  - [ ] Portfolio tracking
  - [ ] Custom alert rules (complex conditions)
  - [ ] Social features (comments, sharing)
  - [ ] Market predictions/ML scoring

- [ ] **Integrations**
  - [ ] Slack bot
  - [ ] Discord bot
  - [ ] Twitter alerts
  - [ ] Browser extension
  - [ ] Mobile app (React Native)

- [ ] **Analytics**
  - [ ] Usage tracking
  - [ ] Performance monitoring (Sentry)
  - [ ] User behavior analytics
  - [ ] A/B testing framework

## 🐛 Known Bugs

- [x] ~~Markets not showing on first load~~ (Fixed: API working)
- [ ] Alert modal doesn't validate email format
- [ ] Categories endpoint returns empty on first load
- [ ] No loading state for alert creation
- [ ] Market card overflows with long descriptions

## 🎯 Christian's Feedback Needed

1. **Design**: Are the market cards too dense? Should we simplify?
2. **Alerts**: Should alerts trigger immediately or batch every N minutes?
3. **Scoring**: Is the scoring algorithm intuitive? Need adjustments?
4. **Features**: What's the #1 missing feature you want?
5. **Data**: Should we cache markets longer or fetch fresh each time?

## ⏱️ Time Estimates

- Critical tasks: ~4-6 hours
- High priority: ~8-12 hours
- Medium priority: ~16-20 hours
- Nice to have: ~40+ hours

---

**Current Progress:** ~80% MVP Complete ✅  
**Next Session:** Focus on email notifications + cron jobs + Kalshi integration
