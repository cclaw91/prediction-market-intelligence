import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  TrendingUp, 
  Zap, 
  Bell, 
  BarChart3, 
  ArrowRight, 
  CheckCircle2,
  Star,
  PlayCircle
} from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const Landing = () => {
  const [email, setEmail] = useState('');

  const handleNewsletterSignup = (e) => {
    e.preventDefault();
    // TODO: Implement newsletter signup
    alert('Thanks for signing up! (Coming soon)');
    setEmail('');
  };

  const features = [
    {
      icon: TrendingUp,
      title: 'Real-Time Market Data',
      description: 'Access live data from major prediction markets including Polymarket, aggregated in one place.',
    },
    {
      icon: Zap,
      title: 'Arbitrage Detection',
      description: 'AI-powered algorithms instantly identify profitable arbitrage opportunities across markets.',
    },
    {
      icon: Bell,
      title: 'Smart Alerts',
      description: 'Get notified the moment opportunities arise with customizable alerts tailored to your strategy.',
    },
    {
      icon: BarChart3,
      title: 'Market Intelligence',
      description: 'Deep analytics and insights to help you make informed decisions in prediction markets.',
    },
  ];

  const testimonials = [
    {
      name: 'Alex Rivera',
      role: 'Crypto Trader',
      content: 'MarketIQ helped me identify 3 arbitrage opportunities in my first week. The ROI has been incredible.',
      rating: 5,
    },
    {
      name: 'Sarah Chen',
      role: 'Data Analyst',
      content: 'The real-time alerts are a game-changer. I never miss an opportunity now.',
      rating: 5,
    },
    {
      name: 'Michael Torres',
      role: 'Prediction Markets Pro',
      content: 'Best tool for serious prediction market traders. The insights are incredibly valuable.',
      rating: 5,
    },
  ];

  const stats = [
    { value: '10K+', label: 'Markets Tracked' },
    { value: '99.9%', label: 'Uptime' },
    { value: '<100ms', label: 'Alert Latency' },
    { value: '500+', label: 'Happy Users' },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="section pt-32 pb-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container-lg">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-in-left">
              <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full text-blue-700 text-sm font-medium mb-6">
                <Zap className="w-4 h-4 mr-2" />
                AI-Powered Market Intelligence
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Find Arbitrage Opportunities 
                <span className="gradient-text"> Across Prediction Markets</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Real-time market data, smart alerts, and AI-powered insights to help you maximize profits in prediction markets.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/dashboard" className="btn-primary inline-flex items-center justify-center">
                  Start Free
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
                <button className="btn-secondary inline-flex items-center justify-center">
                  <PlayCircle className="w-5 h-5 mr-2" />
                  View Demo
                </button>
              </div>
              <p className="text-sm text-gray-500 mt-6">
                ✓ No credit card required  ✓ Free forever plan  ✓ Cancel anytime
              </p>
            </div>
            
            {/* Hero Image/Illustration Placeholder */}
            <div className="animate-fade-in">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl transform rotate-3 opacity-10"></div>
                <div className="relative bg-white rounded-2xl shadow-2xl p-8 border border-gray-200">
                  <div className="space-y-4">
                    {/* Mock Dashboard Card */}
                    <div className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl p-6 text-white">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm opacity-90">Arbitrage Alert</span>
                        <span className="badge bg-white/20 text-white">Live</span>
                      </div>
                      <p className="text-2xl font-bold mb-2">+12.3% Opportunity</p>
                      <p className="text-sm opacity-90">US Election Market Spread</p>
                    </div>
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg"></div>
                          <div>
                            <div className="h-4 bg-gray-300 rounded w-24 mb-2"></div>
                            <div className="h-3 bg-gray-200 rounded w-16"></div>
                          </div>
                        </div>
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-gray-900 text-white">
        <div className="container-lg">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-4xl font-bold mb-2 gradient-text bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  {stat.value}
                </p>
                <p className="text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section bg-white">
        <div className="container-lg">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Everything You Need to Win
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Powerful tools and insights to help you identify and capitalize on prediction market opportunities.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="card card-hover p-6 text-center animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-400 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/features" className="btn-secondary inline-flex items-center">
              View All Features
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="section bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container-lg">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Loved by Traders Worldwide
            </h2>
            <p className="text-xl text-gray-600">
              Join hundreds of successful prediction market traders
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="card p-8 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-400 rounded-full flex items-center justify-center text-white font-bold mr-4">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Teaser */}
      <section className="section bg-white">
        <div className="container-lg">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600">
              Start free, upgrade when you're ready
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {['Free', 'Pro', 'Enterprise'].map((tier, index) => (
              <div key={tier} className={`card p-8 text-center ${index === 1 ? 'border-2 border-blue-600' : ''}`}>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{tier}</h3>
                <p className="text-4xl font-bold text-gray-900 mb-6">
                  {index === 0 ? 'Free' : index === 1 ? '$49' : 'Custom'}
                  {index > 0 && index < 2 && <span className="text-lg text-gray-600">/mo</span>}
                </p>
                <Link
                  to="/pricing"
                  className={`block w-full text-center py-3 px-6 rounded-lg font-semibold transition-all duration-200 ${
                    index === 1 ? 'btn-primary' : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                  }`}
                >
                  {index === 2 ? 'Contact Sales' : 'Get Started'}
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link to="/pricing" className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center">
              View detailed pricing
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="section bg-gradient-to-br from-blue-600 to-blue-500 text-white">
        <div className="container-sm text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Stay Ahead of the Market
          </h2>
          <p className="text-xl opacity-90 mb-8">
            Get weekly insights, market analysis, and arbitrage opportunities delivered to your inbox.
          </p>
          
          <form onSubmit={handleNewsletterSignup} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
                required
              />
              <button type="submit" className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </form>
          
          <p className="text-sm opacity-75 mt-4">
            Join 2,500+ subscribers. Unsubscribe anytime.
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section bg-gray-900 text-white">
        <div className="container-sm text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Start Winning?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of traders using MarketIQ to find profitable opportunities.
          </p>
          <Link to="/dashboard" className="btn-primary text-lg inline-flex items-center">
            Get Started Free
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Landing;
