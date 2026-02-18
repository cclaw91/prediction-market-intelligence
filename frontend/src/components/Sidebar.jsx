import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  TrendingUp, 
  Bell, 
  Settings, 
  HelpCircle,
  LogOut,
  BarChart3
} from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: TrendingUp, label: 'Markets', path: '/dashboard' },
    { icon: Bell, label: 'Alerts', path: '/dashboard' },
    { icon: BarChart3, label: 'Analytics', path: '/dashboard' },
    { icon: Settings, label: 'Settings', path: '/dashboard' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <aside className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-white border-r border-gray-200 flex flex-col">
      {/* User Profile */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-400 rounded-full flex items-center justify-center text-white font-bold">
            U
          </div>
          <div className="flex-1">
            <p className="font-semibold text-gray-900">Demo User</p>
            <p className="text-xs text-gray-500">Free Plan</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                  isActive(item.path)
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-gray-200 space-y-1">
        <button className="flex items-center space-x-3 px-4 py-3 rounded-lg font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200 w-full">
          <HelpCircle className="w-5 h-5" />
          <span>Help & Support</span>
        </button>
        <button className="flex items-center space-x-3 px-4 py-3 rounded-lg font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200 w-full">
          <LogOut className="w-5 h-5" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
