#!/usr/bin/env node
/**
 * Test script for creating sample alerts
 * Run: node test-alerts.js
 */

const axios = require('axios');

const API_URL = 'http://localhost:5000/api';

async function testAlerts() {
  console.log('🧪 Testing Prediction Market Intelligence Tool\n');

  try {
    // 1. Health check
    console.log('1️⃣ Checking API health...');
    const health = await axios.get(`${API_URL}/health`);
    console.log('✅ Health:', health.data);

    // 2. Fetch markets
    console.log('\n2️⃣ Fetching markets...');
    const markets = await axios.get(`${API_URL}/markets?limit=5`);
    console.log(`✅ Found ${markets.data.count} markets`);
    
    const testMarkets = markets.data.markets.slice(0, 3);
    testMarkets.forEach((m, i) => {
      console.log(`   ${i + 1}. ${m.question} (Score: ${m.score})`);
    });

    // 3. Create test alerts
    console.log('\n3️⃣ Creating test alerts...');
    
    const alertsToCreate = [
      {
        market_id: testMarkets[0].id,
        alert_type: 'volume_spike',
        threshold: 500000,
        message: 'Volume exceeded 500K',
      },
      {
        market_id: testMarkets[1].id,
        alert_type: 'closing_soon',
        threshold: 0,
        message: 'Market closing within 24 hours',
      },
      {
        market_id: testMarkets[2].id,
        alert_type: 'liquidity_low',
        threshold: 10000,
        message: 'Low liquidity warning',
      },
    ];

    for (const alert of alertsToCreate) {
      const response = await axios.post(`${API_URL}/alerts`, alert);
      console.log(`✅ Created alert: ${alert.alert_type} for market ${alert.market_id}`);
    }

    // 4. Create test subscription
    console.log('\n4️⃣ Creating test subscription...');
    const subscription = await axios.post(`${API_URL}/alerts/subscribe`, {
      email: 'test@example.com',
      alert_types: ['price_change', 'volume_spike', 'closing_soon'],
    });
    console.log('✅ Subscription created:', subscription.data);

    // 5. List all alerts
    console.log('\n5️⃣ Listing all alerts...');
    const allAlerts = await axios.get(`${API_URL}/alerts`);
    console.log(`✅ Total alerts: ${allAlerts.data.length}`);
    allAlerts.data.forEach((alert, i) => {
      console.log(`   ${i + 1}. ${alert.alert_type} - ${alert.market_question || 'Unknown market'}`);
    });

    // 6. Trigger alert check
    console.log('\n6️⃣ Triggering alert check...');
    const check = await axios.post(`${API_URL}/alerts/check`);
    console.log('✅ Alert check complete:', check.data);

    console.log('\n🎉 All tests completed successfully!');
    console.log('\n📊 Dashboard: http://localhost:3000');
    console.log('🔌 API: http://localhost:5000/api');

  } catch (error) {
    console.error('\n❌ Test failed:', error.message);
    if (error.response) {
      console.error('Response:', error.response.data);
    }
    process.exit(1);
  }
}

testAlerts();
