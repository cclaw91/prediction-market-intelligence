import React from 'react';
import { Check, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const PricingTier = ({ 
  name, 
  price, 
  priceAnnual,
  description, 
  features, 
  cta, 
  popular = false,
  isAnnual = false 
}) => {
  const displayPrice = isAnnual ? priceAnnual : price;
  const savings = price && priceAnnual ? ((price * 12 - priceAnnual) / (price * 12) * 100).toFixed(0) : 0;

  return (
    <div
      className={`relative card card-hover p-8 flex flex-col ${
        popular ? 'border-2 border-blue-600 shadow-2xl' : ''
      }`}
    >
      {popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center px-4 py-1.5 bg-gradient-to-r from-blue-600 to-blue-500 text-white text-sm font-semibold rounded-full shadow-lg">
            <Star className="w-4 h-4 mr-1.5 fill-current" />
            Most Popular
          </span>
        </div>
      )}

      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{name}</h3>
        <p className="text-gray-600">{description}</p>
      </div>

      <div className="mb-6">
        <div className="flex items-baseline">
          <span className="text-5xl font-bold text-gray-900">
            {displayPrice === 0 ? 'Free' : `$${displayPrice}`}
          </span>
          {displayPrice !== 0 && (
            <span className="text-gray-600 ml-2">
              {isAnnual ? '/year' : '/month'}
            </span>
          )}
        </div>
        {isAnnual && savings > 0 && (
          <p className="text-sm text-green-600 font-medium mt-2">
            Save {savings}% with annual billing
          </p>
        )}
      </div>

      <Link
        to="/dashboard"
        className={`w-full text-center py-3 px-6 rounded-lg font-semibold transition-all duration-200 mb-8 ${
          popular
            ? 'btn-primary'
            : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
        }`}
      >
        {cta}
      </Link>

      <div className="flex-1">
        <p className="text-sm font-semibold text-gray-900 mb-4">What's included:</p>
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
              <span className="text-gray-600">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PricingTier;
