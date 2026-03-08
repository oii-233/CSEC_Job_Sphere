import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Linkedin, Apple, Facebook, Chrome } from 'lucide-react';
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
          <div className=" mb-12">
            <Link to="/" className="inline-flex items-center gap-2 mb-10">
              <div className="bg-blue-600 p-2 rounded-lg shadow-md">
                <img src="/logo.png" alt="JOBSPHERE Logo" className="h-8 w-auto" />
              </div>
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Create your account</h1>
          </div>

          <form onSubmit={handleSignUp} className="space-y-5">

            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="First name"
                required
                className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-gray-400"
              />
            </div>

            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Last name"
                required
                className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-gray-400"
              />
            </div>


            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="email"
                placeholder="Email"
                required
                className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-gray-400"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="password"
                placeholder="Password"
                required
                className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-gray-400"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="password"
                placeholder="Confirm Password"
                required
                className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-gray-400"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all text-base shadow-sm active:scale-[0.98]"
            >
              Create account
            </button>

            <div className="relative flex items-center justify-center py-4">
              <div className="flex-grow border-t border-gray-200"></div>
              <span className="flex-shrink px-4 text-sm font-bold text-gray-500 uppercase tracking-widest">OR</span>
              <div className="flex-grow border-t border-gray-200"></div>
            </div>

            <div className="grid grid-cols-4 gap-4">
              {[
                { icon: Chrome, color: 'text-[#EA4335]' },
                { icon: Apple, color: 'text-black' },
                { icon: Facebook, color: 'text-[#1877F2]' },
                { icon: Linkedin, color: 'text-[#0077B5]' },
              ].map((social, i) => (
                <button
                  key={i}
                  type="button"
                  className="flex items-center justify-center p-3.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all shadow-sm active:scale-95"
                >
                  <social.icon size={24} className={social.color} />
                </button>
              ))}
            </div>

            <div className="text-center pt-2">
              <p className="text-sm text-gray-900 font-medium">
                Already have an account?{' '}
                <Link to="/login" className="text-blue-600 font-bold hover:underline ml-1">
                  Login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>

      {/* Right Side - Illustration */}
      <div className="hidden lg:flex flex-1 bg-[#F6F6F6] items-center justify-center p-12">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-2xl"
        >
          <img
            src="/signUp.png"
            alt="Signup Illustration"
            className="w-full h-auto "
            referrerPolicy="no-referrer"
          />
        </motion.div>
      </div>
    </div>
  );
}
