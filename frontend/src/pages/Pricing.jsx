import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, HelpCircle } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import PricingTier from '../components/PricingTier';

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  const pricingTiers = [
    {
      name: 'Free',
      price: 0,
      priceAnnual: 0,
      description: 'Perfect for getting started',
      cta: 'Get Started',
      features: [
        'Up to 50 market alerts per month',
        'Basic market data access',
        'Email notifications',
        '24-hour data refresh',
        'Community support',
        'Web dashboard access',
      ],
    },
    {
      name: 'Pro',
      price: 49,
      priceAnnual: 490,
      description: 'For serious traders',
      cta: 'Start Free Trial',
      popular: true,
      features: [
        'Unlimited market alerts',
        'Real-time market data',
        'Email + Push + Webhook notifications',
        'Live data updates (every second)',
        'Advanced filtering & search',
        'API access (5,000 calls/day)',
        'Priority support',
        'Historical data (1 year)',
        'Custom alert rules',
        'Mobile app access',
      ],
    },
    {
      name: 'Enterprise',
      price: null,
      priceAnnual: null,
      description: 'For teams and institutions',
      cta: 'Contact Sales',
      features: [
        'Everything in Pro',
        'Unlimited API calls',
        'Dedicated account manager',
        'Custom integrations',
        'SLA guarantee (99.99% uptime)',
        'Historical data (unlimited)',
        'White-label options',
        'Team collaboration tools',
        'Advanced analytics & reporting',
        'Custom data exports',
        'Phone support',
      ],
    },
  ];

  const faqs = [
    {
      question: 'Can I switch plans at any time?',
      answer: 'Yes! You can upgrade, downgrade, or cancel your plan at any time. Changes take effect immediately, and we prorate billing accordingly.',
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, Mastercard, Amex) and PayPal. Enterprise customers can pay via invoice.',
    },
    {
      question: 'Is there a free trial?',
      answer: 'Yes! Pro plan comes with a 14-day free trial. No credit card required. You can cancel anytime during the trial period.',
    },
    {
      question: 'What happens when I hit my alert limit?',
      answer: 'On the Free plan, you\'ll need to upgrade to Pro to create more alerts. Pro plan has unlimited alerts.',
    },
    {
      question: 'Do you offer discounts for students or non-profits?',
      answer: 'Yes! We offer 50% off Pro plans for students and verified non-profit organizations. Contact us for details.',
    },
    {
      question: 'Can I get a refund?',
      answer: 'We offer a 30-day money-back guarantee. If you\'re not satisfied, contact us for a full refund, no questions asked.',
    },
    {
      question: 'What markets do you support?',
      answer: 'We currently support Polymarket with more platforms coming soon. Enterprise customers can request custom market integrations.',
    },
    {
      question: 'Is my data secure?',
      answer: 'Absolutely. We use bank-level encryption, are SOC 2 compliant, and never share your data with third parties.',
    },
  ];

  const features = [
    { free: true, pro: true, enterprise: true, name: 'Market data access' },
    { free: 'Basic', pro: 'Real-time', enterprise: 'Real-time + Historical', name: 'Data updates' },
    { free: '50/month', pro: 'Unlimited', enterprise: 'Unlimited', name: 'Alert quota' },
    { free: 'Email', pro: 'Email + Push + Webhook', enterprise: 'All channels + Custom', name: 'Notifications' },
    { free: false, pro: '5K/day', enterprise: 'Unlimited', name: 'API calls' },
    { free: false, pro: true, enterprise: true, name: 'Mobile app' },
    { free: 'Community', pro: 'Priority', enterprise: 'Dedicated + Phone', name: 'Support' },
    { free: false, pro: '1 year', enterprise: 'Unlimited', name: 'Historical data' },
    { free: false, pro: false, enterprise: true, name: 'Custom integrations' },
    { free: false, pro: false, enterprise: true, name: 'White-label' },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="section pt-32 pb-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container-lg text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Simple, Transparent
            <span className="gradient-text"> Pricing</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Start free, scale as you grow. No hidden fees, no surprises.
          </p>

          {/* Annual Toggle */}
          <div className="flex items-center justify-center space-x-4 mb-12">
            <span className={`font-medium ${!isAnnual ? 'text-gray-900' : 'text-gray-500'}`}>
              Monthly
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className={`relative w-14 h-7 rounded-full transition-colors ${
                isAnnual ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            >
              <div
                className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${
                  isAnnual ? 'transform translate-x-7' : ''
                }`}
              />
            </button>
            <span className={`font-medium ${isAnnual ? 'text-gray-900' : 'text-gray-500'}`}>
              Annual
            </span>
            <span className="badge badge-success ml-2">Save 17%</span>
          </div>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="section-sm bg-white">
        <div className="container-lg">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingTiers.map((tier, index) => (
              <PricingTier
                key={index}
                {...tier}
                isAnnual={isAnnual}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Feature Comparison Table */}
      <section className="section-sm bg-gray-50">
        <div className="container-lg">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Compare Plans
          </h2>

          <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Feature
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">
                      Free
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900 bg-blue-50">
                      Pro
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">
                      Enterprise
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {features.map((feature, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                        {feature.name}
                      </td>
                      <td className="px-6 py-4 text-sm text-center text-gray-600">
                        {typeof feature.free === 'boolean' 
                          ? (feature.free ? '✓' : '—')
                          : feature.free}
                      </td>
                      <td className="px-6 py-4 text-sm text-center text-gray-900 font-medium bg-blue-50">
                        {typeof feature.pro === 'boolean' 
                          ? (feature.pro ? '✓' : '—')
                          : feature.pro}
                      </td>
                      <td className="px-6 py-4 text-sm text-center text-gray-600">
                        {typeof feature.enterprise === 'boolean' 
                          ? (feature.enterprise ? '✓' : '—')
                          : feature.enterprise}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section bg-white">
        <div className="container-lg">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Got questions? We've got answers.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <details
                key={index}
                className="card p-6 cursor-pointer group"
              >
                <summary className="flex items-start justify-between font-semibold text-gray-900 list-none">
                  <span className="flex items-start flex-1 pr-4">
                    <HelpCircle className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
                    {faq.question}
                  </span>
                  <span className="text-gray-400 group-open:rotate-180 transition-transform">
                    ▼
                  </span>
                </summary>
                <p className="mt-4 text-gray-600 pl-8 leading-relaxed">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Enterprise CTA */}
      <section className="section bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="container-sm">
          <div className="text-center mb-8">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Need an Enterprise Plan?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Custom solutions for teams and institutions. Volume discounts, dedicated support, and custom integrations.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:enterprise@marketiq.ai"
              className="bg-white text-gray-900 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-center"
            >
              Contact Sales
            </a>
            <Link
              to="/features"
              className="bg-gray-800 hover:bg-gray-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors text-center border border-gray-700"
            >
              View Features
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section bg-gradient-to-br from-blue-600 to-blue-500 text-white">
        <div className="container-sm text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Start Your Free Trial Today
          </h2>
          <p className="text-xl opacity-90 mb-8">
            No credit card required. Cancel anytime.
          </p>
          <Link to="/dashboard" className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center">
            Get Started Free
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Pricing;
