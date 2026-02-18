import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Twitter, Github, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { label: 'Features', path: '/features' },
      { label: 'Pricing', path: '/pricing' },
      { label: 'Dashboard', path: '/dashboard' },
      { label: 'API Docs', path: '#' },
    ],
    company: [
      { label: 'About', path: '/features#about' },
      { label: 'Blog', path: '#' },
      { label: 'Careers', path: '#' },
      { label: 'Contact', path: '#' },
    ],
    resources: [
      { label: 'Documentation', path: '#' },
      { label: 'Help Center', path: '#' },
      { label: 'Community', path: '#' },
      { label: 'Status', path: '#' },
    ],
    legal: [
      { label: 'Privacy', path: '#' },
      { label: 'Terms', path: '#' },
      { label: 'Security', path: '#' },
      { label: 'Cookies', path: '#' },
    ],
  };

  const socialLinks = [
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Mail, href: '#', label: 'Email' },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container-lg">
        {/* Main Footer */}
        <div className="py-12 md:py-16">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
            {/* Brand Column */}
            <div className="col-span-2">
              <Link to="/" className="flex items-center space-x-2 mb-4 group">
                <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-400 rounded-lg group-hover:shadow-lg transition-shadow">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold text-white">MarketIQ</span>
              </Link>
              <p className="text-gray-400 mb-6 max-w-xs">
                AI-powered prediction market intelligence. Find arbitrage opportunities and stay ahead of the market.
              </p>
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Product Links */}
            <div>
              <h3 className="text-white font-semibold mb-4">Product</h3>
              <ul className="space-y-3">
                {footerLinks.product.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.path}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.path}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources Links */}
            <div>
              <h3 className="text-white font-semibold mb-4">Resources</h3>
              <ul className="space-y-3">
                {footerLinks.resources.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.path}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h3 className="text-white font-semibold mb-4">Legal</h3>
              <ul className="space-y-3">
                {footerLinks.legal.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.path}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © {currentYear} MarketIQ. All rights reserved.
            </p>
            <p className="text-gray-400 text-sm">
              Built with ❤️ for prediction market enthusiasts
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
