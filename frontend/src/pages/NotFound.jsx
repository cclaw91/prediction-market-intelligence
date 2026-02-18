import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navigation />
      
      <div className="flex-1 flex items-center justify-center px-4 pt-16">
        <div className="text-center max-w-2xl">
          {/* 404 Animation */}
          <div className="mb-8">
            <h1 className="text-9xl font-bold gradient-text animate-fade-in">
              404
            </h1>
          </div>
          
          {/* Message */}
          <h2 className="text-4xl font-bold text-gray-900 mb-4 animate-slide-up">
            Page Not Found
          </h2>
          <p className="text-xl text-gray-600 mb-8 animate-slide-up" style={{ animationDelay: '100ms' }}>
            Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
          </p>
          
          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: '200ms' }}>
            <Link
              to="/"
              className="btn-primary inline-flex items-center justify-center"
            >
              <Home className="w-5 h-5 mr-2" />
              Go Home
            </Link>
            <button
              onClick={() => window.history.back()}
              className="btn-secondary inline-flex items-center justify-center"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Go Back
            </button>
          </div>
          
          {/* Helpful Links */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-600 mb-4">Looking for something?</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/features" className="text-blue-600 hover:text-blue-700 font-medium">
                Features
              </Link>
              <Link to="/pricing" className="text-blue-600 hover:text-blue-700 font-medium">
                Pricing
              </Link>
              <Link to="/dashboard" className="text-blue-600 hover:text-blue-700 font-medium">
                Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default NotFound;
