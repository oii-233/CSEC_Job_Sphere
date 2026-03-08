import { Link, useLocation } from 'react-router-dom';
import { Search, Bell, User, LogIn } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

export default function Navbar() {
  const location = useLocation();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  const navItems = [
    { name: 'Job Search', path: '/' },
    { name: 'My Applications', path: '/applications' },
    { name: 'Companies', path: '/companies' },
    { name: 'Contact Us', path: '/contact' },
  ];

  return (
    <nav className="bg-white border-b border-gray-100 py-4 px-6 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center gap-12">
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-blue-700 text-white p-1.5 rounded-md font-bold text-sm flex items-center gap-1">
            <div className="bg-white w-4 h-4 rounded-sm flex items-center justify-center">
              <div className="bg-blue-700 w-2 h-2 rounded-full"></div>
            </div>
            JOBSPHERE
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`text-sm font-medium transition-colors ${
                location.pathname === item.path
                  ? 'text-blue-600 border-b-2 border-blue-600 pb-1'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4">
        {isAuthenticated ? (
          <div className="flex items-center gap-4">
            <button className="text-gray-500 hover:text-blue-600">
              <Bell size={20} />
            </button>
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border border-gray-300">
              <User size={20} className="text-gray-500" />
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="px-6 py-2 text-sm font-semibold text-white bg-blue-700 rounded-md hover:bg-blue-800 transition-colors"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-6 py-2 text-sm font-semibold text-blue-700 border border-blue-200 rounded-md hover:bg-blue-50 transition-colors"
            >
              Sign In
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
