import React from 'react';

const FeatureCard = ({ icon: Icon, title, description, color = 'blue' }) => {
  const colorClasses = {
    blue: 'from-blue-600 to-blue-400',
    green: 'from-green-600 to-green-400',
    purple: 'from-purple-600 to-purple-400',
    orange: 'from-orange-600 to-orange-400',
    pink: 'from-pink-600 to-pink-400',
    indigo: 'from-indigo-600 to-indigo-400',
  };

  return (
    <div className="card card-hover p-8 animate-fade-in">
      <div className={`w-14 h-14 bg-gradient-to-br ${colorClasses[color]} rounded-xl flex items-center justify-center mb-5 shadow-lg`}>
        <Icon className="w-7 h-7 text-white" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
};

export default FeatureCard;
