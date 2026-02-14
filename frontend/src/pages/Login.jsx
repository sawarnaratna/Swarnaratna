import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, LogIn, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/Layout';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      const result = await login(email, password);
      if (result.success) {
        navigate(from, { replace: true });
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <Layout>
      <div className="min-h-[80vh] flex items-center justify-center bg-stone-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-12 bg-white p-12 border border-stone-100 shadow-2xl relative overflow-hidden">
          {/* Subtle Decorative Element */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full -mr-16 -mt-16 opacity-50" />
          
          <div className="relative z-10">
            <h2 className="text-center text-[10px] font-black text-emerald-900 uppercase tracking-[0.4em] mb-4">
              Private Access
            </h2>
            <h3 className="text-center text-4xl font-black text-stone-900 tracking-tighter uppercase italic">
              Welcome Back
            </h3>
          </div>
          
          <form className="mt-10 space-y-8 relative z-10" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 text-red-900 p-4 text-[10px] font-black uppercase tracking-widest border border-red-100 flex items-center">
                {error}
              </div>
            )}
            
            <div className="space-y-6">
              <div>
                <label className="block text-[10px] font-black text-stone-400 uppercase tracking-widest mb-3">
                  Email Identity
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-0 flex items-center pointer-events-none">
                    <Mail className="h-4 w-4 text-emerald-900" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-8 pr-4 py-4 bg-transparent border-b border-stone-200 focus:border-emerald-900 transition-all font-light tracking-wide outline-none text-sm"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black text-stone-400 uppercase tracking-widest mb-3">
                  Security Key
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-0 flex items-center pointer-events-none">
                    <Lock className="h-4 w-4 text-emerald-900" />
                  </div>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-8 pr-4 py-4 bg-transparent border-b border-stone-200 focus:border-emerald-900 transition-all font-light tracking-wide outline-none text-sm"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="h-3 w-3 text-emerald-900 border-stone-300 rounded-none focus:ring-0"
                />
                <label className="ml-3 block text-[9px] font-black text-stone-400 uppercase tracking-widest">
                  Remember Session
                </label>
              </div>
              <div className="text-[9px]">
                <a href="#" className="font-black text-emerald-900 hover:text-emerald-700 uppercase tracking-widest border-b border-emerald-900/20">
                  Recovery
                </a>
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-5 px-4 bg-emerald-900 text-white text-[11px] font-black uppercase tracking-[0.2em] hover:bg-emerald-950 transition-all duration-500 shadow-2xl"
            >
              Sign In to Swarnaratna
            </button>
          </form>

          <div className="text-center pt-4 relative z-10">
            <p className="text-[9px] font-black text-stone-400 uppercase tracking-widest">
              New to our heritage?{' '}
              <Link to="/register" className="text-emerald-900 hover:text-emerald-700 ml-2 border-b border-emerald-900/20 pb-0.5">
                Join the Collection
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
