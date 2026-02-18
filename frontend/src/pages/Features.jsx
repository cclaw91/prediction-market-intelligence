import React from 'react';
import { Link } from 'react-router-dom';
import { 
  TrendingUp, 
  Zap, 
  Bell, 
  BarChart3, 
  Shield,
  Globe,
  Lock,
  Smartphone,
  ArrowRight,
  Database,
  LineChart,
  RefreshCw,
  Target,
  Users,
  Code
} from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import FeatureCard from '../components/FeatureCard';

const Features = () => {
  const mainFeatures = [
    {
      icon: Database,
      title: 'Real-Time Market Data Aggregation',
      description: 'Access comprehensive market data from Polymarket and other major prediction markets, all aggregated in real-time. Never miss a market movement again.',
      color: 'blue',
    },
    {
      icon: Bell,
      title: 'Smart Alert System',
      description: 'Set custom alerts based on price movements, volume changes, or arbitrage opportunities. Get notified via email, push notifications, or webhooks.',
      color: 'green',
    },
    {
      icon: Zap,
      title: 'Arbitrage Detection',
      description: 'Our AI-powered algorithms continuously scan markets to identify profitable arbitrage opportunities across different platforms in milliseconds.',
      color: 'purple',
    },
    {
      icon: LineChart,
      title: 'Cross-Market Comparison',
      description: 'Compare the same markets across different platforms instantly. Identify price discrepancies and capitalize on market inefficiencies.',
      color: 'orange',
    },
    {
      icon: Code,
      title: 'API Access for Pro Users',
      description: 'Full REST API access to integrate our market data and alerts into your own trading systems and workflows.',
      color: 'pink',
    },
    {
      icon: Shield,
      title: 'Enterprise-Grade Security',
      description: 'Bank-level encryption, SOC 2 compliance, and robust security measures to keep your data and strategies safe.',
      color: 'indigo',
    },
  ];

  const additionalFeatures = [
    { icon: RefreshCw, text: 'Real-time data updates every second' },
    { icon: Target, text: 'Advanced filtering and search' },
    { icon: Globe, text: 'Multi-platform support' },
    { icon: Smartphone, text: 'Mobile-responsive interface' },
    { icon: Lock, text: 'Private and secure' },
    { icon: BarChart3, text: 'Historical data analysis' },
  ];

  const howItWorks = [
    {
      step: 1,
      title: 'Connect Your Markets',
      description: 'Sign up and connect to prediction markets like Polymarket. Our system starts monitoring markets immediately.',
    },
    {
      step: 2,
      title: 'Set Your Criteria',
      description: 'Configure alerts based on your trading strategy - price thresholds, volume changes, arbitrage opportunities.',
    },
    {
      step: 3,
      title: 'Get Instant Alerts',
      description: 'Receive notifications the moment opportunities arise. Act fast and capitalize on market inefficiencies.',
    },
  ];

  const team = [
    {
      name: 'Alex Chen',
      role: 'Founder & CEO',
      bio: 'Ex-Jane Street quantitative trader with 10+ years in prediction markets.',
    },
    {
      name: 'Sarah Williams',
      role: 'CTO',
      bio: 'Former Google engineer specializing in real-time data systems and ML.',
    },
    {
      name: 'Michael Torres',
      role: 'Head of Product',
      bio: 'Built trading platforms at Bloomberg and Robinhood.',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="section pt-32 pb-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container-lg text-center">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full text-blue-700 text-sm font-medium mb-6">
            <TrendingUp className="w-4 h-4 mr-2" />
            Powerful Features
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Everything You Need to 
            <span className="gradient-text"> Dominate Prediction Markets</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Professional-grade tools designed for serious prediction market traders. From real-time data to advanced analytics.
          </p>
          <Link to="/dashboard" className="btn-primary inline-flex items-center">
            Start Free Trial
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </section>

      {/* Main Features */}
      <section className="section bg-white">
        <div className="container-lg">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mainFeatures.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                color={feature.color}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Additional Features Grid */}
      <section className="section-sm bg-gray-50">
        <div className="container-lg">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            And Much More...
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {additionalFeatures.map((feature, index) => (
              <div key={index} className="flex items-center space-x-3 bg-white p-4 rounded-lg shadow-sm">
                <feature.icon className="w-6 h-6 text-blue-600 flex-shrink-0" />
                <span className="text-gray-700 font-medium">{feature.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section bg-white">
        <div className="container-lg">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get started in minutes, not hours
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            {howItWorks.map((item, index) => (
              <div key={index} className="text-center animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-400 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6 shadow-lg">
                  {item.step}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/dashboard" className="btn-primary inline-flex items-center">
              Get Started Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="about" className="section bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container-lg">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Meet the Team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Built by traders, for traders. Our team combines decades of experience in quantitative trading, software engineering, and prediction markets.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {team.map((member, index) => (
              <div key={index} className="card p-8 text-center animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-blue-400 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-6 shadow-lg">
                  {member.name.charAt(0)}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {member.name}
                </h3>
                <p className="text-blue-600 font-medium mb-4">
                  {member.role}
                </p>
                <p className="text-gray-600">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <div className="inline-flex items-center space-x-2 text-gray-600">
              <Users className="w-5 h-5" />
              <span>Backed by leading VCs and angel investors</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-gradient-to-br from-blue-600 to-blue-500 text-white">
        <div className="container-sm text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl opacity-90 mb-8">
            Join hundreds of traders already using MarketIQ to find profitable opportunities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/dashboard" className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center">
              Start Free Trial
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <Link to="/pricing" className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-4 rounded-lg font-semibold transition-colors">
              View Pricing
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Features;
