import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Github, Apple, Facebook, Chrome } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { login } from '../features/auth/authSlice';
import { motion } from 'motion/react';

export default function SignUpPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate sign up
    dispatch(login({ id: '1', email: 'user@example.com', firstName: 'John', lastName: 'Doe' }));
    navigate('/');
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <Link to="/" className="inline-flex items-center gap-2 mb-8">
              <div className="bg-blue-700 text-white p-1.5 rounded-md font-bold text-sm flex items-center gap-1">
                <div className="bg-white w-4 h-4 rounded-sm flex items-center justify-center">
                  <div className="bg-blue-700 w-2 h-2 rounded-full"></div>
                </div>
                JOBSPHERE
              </div>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Create your account</h1>
          </div>

          <form onSubmit={handleSignUp} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="First name"
                  required
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                />
              </div>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Last name"
                  required
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                />
              </div>
            </div>

            <div>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                />
              </div>
            </div>

            <div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="password"
                  placeholder="Password"
                  required
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                />
              </div>
            </div>

            <div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  required
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-blue-700 text-white font-bold rounded-xl hover:bg-blue-800 transition-colors shadow-lg shadow-blue-700/20"
            >
              Create account
            </button>

            <div className="relative flex items-center justify-center py-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-100"></div>
              </div>
              <span className="relative px-4 bg-white text-xs font-bold text-gray-400 uppercase tracking-widest">OR</span>
            </div>

            <div className="grid grid-cols-4 gap-4">
              {[
                { icon: Chrome, color: 'text-red-500' },
                { icon: Apple, color: 'text-gray-900' },
                { icon: Facebook, color: 'text-blue-600' },
                { icon: Github, color: 'text-gray-900' },
              ].map((social, i) => (
                <button
                  key={i}
                  type="button"
                  className="flex items-center justify-center p-3 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <social.icon size={20} className={social.color} />
                </button>
              ))}
            </div>

            <p className="text-center text-sm text-gray-500">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-700 font-bold hover:underline">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>

      {/* Right Side - Illustration */}
      <div className="hidden lg:flex flex-1 bg-gray-50 items-center justify-center p-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="max-w-lg text-center"
        >
          <div className="relative mb-8">
            <div className="absolute inset-0 bg-blue-100 rounded-full blur-3xl opacity-50"></div>
            <img
              src="https://picsum.photos/seed/signup-illustration/600/600"
              alt="Signup Illustration"
              className="relative z-10 w-full h-auto"
              referrerPolicy="no-referrer"
            />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Join JobSphere Today</h2>
          <p className="text-gray-500">Create an account to unlock personalized job recommendations and manage your career path effectively.</p>
        </motion.div>
      </div>
    </div>
  );
}
